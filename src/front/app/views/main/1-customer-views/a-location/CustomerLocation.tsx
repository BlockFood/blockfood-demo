import * as React from 'react'
import {connect} from 'react-redux'
import {IRootState} from '../../../../state/Reducers'
import * as Routes from '../../../Routes'
import withDemoController from '../../../../demoController/WithDemoController'
import {setCustomerLocation} from '../../../../state/Actions'

import './CustomerLocation.scss'

export class CustomerLocation extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onBrowseAll = this.onBrowseAll.bind(this)
    }

    private onChange = (event: any) => {
      this.props.setCustomerLocation(event.target.value)

        // this.props.dispatch(setCustomerLocation(event.target.value))
    }

    private _onSubmit() {
        if (this.props.demoController.goToNextStep()) {
            this.props.history.replace(Routes.getRouteCustomerRestaurantList())
        }
    }

    private onSubmit = (event: any) => {
        event.preventDefault()

        if (this.props.customerLocation.length > 0) {
            this._onSubmit()
        }
    }

    private onBrowseAll() {
        this.props.setCustomerLocation('')
        // this.props.dispatch(setCustomerLocation(''))
        this._onSubmit()
    }

    public render() {
        const {customerLocation} = this.props

        return (
            <div id="bf-demo-view-customer-location">
                <div className="localisation">
                    <h1>Deliver my food</h1>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" placeholder="Enter your delivery address"
                               value={customerLocation} onChange={this.onChange}/>
                        <button type="submit" disabled={customerLocation.length === 0}>I am hungry!</button>
                    </form>
                    <a onClick={this.onBrowseAll}>Browse all</a>
                </div>
            </div>
        )
    }
}

const mapStatToProps = (state: IRootState) => {
    return {
        customerLocation: state.application.customerLocation
    }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    setCustomerLocation: (customerLocation: string) => dispatch(setCustomerLocation(customerLocation))
  }
}

export default connect(mapStatToProps,mapDispatchToProps)(withDemoController(CustomerLocation))
