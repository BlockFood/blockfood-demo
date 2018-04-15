import * as React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {IState} from '../state/InitialState'
import * as Routes from '../views/Routes'
import {STEPS} from './types/Steps'
import Error from '../components/error/Error'

class DemoViewValidator extends React.Component<any, any> {
    isValid(): boolean {
        const {pathname} = this.props.location
        const {step, customerOrderInProgress, customerPosition} = this.props

        const currentRoute = Routes.getCurrentRoute(pathname)

        const isFreeMode = step === STEPS.FREE_MODE
        const isCustomerSteps = step >= STEPS.CUSTOMER_SET_LOCATION && step <= STEPS.CUSTOMER_DO_PAYMENT

        switch (currentRoute) {
            case Routes.CUSTOMER_LOCATION_ROUTE:
            case Routes.CUSTOMER_RESTAURANT_LIST_ROUTE:
                return isFreeMode || isCustomerSteps
            case Routes.CUSTOMER_ORDER_ROUTE:
            case Routes.CUSTOMER_POSITION_ROUTE:
                return (isCustomerSteps || isFreeMode) && customerOrderInProgress
            case Routes.CUSTOMER_PAYMENT_ROUTE:
                return (isCustomerSteps || isFreeMode) && customerOrderInProgress && customerPosition
            case Routes.RESTAURANT_EXAMPLE_ROUTE:
                return isFreeMode || (step >= STEPS.RESTAURANT_ACCEPT_ORDER && step <= STEPS.RESTAURANT_NOTIFY_ORDER_READY)
            case Routes.COURIER_EXAMPLE_ROUTE:
                return isFreeMode || (step >= STEPS.COURIER_ACCEPT_ORDER && step <= STEPS.COURIER_NOTIFY_ORDER_DELIVERED)
            default:
                return true
        }
    }

    render() {
        if (this.isValid()) {
            return this.props.children
        }
        else {
            return <Error/>
        }
    }
}

const mapStateToProps = (state: IState) => {
    return {
        step: state.step,
        customerOrderInProgress: state.customerOrderInProgress,
        customerPosition: state.customerPosition
    }
}

export default withRouter(connect(mapStateToProps)(DemoViewValidator) as any) as any