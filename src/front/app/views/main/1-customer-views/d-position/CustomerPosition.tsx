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
import {setCustomerPosition} from '../../../../state/Actions'

import './CustomerPosition.scss'

class CustomerPosition extends React.Component<any, any> {
    private restaurantForMap: any

    constructor(props: any) {
        super(props)

        const {restaurantId} = this.props.customerOrderInProgress
        const restaurant = RESTAURANTS_BY_IDS[restaurantId]
        this.restaurantForMap = _.assign({}, {name: restaurant.name}, restaurant.map)

        this.state = {
            canGoNext: !!this.props.customerPosition
        }

        this.onGoBack = this.onGoBack.bind(this)
        this.onCustomerSet = this.onCustomerSet.bind(this)
        this.onActionStart = this.onActionStart.bind(this)
        this.onActionEnd = this.onActionEnd.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    private onGoBack() {
        const {restaurantId} = this.props.customerOrderInProgress
        this.props.history.replace(Routes.getRouteCustomerOrder(restaurantId))
    }

    private onCustomerSet(position: [number, number]) {
        this.setState({canGoNext: true})
        this.props.dispatch(setCustomerPosition(position))
    }

    private onActionStart() {
        this.setState({canGoNext: false})
    }

    private onActionEnd() {
        this.setState({canGoNext: true})
    }

    private onSubmit() {
        if (this.state.canGoNext) {
            if (this.props.demoController.goToNextStep()) {
                this.props.history.replace(Routes.getRouteCustomerPayment())
            }
        }
    }

    public render() {
        const {customerPosition} = this.props
        const {canGoNext} = this.state

        return (
            <div id="bf-demo-customer-position">
                <div className="left"><GoBack onGoBack={this.onGoBack}/></div>
                <div className="middle">
                    <div className="map-scroll-wrapper">
                        <div className="map-wrapper" style={MapData.dimensions}>
                            <Map step={STEPS.SET_CUSTOMER_POSITION} image={MapData.image} dimensions={MapData.dimensions}
                                 graph={MapData.graph}
                                 initialCustomerPosition={customerPosition}
                                 restaurants={this.restaurantForMap}
                                 onCustomerSet={this.onCustomerSet}
                                 onActionStart={this.onActionStart} onActionEnd={this.onActionEnd}/>
                        </div>
                    </div>
                    <p><i className="far fa-lightbulb"/> Click on the map to modify your position</p>
                </div>
                <div className="right">
                    <button className={!canGoNext ? 'disabled' : ''} onClick={this.onSubmit}>
                        <i className="fas fa-arrow-right"/>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStatToProps = (state: IState) => {
    return {
        customerOrderInProgress: state.customerOrderInProgress,
        customerPosition: state.customerPosition
    }
}

export default connect(mapStatToProps)(withDemoController(CustomerPosition))