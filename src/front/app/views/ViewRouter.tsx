import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter, Switch, Route, Redirect} from 'react-router'
import {IRootState} from '../state/Reducers'
import Api from '../api/Api'
import * as Routes from './Routes'
import withDemoController from '../demoController/WithDemoController'
import CubeTransitionWrapper from '../components/cubeTransition/CubeTransitionWrapper'
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
import CustomerOrderList from './main/1-customer-views/f-orderList/CustomerOrderList'
import RestaurantOverview from './main/2-restaurant-views/a-overview/RestaurantOverview'
import CourierOverview from './main/3-courier-views/a-overview/CourierOverview'
import Loader from '../components/loader/Loader'
import {setOrders,init,getOrders} from '../state/Actions'


class ViewRouter extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        const {pathname} = this.props.location
        const demoId = pathname !== Routes.HOME ? pathname.split('/')[1] : null
        // this.props.init(demoId,this.onError.bind(this))
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
                   this.props.setOrders(orders)
                    //this.props.dispatch(setOrders(orders))
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
        const {isMobile} = this.props
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
                            <CubeTransitionWrapper index={Routes.ALL_VIEWS.indexOf(view as string) + 1}>
                                <div id="bf-demo-device" className={view && isMobile ? 'mobile' : ''}>
                                    <Header view={view}/>
                                    <div key={pathname} id="bf-demo-main-view">
                                        <Switch>
                                            <Route path={Routes.HOME} exact component={Start}/>
                                            <Route path={Routes.CUSTOMER_LOCATION_ROUTE} exact component={CustomerLocation}/>
                                            <Route path={Routes.CUSTOMER_RESTAURANT_LIST_ROUTE} exact component={CustomerRestaurantList}/>
                                            <Route path={Routes.CUSTOMER_ORDER_ROUTE} exact component={CustomerOrder}/>
                                            <Route path={Routes.CUSTOMER_POSITION_ROUTE} exact component={CustomerPosition}/>
                                            <Route path={Routes.CUSTOMER_PAYMENT_ROUTE} exact component={CustomerPayment}/>
                                            <Route path={Routes.CUSTOMER_ORDER_LIST_ROUTE} exact component={CustomerOrderList}/>
                                            <Route path={Routes.RESTAURANT_OVERVIEW_ROUTE} exact component={RestaurantOverview}/>
                                            <Route path={Routes.COURIER_OVERVIEW_ROUTE} exact component={CourierOverview}/>
                                            <Redirect to={Routes.HOME}/>
                                        </Switch>
                                    </div>
                                </div>
                            </CubeTransitionWrapper>
                            <DemoControllerPanel view={view}/>
                        </DemoViewValidator>
                    )}
                    <Loader active={!ready}/>
                </React.Fragment>
            )
        }
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        isMobile: state.application.isMobile,
        demoId: state.demo.demoId,
        orders: state.application.orders
    }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    setOrders: (orders:any) => dispatch(setOrders(orders)),
    init: (demoId: string,onError: () => any) => dispatch(init(demoId,onError)),
    getOrders: (demoId:string) => dispatch(getOrders(demoId))
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withDemoController(ViewRouter)) as any) as any
