import * as React from 'react'
import {connect} from 'react-redux'
import { IState } from '../../../../state/InitialState'
import * as Routes from '../../../Routes'
import withDemoController from '../../../../demoController/WithDemoController'
import {setCustomerLocation} from '../../../../state/Actions'

import './CustomerLocation.scss'

interface IProps {
    dispatch: any
    demoController: any
    customerLocation: any
    history: any
}

export class CustomerLocation extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    private onChange = (event: any) => {
        this.props.dispatch(setCustomerLocation(event.target.value))
    }

    private onSubmit = (event: any) => {
        const {customerLocation} = this.props
        event.preventDefault()

        if (this.props.demoController.goToNextStep()) {
            this.props.history.replace(Routes.getRouteCustomerExample(customerLocation))
        }
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
                        <button type="submit">I am hungry!</button>
                    </form>
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