import * as React from 'react'
import {connect} from 'react-redux'
import {IRootState} from '../../../../state/Reducers'
import withDemoController from '../../../../demoController/WithDemoController'
import * as Routes from '../../../Routes'
import doWithMinTime from '../../../../utils/DoWithMinTime'
import {IOrder, IOrderInProgress,IOrderDetail} from '../../../../../../lib/Orders'
import Api from '../../../../api/Api'
import GoBack from '../../../../components/goBack/GoBack'
import {setCustomerOrderInProgress, setOrders,createNewOrder} from '../../../../state/Actions'

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
            //Test action asynch
            this.props.createNewOrder(restaurantId,customerPosition,details)
            this.setState({loading: false, done: true})
            if (this.props.demoController.goToNextStep()) {
              console.log('here')
                this.props.history.replace(Routes.getRouteCustomerOrderList())
            }
            // doWithMinTime(() => Api.createNewOrder(restaurantId, customerPosition, details)).then((orders:any) => {
            //     this.props.setOrders(orders)
            //     this.setState({loading: false, done: true})
            //
            //     if (this.props.demoController.goToNextStep()) {
            //         this.props.history.replace(Routes.getRouteCustomerOrderList())
            //     }
            // })

        }
    }

    public componentWillUnmount() {
        this.state.done && this.props.setCustomerOrderInProgress(null)
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

const mapStatToProps = (state: IRootState) => {
    return {
        customerOrderInProgress: state.application.customerOrderInProgress,
        customerPosition: state.application.customerPosition,
        demoId: state.demo.demoId
    }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    setCustomerOrderInProgress: (newOrderInProgress:IOrderInProgress | null) => dispatch(setCustomerOrderInProgress(newOrderInProgress)),
    setOrders: (orders: IOrder[]) => dispatch(setOrders(orders)),
    createNewOrder: (restaurantId: string, customerPosition: [number, number], details: IOrderDetail[]) => dispatch(createNewOrder(restaurantId,customerPosition,details))
  }
}

export default connect(mapStatToProps,mapDispatchToProps)(withDemoController(CustomerPayment))
