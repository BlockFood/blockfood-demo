import * as React from 'react'
import {connect} from 'react-redux'
import {IState} from '../../../../state/InitialState'
import * as Routes from '../../../Routes'
import withDemoController from '../../../../demoController/WithDemoController'
import {setCustomerLocation} from '../../../../state/Actions'

import './CustomerLocation.scss'

export class CustomerLocation extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange = (event: any) => {
        this.props.dispatch(setCustomerLocation(event.target.value))
    }

    onSubmit = (event: any) => {
        event.preventDefault()

        if (this.props.demoController.goToNextStep()) {
            this.props.history.replace(Routes.getRouteCustomerExample())
        }
    }

    render() {
        const {customerLocation} = this.props

        return (
            <div id="bf-demo-view-customer-location">
                <div className="localisation">
                    <h1>Deliver my food</h1>
                    <div className="search">
                        <form onSubmit={this.onSubmit}>
                            <input className="input" type="text"
                                   placeholder="Enter your delivery address"
                                   value={customerLocation} onChange={this.onChange}/>
                            <button type="submit" className="searchButton">I am hungry!</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatToProps = (state: IState) => {
    return {
        customerLocation: state.customerLocation
    }
}

export default connect(mapStatToProps)(withDemoController(CustomerLocation))