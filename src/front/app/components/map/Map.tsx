import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {distance, nearestPointOnLine, splitPath, getVector} from './utils/Geometry'
import Success from './success/Success'

import './Map.scss'

const GraphDijkstra = require('node-dijkstra')

export const STEPS = {
    SET_CUSTOMER_POSITION: 0,
    CHOOSE_RESTAURANT: 1,
    SET_COURIER_POSITION: 2,
    SIMULATE_COURIER_TO_RESTAURANT: 3,
    SIMULATE_COURIER_TO_CUSTOMER: 4
}

const SPEED = 2
const POSITION_MARGIN = 15
const STOP_MARGIN = 18
const MIN_RESTAURANT_DETECTION_RANGE = 150

class Map extends React.Component<any, any> {
    private simulationOngoing: any
    private graphLines: any
    private containerElement: any

    constructor(props: any) {
        super(props)

        this.simulationOngoing = false

        this.graphLines = this.computeGraphLines(this.props.graph)

        const customerPosition = this.props.initialCustomerPosition || null
        const courierPosition = this.props.initialCourierPosition || null

        let path1 = null, path2 = null
        if (customerPosition && courierPosition) {
            const paths = this.computePaths(customerPosition, courierPosition)
            path1 = paths.path1
            path2 = paths.path2
        }

        this.state = {
            customerPosition,
            customerPositionBuffer: [],
            selectedRestaurantIndex: null,
            courierPosition,
            courierPositionBuffer: [],
            path1,
            success1: null,
            path2,
            success2: null
        }

        this.onClick = this.onClick.bind(this)
        this.onBtnSimulationClick = this.onBtnSimulationClick.bind(this)
        this.onRandomAction = this.onRandomAction.bind(this)
    }

    computeGraphLines(graph: any) {
        const graphLines = {}
        _.forEach(graph, (node, nodeId1) => {
            _.forEach(_.keys(node.connections), nodeId2 => {
                const min = Math.min(+nodeId1, +nodeId2)
                const max = Math.max(+nodeId1, +nodeId2)
                graphLines[min + '_' + max] = [
                    graph[min].position,
                    graph[max].position
                ]
            })
        })

        return graphLines
    }

    allowSimulation() {
        const {step} = this.props
        const {path1, path2} = this.state

        return (step === STEPS.SIMULATE_COURIER_TO_RESTAURANT && path1.length > 0) || (step === STEPS.SIMULATE_COURIER_TO_CUSTOMER && path2.length > 0)
    }

    getPathFromListOfPoints(points: any) {
        let path = ''
        _.forEach(points, (point, index: number) => path += `${index === 0 ? 'M' : 'L'} ${point[0]} ${point[1]} `)
        return path
    }

    getNearestPosition(target: any) {
        const projections = _.map(this.graphLines, ([line1, line2]) => nearestPointOnLine(line1, line2, target))
        return _.minBy(projections, (projection: any) => projection.dist).position
    }

    getNearestRestaurantIndex(eventPoint: any) {
        const {restaurants} = this.props

        const nearRestaurantIndex = _.minBy(_.range(restaurants.length), index => {
            return distance(restaurants[index].position, eventPoint)
        }) as any

        return distance(restaurants[nearRestaurantIndex].position, eventPoint) < MIN_RESTAURANT_DETECTION_RANGE ? nearRestaurantIndex : null
    }

    getPositionBuffer(eventPoint: any) {
        const nearestEventPoint = this.getNearestPosition(eventPoint)

        let customerPositionBuffer = []
        if (distance(eventPoint, nearestEventPoint) > POSITION_MARGIN) {
            const vector = getVector(nearestEventPoint, eventPoint)
            const nearestEventPointWithMargin = [nearestEventPoint[0] + POSITION_MARGIN * vector[0], nearestEventPoint[1] + POSITION_MARGIN * vector[1]]
            customerPositionBuffer = splitPath([eventPoint, nearestEventPointWithMargin])
        }

        return customerPositionBuffer
    }

    adjustPosition(getter: any, setter: any) {
        const adjust = () => {
            const {position, buffer} = getter()

            if (buffer.length > 0) {
                const newBuffer = _.takeRight(buffer, 4 * (buffer.length / 5))
                const newPosition = newBuffer.length > 0 ? newBuffer[0] : position

                setter(newPosition, newBuffer)

                if (newBuffer.length > 0) {
                    requestAnimationFrame(adjust)
                }
                else {
                    this.props.onActionEnd && this.props.onActionEnd()
                }
            }
        }

        this.props.onActionStart && this.props.onActionStart()
        adjust()
    }

