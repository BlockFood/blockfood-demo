import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {IState} from '../state/InitialState'
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
            this.goToNextStep = this.goToNextStep.bind(this)
            this.isFreeMode = this.isFreeMode.bind(this)
        }

        init(orders: IOrder[]) {
            const {pathname} = this.props.location

            const currentRoute = Routes.getCurrentRoute(pathname) as string

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
                // TODO: update for new design (only one view)
                // After the customer part, each order status = 1 step,
                // so the step is given by the current order status
                const statusIndex = _.findIndex(_.values(ORDER_STATUS), status => status === orders[0].status)
                step = (statusIndex + FIRST_STEP_WITH_AN_ORDER) as STEPS
            }

            this.props.dispatch(setStep(step))

            // Handle case of refresh during customer/restaurant/courier transitions
            if (step === STEPS.RESTAURANT_ACCEPT_ORDER && currentRoute === Routes.CUSTOMER_PAYMENT_ROUTE) {
                this.props.history.replace(Routes.getDefaultRouteRestaurant(orders[0].restaurantId))
            }
        }

        start() {
            this.props.dispatch(setStep(STEPS.CUSTOMER_SET_LOCATION))
            this.props.dispatch(setHelpMessage(HELP_MESSAGES.START_AS_CUSTOMER))
            this.props.history.replace(Routes.getDefaultRouteCustomer())
        }

        restart() {
            this.props.dispatch(restart())
            this.props.history.replace(Routes.HOME)
        }

        switchView(newView: string) {
            const {pathname} = this.props.location
            const {orders} = this.props._demoControllerProps

            const currentView = Routes.getViewFromPathname(pathname) as string
            LAST_FREE_MODE_ROUTES[currentView] = pathname

            let routeToRedirect
            if (newView === Routes.CUSTOMER_VIEW) {
                routeToRedirect = LAST_FREE_MODE_ROUTES[Routes.CUSTOMER_VIEW] || Routes.getDefaultRouteCustomer()
            }
            else if (newView === Routes.RESTAURANT_VIEW) {
                let restaurantId
                if (LAST_FREE_MODE_ROUTES[Routes.RESTAURANT_VIEW]) {
                    restaurantId = Routes.getRestaurantIdFromPathname(LAST_FREE_MODE_ROUTES[Routes.RESTAURANT_VIEW])
                }
                else {
                    restaurantId = orders[0].restaurantId
                }

                routeToRedirect = LAST_FREE_MODE_ROUTES[Routes.RESTAURANT_VIEW] || Routes.getDefaultRouteRestaurant(restaurantId)
            }
            else {
                routeToRedirect = LAST_FREE_MODE_ROUTES[Routes.COURIER_VIEW] || Routes.getDefaultRouteCourier()
            }

            this.props.history.replace(routeToRedirect)
        }

        // Return false if the caller is not allowed to continue
        goToNextStep() {
            const {pathname} = this.props.location
            const {step, orders} = this.props._demoControllerProps

            const currentRoute = Routes.getCurrentRoute(pathname) as string

            if (step === STEPS.FREE_MODE) {
                return true
            }
            else if (step === STEPS.CUSTOMER_SET_LOCATION && currentRoute === Routes.CUSTOMER_LOCATION_ROUTE) {
                this.props.dispatch(setStep(STEPS.CUSTOMER_CHOOSE_RESTAURANT))

                return true
            }
            else if (step === STEPS.CUSTOMER_CHOOSE_RESTAURANT && currentRoute === Routes.CUSTOMER_RESTAURANT_LIST_ROUTE) {
                this.props.dispatch(setStep(STEPS.CUSTOMER_CREATE_ORDER))

                return true
            }
            else if (step === STEPS.CUSTOMER_CREATE_ORDER && currentRoute === Routes.CUSTOMER_ORDER_ROUTE) {
                this.props.dispatch(setStep(STEPS.CUSTOMER_SET_POSITION))

                return true
            }
            else if (step === STEPS.CUSTOMER_SET_POSITION && currentRoute === Routes.CUSTOMER_POSITION_ROUTE) {
                this.props.dispatch(setStep(STEPS.CUSTOMER_DO_PAYMENT))

                return true
            }
            else if (step === STEPS.CUSTOMER_DO_PAYMENT && currentRoute === Routes.CUSTOMER_PAYMENT_ROUTE) {
                    this.props.dispatch(setHelpMessage(HELP_MESSAGES.START_AS_RESTAURANT, () => {
                        this.props.dispatch(setStep(STEPS.RESTAURANT_ACCEPT_ORDER))
                        this.props.history.replace(Routes.getDefaultRouteRestaurant(orders[0].restaurantId))
                    }))

                    return false
            }
            // TODO: update for new design
            else if (step >= STEPS.RESTAURANT_ACCEPT_ORDER && step < STEPS.COURIER_ACCEPT_ORDER) {
                this.props.dispatch(setHelpMessage(HELP_MESSAGES.START_AS_COURIER, () => {
                    this.props.dispatch(setStep(STEPS.COURIER_ACCEPT_ORDER))
                    this.props.history.replace(Routes.getDefaultRouteCourier())
                }))

                return false
            }
            else if (step >= STEPS.COURIER_ACCEPT_ORDER) {
                this.props.dispatch(setHelpMessage(HELP_MESSAGES.START_FREE_MODE, () => {
                    this.props.dispatch(setStep(STEPS.FREE_MODE))
                }))

                return false
            }
            else {
                return true
            }
        }

        isFreeMode() {
            const {step} = this.props._demoControllerProps

            return step === STEPS.FREE_MODE
        }

        render() {
            const demoController = {
                init: this.init,
                start: this.start,
                restart: this.restart,
                switchView: this.switchView,
                goToNextStep: this.goToNextStep,
                isFreeMode: this.isFreeMode
            }

            const props = _.assign({}, this.props) as any
            delete props._demoControllerProps

            return <WrappedComponent {...props} demoController={demoController}/>
        }
    }

    const mapStateToProps = (state: IState) => {
        return {
            _demoControllerProps: {
                step: state.step,
                orders: state.orders
            }
        }
    }

    return withRouter(connect(mapStateToProps)(WrappedComponentWithDemoController) as any) as any
}