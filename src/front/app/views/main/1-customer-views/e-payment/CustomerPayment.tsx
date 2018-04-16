import * as React from 'react'
import {connect} from 'react-redux'
import {IState} from '../../../../state/InitialState'
import withDemoController from '../../../../demoController/WithDemoController'
import * as Routes from '../../../Routes'
import doWithMinTime from '../../../../utils/DoWithMinTime'
import Api from '../../../../api/Api'
import GoBack from '../../../../components/goBack/GoBack'
import {setCustomerOrderInProgress, setOrders} from '../../../../state/Actions'

import './CustomerPayment.scss'

class CustomerPayment extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            loading: false,
            done: false
        }

        this.onGoBack = this.onGoBack.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    private onGoBack() {
        this.props.history.replace(Routes.getRouteCustomerPosition())
    }

    private onSubmit() {
        if (!this.state.loading) {
            const {restaurantId, details} = this.props.customerOrderInProgress
            const {customerPosition} = this.props

            this.setState({loading: true})
            doWithMinTime(() => Api.createNewOrder(restaurantId, customerPosition, details)).then((orders) => {
                this.props.dispatch(setOrders(orders))
                this.setState({loading: false, done: true})

                if (this.props.demoController.goToNextStep()) {
                    this.props.history.replace(Routes.getRouteCustomerOrderList())
                }
            })
        }
    }

    public componentWillUnmount() {
        this.state.done && this.props.dispatch(setCustomerOrderInProgress(null))
    }

    public render() {
        const {loading, done} = this.state

        return (
            <div id="bf-demo-customer-payment">
                <GoBack onGoBack={this.onGoBack}/>
                <div className={`btn-remote-action${(loading || done) ? ' not-a-btn' : ''}`} onClick={this.onSubmit}>
                    {done ? (
                        <i className="fas fa-check"/>
                    ) : loading ? (
                        <i className="fas fa-circle-notch fa-spin"/>
                    ) : (
                        <i className="fas fa-dollar-sign"/>
                    )}
                </div>
            </div>
        )
    }
}

const mapStatToProps = (state: IState) => {
    return {
        customerOrderInProgress: state.customerOrderInProgress,
        customerPosition: state.customerPosition
    }
}

export default connect(mapStatToProps)(withDemoController(CustomerPayment))