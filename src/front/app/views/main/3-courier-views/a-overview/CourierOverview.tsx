import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {IState} from '../../../../state/InitialState'
import withDemoController from '../../../../demoController/WithDemoController'
import {RESTAURANTS_BY_IDS} from '../../../../../../lib/Restaurants'
import Map, {STEPS} from '../../../../components/map/Map'
import MapData from '../../../../components/map/MapData'
import {CourierOrder} from './order/CourierOrder'
import ScrollableDiv from '../../../../components/scrollableDiv/ScrollableDiv'
import {selectOrdersForCourier} from '../../../../state/Selectors'
import {setCourierPosition} from '../../../../state/Actions'

import './CourierOverview.scss'

class CourierOverview extends React.Component<any, any> {
    private restaurantsForMap: any

    constructor(props: any) {
        super(props)

        this.restaurantsForMap = _.map(RESTAURANTS_BY_IDS, (restaurant) => _.assign({}, {name: restaurant.name}, restaurant.map))

        this.onCourierSet = this.onCourierSet.bind(this)
    }

    private onCourierSet(position: [number, number]) {
        this.props.dispatch(setCourierPosition(position))
    }

    public render() {
        const {courierPosition, orders} = this.props

        return (
            <div id="bf-demo-courier-overview">
                <div className="middle">
                    <div className="map-scroll-wrapper">
                        <div className="map-wrapper" style={MapData.dimensions}>
                            <Map step={STEPS.SET_COURIER_POSITION} image={MapData.image} dimensions={MapData.dimensions}
                                 graph={MapData.graph}
                                 initialCourierPosition={courierPosition}
                                 restaurants={this.restaurantsForMap}
                                 onCourierSet={this.onCourierSet}
                                 onActionStart={() => {}} onActionEnd={() => {}}/>
                        </div>
                    </div>
                    <p><i className="far fa-lightbulb"/> Click on the map to modify your position</p>
                </div>
                <ScrollableDiv className="right">
                    <h3>Orders</h3>
                    {_.map(orders, order => (
                        <CourierOrder key={order.id}
                                      orderId={order.id}
                                      restaurantName={RESTAURANTS_BY_IDS[order.restaurantId].name}
                                      onAccept={() => {}}
                                      loading={false}/>
                    ))}
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