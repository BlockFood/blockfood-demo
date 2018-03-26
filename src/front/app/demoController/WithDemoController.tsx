import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {IOrder, ORDER_STATUS} from '../../../lib/Orders'
import {FIRST_STEP_WITH_AN_ORDER, STEPS} from './types/Steps'
import {HELP_MESSAGES} from './types/HelpMessages'
import * as Routes from '../views/Routes'
import {setHelpMessage, setStep, restart} from '../state/Actions'

const LAST_FREE_MODE_ROUTES = {}

export default (WrappedComponent: any) => {

    class WrappedComponentWithDemoController extends React.Component<any, any> {
        constructor(props: any) {
            super(props)

            this.init = this.init.bind(this)
            this.start = this.start.bind(this)
            this.restart = this.restart.bind(this)
            this.switchView = this.switchView.bind(this)
        }

        init(orders: IOrder[]) {
            const {pathname} = this.props.location

            let step: STEPS
            if (orders.length === 0) {
                // At the beginning, as a customer, 1 route = 1 step,
                // so the step is given by the current route
                step = Routes.getCustomerRouteIndex(pathname) as STEPS
            }
            else if (orders[0].status === ORDER_STATUS.DONE) {
                step = STEPS.FREE_MODE
            }
            else {
                // After the customer part, each order status = 1 step,
                // so the step is given by the current order status
                const statusIndex = _.findIndex(_.values(ORDER_STATUS), status => status === orders[0].status)
                step = (statusIndex + FIRST_STEP_WITH_AN_ORDER) as STEPS
            }

            this.props.dispatch(setStep(step))
        }

        start() {
            this.props.dispatch(setStep(STEPS.CUSTOMER_SET_ADDRESS))
            this.props.dispatch(setHelpMessage(HELP_MESSAGES.START_AS_CUSTOMER))
            this.props.history.replace(Routes.getDefaultRouteCustomer())
        }

        restart() {
            this.props.dispatch(restart())
            this.props.history.replace(Routes.HOME)
        }

        switchView(newView: string) {
            const {pathname} = this.props.location

            const currentView = Routes.getViewFromPathname(pathname) as string
            LAST_FREE_MODE_ROUTES[currentView] = pathname

            let routeToRedirect
            if (newView === Routes.CUSTOMER_VIEW) {
                routeToRedirect = LAST_FREE_MODE_ROUTES[Routes.CUSTOMER_VIEW] || Routes.getDefaultRouteCustomer()
            }
            else if (newView === Routes.RESTAURANT_VIEW) {
                routeToRedirect = LAST_FREE_MODE_ROUTES[Routes.RESTAURANT_VIEW] || Routes.getDefaultRouteRestaurant()
            }
            else {
                routeToRedirect = LAST_FREE_MODE_ROUTES[Routes.COURIER_VIEW] || Routes.getDefaultRouteCourier()
            }

            this.props.history.replace(routeToRedirect)
        }

        render() {
            const demoController = {
                init: this.init,
                start: this.start,
                restart: this.restart,
                switchView: this.switchView
            }

            return <WrappedComponent {...this.props} demoController={demoController}/>
        }
    }

    return withRouter(connect()(WrappedComponentWithDemoController) as any) as any
}