import * as React from 'react'
import * as Routes from '../../../Routes'
import withDemoController from '../../../../demoController/WithDemoController'

import './CustomerOrder.scss'

class CustomerOrder extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.onGoBack = this.onGoBack.bind(this)
    }

    private onGoBack() {
        this.props.history.replace(Routes.getRouteCustomerRestaurantList())
    }

    public render() {
        return (
            <div id="bf-demo-view-customer-order">
                <div className="back" onClick={this.onGoBack}><i className="fas fa-long-arrow-alt-left"/>Go back</div>
            </div>
        )
    }
}

export default withDemoController(CustomerOrder)
