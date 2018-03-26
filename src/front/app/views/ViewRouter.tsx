import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter, Switch, Route, Redirect} from 'react-router'
import Api from '../api/Api'
import * as Routes from './Routes'
import withDemoController from '../demoController/WithDemoController'
import DemoControllerPanel from '../demoController/panel/DemoControllerPanel'
import ApiError from './misc/ApiError'
import Start from './misc/Start'
import DemoViewValidator from '../demoController/DemoViewValidator'
import Header from './header/Header'
import CustomerExample from './main/customer-views/CustomerExample'
import RestaurantExample from './main/restaurant-views/RestaurantExample'
import CourierExample from './main/courier-views/CourierExample'
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
            return <ApiError/>
        }
        else {
            const {pathname} = this.props.location

            const view = Routes.getViewFromPathname(pathname)

            return (
                <React.Fragment>
                    {ready && (
                        <DemoViewValidator>
                            <Header view={view}/>
                            <Switch>
                                <Route path={Routes.HOME} exact component={Start}/>
                                <Route path={Routes.CUSTOMER_EXAMPLE_ROUTE} exact component={CustomerExample}/>
                                <Route path={Routes.RESTAURANT_EXAMPLE_ROUTE} exact component={RestaurantExample}/>
                                <Route path={Routes.COURIER_EXAMPLE_ROUTE} exact component={CourierExample}/>
                                <Redirect to={Routes.HOME}/>
                            </Switch>
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