    adjustCustomerPosition() {
        const getter = () => ({position: this.state.customerPosition, buffer: this.state.customerPositionBuffer})
        const setter = (position: any, buffer: any) => this.setState({customerPosition: position, customerPositionBuffer: buffer})
        this.adjustPosition(getter, setter)
    }

    adjustCourierPosition() {
        const getter = () => ({position: this.state.courierPosition, buffer: this.state.courierPositionBuffer})
        const setter = (position: any, buffer: any) => {
            if (this.state.customerPosition) {
                const {path1, path2} = this.computePaths(this.state.customerPosition, position)
                this.setState({courierPosition: position, courierPositionBuffer: buffer, path1, path2})
            }
            else {
                this.setState({courierPosition: position, courierPositionBuffer: buffer})
            }
        }
        this.adjustPosition(getter, setter)
    }

    getPathAdditionalPoint(target: any, idPrefix?: any) {
        const {graph} = this.props

        const projections = _.map(this.graphLines, ([line1, line2], id) => {
            const {position, dist} = nearestPointOnLine(line1, line2, target)
            return {id, position, dist}
        })

        const additionPoint = _.minBy(projections, projection => projection.dist) as any

        let perfectPoint = null
        const connections = {}
        _.forEach(additionPoint.id.split('_'), id => {
            const dist = distance(additionPoint.position, graph[id].position)

            if (dist < 0.05) {
                perfectPoint = {id, alreadyInGraph: true}
            }
            else {
                connections[id] = dist
            }
        })

        return perfectPoint || {
            id: idPrefix + additionPoint.id,
            alreadyInGraph: false,
            line: additionPoint.id,
            position: additionPoint.position,
            connections
        }
    }

    computePath(from: any, target: any) {
        const {graph} = this.props

        const route = new GraphDijkstra()

        const fromPoint = this.getPathAdditionalPoint(from, 'from_')
        const targetPoint = this.getPathAdditionalPoint(target, 'target_')

        if (!fromPoint.alreadyInGraph && !targetPoint.alreadyInGraph && fromPoint.line === targetPoint.line) {
            const dist = distance(fromPoint.position, targetPoint.position)
            fromPoint.connections[targetPoint.id] = dist
            targetPoint.connections[fromPoint.id] = dist
        }

        _.forEach(graph, (node, nodeId) => {
            const distanceToFromPoint = !fromPoint.alreadyInGraph ? fromPoint.connections[nodeId] : null
            const distanceToTargetPoint = !targetPoint.alreadyInGraph ? targetPoint.connections[nodeId] : null

            const connections = _.assign({}, node.connections)

            if (distanceToFromPoint) {
                _.assign(connections, {[fromPoint.id]: distanceToFromPoint})
            }

            if (distanceToTargetPoint) {
                _.assign(connections, {[targetPoint.id]: distanceToTargetPoint})
            }

            route.addNode(nodeId, connections)
        })

        !fromPoint.alreadyInGraph && route.addNode(fromPoint.id, fromPoint.connections)
        !targetPoint.alreadyInGraph && route.addNode(targetPoint.id, targetPoint.connections)

        const points = _.map(route.path(fromPoint.id, targetPoint.id), nodeId => {
            return {
                [targetPoint.id]: targetPoint.position,
                [fromPoint.id]: fromPoint.position
            }[nodeId] || graph[nodeId].position
        })
        points.unshift(from)
        points.push(target)

        return splitPath(points, SPEED)
    }

    computePaths(customerPosition: any, courierPosition: any) {
        const {graph, restaurants: restaurant} = this.props

        const restaurantPoint = this.getPathAdditionalPoint(restaurant.position)
        const restaurantPosition = !restaurantPoint.alreadyInGraph ? restaurantPoint.position : graph[restaurantPoint.id].position

        const path1 = this.computePath(courierPosition, restaurantPosition)
        const path2 = this.computePath(restaurantPosition, customerPosition)

        return {path1, path2}
    }

    simulate1() {
        const run = () => {
            const {restaurants: restaurant} = this.props
            const {courierPosition, path1} = this.state

            const newPath1 = path1.slice(1)
            const newCourierPosition = newPath1.length > 0 ? newPath1[0]: courierPosition

            this.setState({path1: newPath1, courierPosition: newCourierPosition})

            if (newPath1.length > 0 && this.simulationOngoing) {
                requestAnimationFrame(run)
            }
            else if (newPath1.length === 0) {
                this.simulationOngoing = false
                this.props.onPickingDone()
                this.props.onActionEnd && this.props.onActionEnd()
                const success1 = [(restaurant.position[0] + newCourierPosition[0]) / 2, (restaurant.position[1] + newCourierPosition[1]) / 2]
                this.setState({success1})
            }
        }

        this.simulationOngoing = true
        this.props.onActionStart && this.props.onActionStart()
        run()
    }

