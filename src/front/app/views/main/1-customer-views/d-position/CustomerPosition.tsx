import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {IState} from '../../../../state/InitialState'
import withDemoController from '../../../../demoController/WithDemoController'
import * as Routes from '../../../Routes'
import {RESTAURANTS_BY_IDS} from '../../../../../../lib/Restaurants'
import GoBack from '../../../../components/goBack/GoBack'
import Map, {STEPS} from '../../../../components/map/Map'
import MapData from '../../../../components/map/MapData'

import './CustomerPosition.scss'

class CustomerPosition extends React.Component<any, any> {
    private restaurantForMap: any

    constructor(props: any) {
        super(props)

        const {restaurantId} = this.props.customerOrderInProgress
        const restaurant = RESTAURANTS_BY_IDS[restaurantId]
        this.restaurantForMap = _.assign({}, {name: restaurant.name}, restaurant.map)

        this.onGoBack = this.onGoBack.bind(this)
    }

    private onGoBack() {
        const {restaurantId} = this.props.customerOrderInProgress
        this.props.history.replace(Routes.getRouteCustomerOrder(restaurantId))
    }

    public render() {
        return (
            <div id="bf-demo-customer-position">
                <GoBack onGoBack={this.onGoBack}/>
                <div className="map-scroll-wrapper">
                    <div className="map-wrapper" style={MapData.dimensions}>
                        <Map step={STEPS.SET_CUSTOMER_POSITION} image={MapData.image} dimensions={MapData.dimensions}
                             graph={MapData.graph}
                             restaurants={this.restaurantForMap}
                             onCustomerSet={() => {}}
                             onActionStart={() => {}} onActionEnd={() => {}}/>
                    </div>
                </div>
                <div>
                    <button>
                        <i className="fas fa-arrow-right"/>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStatToProps = (state: IState) => {
    return {
        customerOrderInProgress: state.customerOrderInProgress
    }
}

export default connect(mapStatToProps)(withDemoController(CustomerPosition))