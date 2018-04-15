import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter, Switch, Route, Redirect} from 'react-router'
import Api from '../api/Api'
import * as Routes from './Routes'
import withDemoController from '../demoController/WithDemoController'
import DemoControllerPanel from '../demoController/panel/DemoControllerPanel'
import Error from '../components/error/Error'
import Start from './start/Start'
import DemoViewValidator from '../demoController/DemoViewValidator'
import Header from './header/Header'
import CustomerLocation from './main/1-customer-views/a-location/CustomerLocation'
import CustomerRestaurantList from './main/1-customer-views/b-restaurantList/CustomerRestaurantList'
import CustomerOrder from './main/1-customer-views/c-order/CustomerOrder'
import CustomerPosition from './main/1-customer-views/d-position/CustomerPosition'
import CustomerPayment from './main/1-customer-views/e-payment/CustomerPayment'
import RestaurantExample from './main/2-restaurant-views/RestaurantExample'
import CourierExample from './main/3-courier-views/CourierExample'
import Loader from '../components/loader/Loader'
import {setOrders} from '../state/Actions'

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
                    this.props.dispatch(setOrders(orders))
                    this.props.demoController.init(orders)
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
            return <Error/>
        }
        else {
            const {pathname} = this.props.location

            const view = Routes.getViewFromPathname(pathname)

            return (
                <React.Fragment>
                    {ready && (
                        <DemoViewValidator>
                            <Header view={view}/>
                            <div key={pathname} id="bf-demo-main-view">
                                <Switch>
                                    <Route path={Routes.HOME} exact component={Start}/>
                                    <Route path={Routes.CUSTOMER_LOCATION_ROUTE} exact component={CustomerLocation}/>
                                    <Route path={Routes.CUSTOMER_RESTAURANT_LIST_ROUTE} exact component={CustomerRestaurantList}/>
                                    <Route path={Routes.CUSTOMER_ORDER_ROUTE} exact component={CustomerOrder}/>
                                    <Route path={Routes.CUSTOMER_POSITION_ROUTE} exact component={CustomerPosition}/>
                                    <Route path={Routes.CUSTOMER_PAYMENT_ROUTE} exact component={CustomerPayment}/>
                                    <Route path={Routes.RESTAURANT_EXAMPLE_ROUTE} exact component={RestaurantExample}/>
                                    <Route path={Routes.COURIER_EXAMPLE_ROUTE} exact component={CourierExample}/>
                                    <Redirect to={Routes.HOME}/>
                                </Switch>
                            </div>
                            <DemoControllerPanel view={view}/>
                        </DemoViewValidator>
                    )}
                    <Loader active={!ready}/>
                </React.Fragment>
            )
        }
    }
}

export default withRouter(connect()(withDemoController(MainView)) as any) as any