    simulate2() {
        const run = () => {
            const {customerPosition, courierPosition, path2} = this.state

            let newPath2 = path2.slice(1)
            if (newPath2.length > 0 && distance(newPath2[0], customerPosition) < STOP_MARGIN) {
                newPath2 = []
            }
            const newCourierPosition = newPath2.length > 0 ? newPath2[0] : courierPosition

            this.setState({path2: newPath2, courierPosition: newCourierPosition})

            if (newPath2.length > 0 && this.simulationOngoing) {
                requestAnimationFrame(run)
            }
            else if (newPath2.length === 0) {
                this.simulationOngoing = false
                this.props.onDeliveryDone()
                this.props.onActionEnd && this.props.onActionEnd()
                const success2 = [(customerPosition[0] + newCourierPosition[0]) / 2, (customerPosition[1] + newCourierPosition[1]) / 2]
                this.setState({success2})
            }
        }

        this.simulationOngoing = true
        this.props.onActionStart && this.props.onActionStart()
        run()
    }

    onClick(event: any) {
        const {step} = this.props

        const eventPoint = [event.offsetX, event.offsetY]

        if (step === STEPS.SET_CUSTOMER_POSITION) {
            const customerPositionBuffer = this.getPositionBuffer(eventPoint)
            this.props.onCustomerSet(customerPositionBuffer.length > 0 ? _.last(customerPositionBuffer) : eventPoint)
            this.setState({customerPosition: eventPoint, customerPositionBuffer})
        }
        else if (step === STEPS.CHOOSE_RESTAURANT) {
            const nearRestaurantIndex = this.getNearestRestaurantIndex(eventPoint)

            if (nearRestaurantIndex !== null) {
                this.props.onRestaurantSelected(nearRestaurantIndex)
                this.setState({selectedRestaurantIndex: nearRestaurantIndex})
            }
        }
        else if (step === STEPS.SET_COURIER_POSITION) {
            const courierPositionBuffer = this.getPositionBuffer(eventPoint)
            this.props.onCourierSet(courierPositionBuffer.length > 0 ? _.last(courierPositionBuffer) : eventPoint)

            if (this.state.customerPosition) {
                const {path1, path2} = this.computePaths(this.state.customerPosition, eventPoint)
                this.setState({courierPosition: eventPoint, courierPositionBuffer, path1, path2})
            }
            else {
                this.setState({courierPosition: eventPoint, courierPositionBuffer})
            }
        }
    }

    onBtnSimulationClick() {
        const {step} = this.props

        if (step === STEPS.SIMULATE_COURIER_TO_RESTAURANT && !this.simulationOngoing) {
            this.simulate1()
        }
        else if (step === STEPS.SIMULATE_COURIER_TO_CUSTOMER && !this.simulationOngoing) {
            this.simulate2()
        }
        else if (this.simulationOngoing) {
            this.simulationOngoing = false
        }
    }

    onRandomAction(event: any) {
        if (event.keyCode === 32) {
            const {step, dimensions, restaurants} = this.props

            if (this.allowSimulation()) {
                this.onBtnSimulationClick()
            }
            else if (step === STEPS.CHOOSE_RESTAURANT) {
                const restaurantIndex = ((this.state.selectedRestaurantIndex || 0) + 1) % restaurants.length
                const event = {
                    offsetX: restaurants[restaurantIndex].position[0],
                    offsetY: restaurants[restaurantIndex].position[1]
                }
                this.onClick(event)
            }

            else {
                const event = {
                    offsetX: _.random(0, dimensions.width),
                    offsetY: _.random(0, dimensions.height)
                }
                this.onClick(event)
            }
        }
    }

