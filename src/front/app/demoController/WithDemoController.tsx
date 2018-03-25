import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {STEPS} from './Steps'
import {HELP_MESSAGES} from './HelpMessages'
import * as Routes from '../views/Routes'
import {setHelpMessage, setStep, restart} from '../state/Actions'

const LAST_FREE_MODE_ROUTES = {}

export default (WrappedComponent: any) => {

    class WrappedComponentWithDemoController extends React.Component<any, any> {
        constructor(props: any) {
            super(props)

            this.start = this.start.bind(this)
            this.restart = this.restart.bind(this)
            this.switchView = this.switchView.bind(this)
        }

        start() {
            this.props.dispatch(setStep(STEPS.CUSTOMER_SET_ADDRESS))
            this.props.dispatch(setHelpMessage(HELP_MESSAGES.START_AS_CUSTOMER))
            this.props.history.replace(Routes.getRouteCustomerExample())
        }

        restart() {
            this.props.dispatch(restart())
            this.props.history.replace(Routes.HOME)
        }

        switchView(newViewPrefix: string) {
            const {pathname} = this.props.location

            const currentViewPrefix = Routes.getViewPrefixFromPathname(pathname) as string
            LAST_FREE_MODE_ROUTES[currentViewPrefix] = pathname

            let routeToRedirect
            if (newViewPrefix === Routes.CUSTOMER_PREFIX) {
                routeToRedirect = LAST_FREE_MODE_ROUTES[Routes.CUSTOMER_PREFIX] || Routes.getRouteCustomerExample()
            }
            else if (newViewPrefix === Routes.RESTAURANT_PREFIX) {
                routeToRedirect = LAST_FREE_MODE_ROUTES[Routes.RESTAURANT_PREFIX] || Routes.getRouteRestaurantExample()
            }
            else {
                routeToRedirect = LAST_FREE_MODE_ROUTES[Routes.COURIER_PREFIX] || Routes.getRouteCourierExample()
            }

            this.props.history.replace(routeToRedirect)
        }

        render() {
            const demoController = {
                start: this.start,
                restart: this.restart,
                switchView: this.switchView
            }

            return <WrappedComponent {...this.props} demoController={demoController}/>
        }
    }

    return withRouter(connect()(WrappedComponentWithDemoController) as any) as any
}