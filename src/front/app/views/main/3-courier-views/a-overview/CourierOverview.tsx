import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {IRootState} from '../../../../state/Reducers'
import withDemoController from '../../../../demoController/WithDemoController'
import {RESTAURANTS_BY_IDS} from '../../../../../../lib/Restaurants'
import Map, {STEPS} from '../../../../components/map/Map'
import MapData from '../../../../components/map/MapData'
import doWithMinTime from '../../../../utils/DoWithMinTime'
import Api from '../../../../api/Api'
import {ORDER_STATUS} from '../../../../../../lib/Orders'
import {Order} from '../../../../components/order/Order'
import ScrollableDiv from '../../../../components/scrollableDiv/ScrollableDiv'
import {selectOrdersForCourier} from '../../../../state/Selectors'
import {setCourierPosition, setOrders} from '../../../../state/Actions'

import './CourierOverview.scss'

class CourierOverview extends React.Component<any, any> {
    private restaurantsForMap: any
    private containerElement: HTMLElement

    constructor(props: any) {
        super(props)

        this.restaurantsForMap = _.mapValues(RESTAURANTS_BY_IDS, (restaurant) => _.assign({}, {name: restaurant.name}, restaurant.map))

        const selectedOrder = _.find(this.props.orders, order => [ORDER_STATUS.PICKING, ORDER_STATUS.DELIVERING].indexOf(order.status) !== -1) || null

        this.state = {
            selectedOrder,
            ongoing: !!selectedOrder,
            loading: false,
            simulating: !!selectedOrder
        }

        this.onCourierSet = this.onCourierSet.bind(this)
        this.onSimulationDone = this.onSimulationDone.bind(this)
        this.onOrderValid = this.onOrderValid.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    private onCourierSet(position: [number, number]) {
        this.props.setCourierPosition(position)
    }

    private onSimulationDone(position: [number, number]) {
        this.onCourierSet(position)
        this.setState({simulating: false})
    }

    private async onOrderValid(orderId: string) {
        if (!this.state.ongoing || orderId === this.state.selectedOrder.id) {
            const order = _.find(this.props.orders, ({id}) => id === orderId)

            let isOngoingBefore = true, isOnGoingAfter = true
            let unselectedOrder = false
            let nextStatus: ORDER_STATUS
            if (order.status === ORDER_STATUS.READY) {
                nextStatus = ORDER_STATUS.PICKING
            }
            else if (order.status === ORDER_STATUS.PICKING) {
                nextStatus = ORDER_STATUS.DELIVERING
            }
            else {
                isOnGoingAfter = false
                unselectedOrder = true
                nextStatus = ORDER_STATUS.DONE
            }

            this.setState({loading: true, ongoing: isOngoingBefore, simulating: isOngoingBefore})

            const orders = await doWithMinTime(() => Api.updateOrderStatus(orderId, nextStatus))

            this.props.setOrders(orders)
            if (this.props.demoController.goToNextStep()) {
                const nextSelectedOrder = unselectedOrder ? null : _.find(orders, ({id}) => id === orderId)
                this.setState({selectedOrder: nextSelectedOrder, loading: false, ongoing: isOnGoingAfter, simulating: isOnGoingAfter})
            }
        }
    }

    private onClick(event: any) {
        if (!this.state.ongoing) {
            let {target} = event, orderId = target.getAttribute('data-order-id'), isMap = target.className === 'map-wrapper'
            while (!orderId && !isMap && target.parentElement) {
                target = target.parentElement
                orderId = target.getAttribute('data-order-id')
                isMap = target.className === 'map-wrapper'
            }

            if (orderId) {
                const order = _.find(this.props.orders, ({id}) => id === orderId)

                if (order.status !== ORDER_STATUS.DONE) {
                    this.setState({selectedOrder: order})
                }
            }
            else if (!isMap) {
                this.setState({selectedOrder: null})
            }
        }
    }

    public componentDidMount() {
        this.containerElement = ReactDOM.findDOMNode(this) as HTMLElement

        this.containerElement.addEventListener('click', this.onClick, false)
    }

    public componentWillUnmount() {
        this.containerElement.removeEventListener('click', this.onClick, false)
    }

    public render() {
        const {courierPosition, orders} = this.props
        const {selectedOrder, loading, ongoing, simulating} = this.state

        const customerPosition =  selectedOrder ? selectedOrder.customerPosition : null
        const restaurantsForMap = selectedOrder ? this.restaurantsForMap[selectedOrder.restaurantId] : _.values(this.restaurantsForMap)

        let mapStep = STEPS.SET_COURIER_POSITION
        if (ongoing && selectedOrder.status === ORDER_STATUS.PICKING) {
            mapStep = STEPS.SIMULATE_COURIER_TO_RESTAURANT
        }
        else if (ongoing && selectedOrder.status === ORDER_STATUS.DELIVERING) {
            mapStep = STEPS.SIMULATE_COURIER_TO_CUSTOMER
        }

        return (
            <div id="bf-demo-courier-overview">
                <div className="middle">
                    <div className="map-scroll-wrapper">
                        <div className="map-wrapper" style={MapData.dimensions}>
                            <Map step={mapStep} image={MapData.image} dimensions={MapData.dimensions}
                                 graph={MapData.graph}
                                 initialCustomerPosition={customerPosition}
                                 initialCourierPosition={courierPosition}
                                 restaurants={restaurantsForMap}
                                 onCourierSet={this.onCourierSet}
                                 onPickingDone={this.onSimulationDone}
                                 onDeliveryDone={this.onSimulationDone}/>
                        </div>
                    </div>
                    <p>
                        <i className="far fa-lightbulb"/>
                        {!ongoing && 'Click on the map to modify your position'}
                        {(ongoing && simulating) && 'Click on the map to move to your destination'}
                        {(ongoing && !simulating) && 'You arrived at your destination!'}
                    </p>
                </div>
                <ScrollableDiv className="right">
                    <h3>Orders</h3>
                    {_.map(orders, order => {
                        const isSelected = selectedOrder ? selectedOrder.id === order.id : false
                        const isDone = order.status === ORDER_STATUS.DONE

                        const onValidLabel = {
                            [ORDER_STATUS.READY]: 'Accept',
                            [ORDER_STATUS.PICKING]: 'Notify picked',
                            [ORDER_STATUS.DELIVERING]: 'Done'
                        }[order.status]

                        let className = 'courierOrder'
                        if (isSelected) {
                            className += ' selected'
                        }
                        else if ((ongoing && !isSelected) || isDone) {
                            className += ' locked'
                        }

                        return (
                            <Order key={order.id}
                                   className={className}
                                   order={order}
                                   onValidLabel={onValidLabel}
                                   onValid={!isDone ? this.onOrderValid : undefined}
                                   onValidDisabled={simulating}
                                   loading={isSelected && loading}
                                   showRestaurantName/>
                        )
                    })}
                </ScrollableDiv>
            </div>
        )
    }
}

const mapStatToProps = (state: IRootState) => {
    return {
        courierPosition: state.application.courierPosition,
        orders: selectOrdersForCourier(state.application.orders)
    }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    setCourierPosition: (courierPosition: [number, number]) => dispatch(setCourierPosition(courierPosition)),
    setOrders: (orders:any) => dispatch(setOrders(orders))
  }
}


export default connect(mapStatToProps,mapDispatchToProps)(withDemoController(CourierOverview))
