import * as React from 'react'
import {connect} from 'react-redux'
import {IState} from '../../../../state/InitialState'
import withDemoController from '../../../../demoController/WithDemoController'
import * as Routes from '../../../Routes'
import doWithMinTime from '../../../../utils/DoWithMinTime'
import Api from '../../../../api/Api'
import GoBack from '../../../../components/goBack/GoBack'
import {setCustomerOrderInProgress, setOrders} from '../../../../state/Actions'
import Web3 from 'web3'

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
        
        // if(typeof web3 != 'undefined'){
        //     console.log("Using web3 detected from external source like Metamask")
        //     this.web3 = new Web3(web3.currentProvider)
        //  }else{
        //     console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        //     this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        //  }
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
                        <i className="spin-circle-loader fa-spin"/>
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