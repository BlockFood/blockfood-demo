import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter, Switch, Route, Redirect} from 'react-router'
import Api from '../api/Api'
import * as Routes from './Routes'
import {ORDER_STATUS} from '../../../lib/Orders'
import {STEPS, FIRST_STEP_WITH_AN_ORDER} from '../demoController/Steps'
import ApiError from './misc/ApiError'
import Start from './misc/Start'
import ViewValidator from './ViewValidator'
import Header from './header/Header'
import Navigator from './navigator/Navigator'
import CustomerExample from './main/customer-views/CustomerExample'
import RestaurantExample from './main/restaurant-views/RestaurantExample'
import CourierExample from './main/courier-views/CourierExample'
import Loader from '../components/loader/Loader'
import {setStep, setOrders} from '../state/Actions'

class MainView extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        const {pathname} = this.props.location
        const demoId = pathname !== Routes.HOME ? pathname.split('/')[1] : null

        Api.init(demoId, this.onError.bind(this))

        this.state = {
            error: false,
            ready: false
        }

        this.onRestart = this.onRestart.bind(this)
    }

    onError() {
        this.setState({error: true})
    }

    onRestart() {
        window.location.href = window.location.origin
    }

    componentDidMount() {
        const {pathname} = this.props.location

        if (pathname !== Routes.HOME) {
            Api.getOrders(false)
                .then((orders) => {
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
                    this.props.dispatch(setOrders(orders))
                    this.setState({ready: true})
                })
                .catch((err) => {
                    if (!err || !err.response || !err.response.status || err.response.status !== 403) {
                        console.error(err)
                    }

                    this.props.history.replace(Routes.HOME)
                    this.setState({ready: true})
                })
        }
        else {
            this.setState({ready: true})
        }
    }

    render() {
        const {error, ready} = this.state

        if (error) {
            return <ApiError/>
        }
        else {
            const {pathname} = this.props.location

            const viewPrefix = Routes.getViewPrefixFromPathname(pathname)
            const showHeaderAndNavigator = pathname !== Routes.HOME

            return (
                <React.Fragment>
                    {ready && (
                        <ViewValidator>
                            <Header viewPrefix={viewPrefix} visible={showHeaderAndNavigator}/>
                            <Switch>
                                <Route path={Routes.HOME} exact component={Start}/>
                                <Route path={Routes.CUSTOMER_EXAMPLE_ROUTE} exact component={CustomerExample}/>
                                <Route path={Routes.RESTAURANT_EXAMPLE_ROUTE} exact component={RestaurantExample}/>
                                <Route path={Routes.COURIER_EXAMPLE_ROUTE} exact component={CourierExample}/>
                                <Redirect to={Routes.HOME}/>
                            </Switch>
                            <Navigator visible={showHeaderAndNavigator}/>
                        </ViewValidator>
                    )}
                    <Loader active={!ready}/>
                </React.Fragment>
            )
        }
    }
}

export default withRouter(connect()(MainView) as any) as any