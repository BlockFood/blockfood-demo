import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter, Switch, Route, Redirect} from 'react-router'
import Api from '../api/Api'
import Loader from '../components/loader/Loader'
import ViewValidator from './ViewValidator'
import * as Routes from './Routes'
import DemoError from './demo/DemoError'
import DemoStart from './demo/DemoStart'
import CustomerExample from './main/customer-views/CustomerExample'
import RestaurantExample from './main/restaurant-views/RestaurantExample'
import CourierExample from './main/courier-views/CourierExample'

class MainView extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        const {pathname} = this.props.location
        const demoId = pathname !== '/' ? pathname.split('/')[1] : null

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
        this.setState({ready: true})
    }

    render() {
        const {error, ready} = this.state

        if (error) {
            return <DemoError/>
        }
        else {
            return (
                <React.Fragment>
                    {ready && (
                        <ViewValidator>
                            <Switch>
                                <Route path="/" exact component={DemoStart}/>
                                <Route path={Routes.CUSTOMER_EXAMPLE_ROUTE} exact component={CustomerExample}/>
                                <Route path={Routes.RESTAURANT_EXAMPLE_ROUTE} exact component={RestaurantExample}/>
                                <Route path={Routes.COURIER_EXAMPLE_ROUTE} exact component={CourierExample}/>
                                <Redirect to="/"/>
                            </Switch>
                        </ViewValidator>
                    )}
                    <Loader active={!ready}/>
                </React.Fragment>
            )
        }
    }
}

export default withRouter<any>(connect()(MainView))