    componentDidMount() {
        this.containerElement = ReactDOM.findDOMNode(this)

        this.containerElement.addEventListener('click', this.onClick, false)
        this.props.keySpaceHelper && window.addEventListener('keydown', this.onRandomAction, false)
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.state.customerPositionBuffer.length > 0 && prevState.customerPositionBuffer.length === 0) {
            this.adjustCustomerPosition()
        }
        else if (this.state.courierPositionBuffer.length > 0 && prevState.courierPositionBuffer.length === 0) {
            this.adjustCourierPosition()
        }
        else if (this.props.step == STEPS.SET_COURIER_POSITION && !_.isEqual(this.props.initialCustomerPosition, prevProps.initialCustomerPosition)) {
            if (this.props.initialCustomerPosition) {
                const {path1, path2} = this.computePaths(this.props.initialCustomerPosition, this.state.courierPosition)
                this.setState({customerPosition: this.props.initialCustomerPosition, path1, path2})
            }
            else {
                this.setState({customerPosition: null, path1: null, path2: null})
            }
        }
    }

    componentWillUnmount() {
        this.containerElement.removeEventListener('click', this.onClick, false)
        this.props.keySpaceHelper && window.removeEventListener('keydown', this.onRandomAction, false)
    }

    render() {
        const {step, image, restaurants} = this.props
        const {customerPosition, courierPosition, path1, success1, path2, success2} = this.state

        const selectedRestaurantIndex = step === STEPS.CHOOSE_RESTAURANT ? this.state.selectedRestaurantIndex : null

        return (
            <div className="map">
                <img src={image} alt="" draggable={false}/>
                <svg>
                    {path1 && <path d={this.getPathFromListOfPoints(path1)}/>}
                    {path2 && <path d={this.getPathFromListOfPoints(path2)} style={{strokeDasharray: step < STEPS.SIMULATE_COURIER_TO_CUSTOMER ? 7 : 0}}/>}
                </svg>
                {_.map(_.isArray(restaurants) ? restaurants : [restaurants], (restaurant, index) => (
                    <div key={index} className={`restaurant ${restaurant.labelDirection}${selectedRestaurantIndex !== null && selectedRestaurantIndex !== index ? ' not-selected' : ''}`}
                         style={{transform: `translate(${restaurant.position[0]}px, ${restaurant.position[1]}px)`}}>
                        <div className="icon"><i className="fas fa-utensils"/></div>
                        <div className="name">{restaurant.name}</div>
                    </div>
                ))}
                <svg>
                    {customerPosition && (
                        <g transform={`translate(${customerPosition[0]}, ${customerPosition[1]})`}>
                            <circle cx="0" cy="0" r="15"/>
                            <path fill="white" transform="translate(-8, -8) scale(0.03125)" d="M256 0c88.366 0 160 71.634 160 160s-71.634 160-160 160S96 248.366 96 160 167.634 0 256 0zm183.283 333.821l-71.313-17.828c-74.923 53.89-165.738 41.864-223.94 0l-71.313 17.828C29.981 344.505 0 382.903 0 426.955V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48v-37.045c0-44.052-29.981-82.45-72.717-93.134z"/>
                        </g>
                    )}
                    {courierPosition && (
                        <g transform={`translate(${courierPosition[0]}, ${courierPosition[1]})`}>
                            <circle cx="0" cy="0" r="15"/>
                            <path transform="translate(-10, -10) scale(0.0390625)" d="M499.991 168h-54.815l-7.854-20.944c-9.192-24.513-25.425-45.351-46.942-60.263S343.651 64 317.472 64H194.528c-26.18 0-51.391 7.882-72.908 22.793-21.518 14.912-37.75 35.75-46.942 60.263L66.824 168H12.009c-8.191 0-13.974 8.024-11.384 15.795l8 24A12 12 0 0 0 20.009 216h28.815l-.052.14C29.222 227.093 16 247.997 16 272v48c0 16.225 6.049 31.029 16 42.309V424c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-40h256v40c0 13.255 10.745 24 24 24h48c13.255 0 24-10.745 24-24v-61.691c9.951-11.281 16-26.085 16-42.309v-48c0-24.003-13.222-44.907-32.772-55.86l-.052-.14h28.815a12 12 0 0 0 11.384-8.205l8-24c2.59-7.771-3.193-15.795-11.384-15.795zm-365.388 1.528C143.918 144.689 168 128 194.528 128h122.944c26.528 0 50.61 16.689 59.925 41.528L391.824 208H120.176l14.427-38.472zM88 328c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32s48 30.327 48 48-30.327 16-48 16zm336 0c-17.673 0-48 1.673-48-16 0-17.673 30.327-48 48-48s32 14.327 32 32c0 17.673-14.327 32-32 32z"/>
                        </g>
                    )}
                </svg>
                {this.allowSimulation() && (
                    <i className={`btn-simulation far fa-${!this.simulationOngoing ? 'play' : 'pause'}-circle`}
                       title="(SPACE)" onClick={this.onBtnSimulationClick}/>
                )}
                {success1 && <Success x={success1[0]} y={success1[1]}/>}
                {success2 && <Success x={success2[0]} y={success2[1]}/>}
            </div>
        )
    }
}

export default Map