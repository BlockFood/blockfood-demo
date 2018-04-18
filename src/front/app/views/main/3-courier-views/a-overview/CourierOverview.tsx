import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {IState} from '../../../../state/InitialState'
import withDemoController from '../../../../demoController/WithDemoController'
import {RESTAURANTS_BY_IDS} from '../../../../../../lib/Restaurants'
import Map, {STEPS} from '../../../../components/map/Map'
import MapData from '../../../../components/map/MapData'
import doWithMinTime from '../../../../utils/DoWithMinTime'
import Api from '../../../../api/Api'
import {ORDER_STATUS} from '../../../../../../lib/Orders'
import {CourierOrder} from './order/CourierOrder'
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
            loading: false
        }

        this.onCourierSet = this.onCourierSet.bind(this)
        this.onOrderAccept = this.onOrderAccept.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    private onCourierSet(position: [number, number]) {
        this.props.dispatch(setCourierPosition(position))
    }

    private async onOrderAccept(orderId: string) {
        if (!this.state.ongoing || orderId === this.state.selectedOrder.id) {
            const order = _.find(this.props.orders, ({id}) => id === orderId)

            let isOngoingBefore = true, isOnGoingAfter = true, nextSelectedOrder = this.state.selectedOrder
            let nextStatus: ORDER_STATUS
            if (order.status === ORDER_STATUS.READY) {
                isOngoingBefore = true
                isOnGoingAfter = true
                nextStatus = ORDER_STATUS.PICKING
            }
            else if (order.status === ORDER_STATUS.PICKING) {
                nextStatus = ORDER_STATUS.DELIVERING
            }
            else {
                isOnGoingAfter = false
                nextSelectedOrder = null
                nextStatus = ORDER_STATUS.DONE
            }

            this.setState({loading: true, ongoing: isOngoingBefore})

            const orders = await doWithMinTime(() => Api.updateOrderStatus(orderId, nextStatus))

            this.props.dispatch(setOrders(orders))
            if (this.props.demoController.goToNextStep()) {
                this.setState({selectedOrder: nextSelectedOrder, loading: false, ongoing: isOnGoingAfter})
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
        const {selectedOrder, loading, ongoing} = this.state

        const customerPosition =  selectedOrder ? selectedOrder.customerPosition : null
        const restaurantsForMap = selectedOrder ? this.restaurantsForMap[selectedOrder.restaurantId] : _.values(this.restaurantsForMap)

        return (
            <div id="bf-demo-courier-overview">
                <div className="middle">
                    <div className="map-scroll-wrapper">
                        <div className="map-wrapper" style={MapData.dimensions}>
                            <Map step={STEPS.SET_COURIER_POSITION} image={MapData.image} dimensions={MapData.dimensions}
                                 graph={MapData.graph}
                                 initialCustomerPosition={customerPosition}
                                 initialCourierPosition={courierPosition}
                                 restaurants={restaurantsForMap}
                                 onCourierSet={this.onCourierSet}/>
                        </div>
                    </div>
                    <p><i className="far fa-lightbulb"/> Click on the map to modify your position</p>
                </div>
                <ScrollableDiv className="right">
                    <h3>Orders</h3>
                    {_.map(orders, order => {
                        const isSelected = selectedOrder ? selectedOrder.id === order.id : false

                        return (
                            <CourierOrder key={order.id}
                                          orderId={order.id}
                                          orderStatus={order.status}
                                          selected={isSelected}
                                          locked={ongoing && !isSelected}
                                          restaurantName={RESTAURANTS_BY_IDS[order.restaurantId].name}
                                          onAccept={this.onOrderAccept}
                                          loading={isSelected && loading}/>
                        )
                    })}
                </ScrollableDiv>
            </div>
        )
    }
}

const mapStatToProps = (state: IState) => {
    return {
        courierPosition: state.courierPosition,
        orders: selectOrdersForCourier(state.orders)
    }
}

export default connect(mapStatToProps)(withDemoController(CourierOverview))