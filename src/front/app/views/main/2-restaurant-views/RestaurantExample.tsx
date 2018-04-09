import * as React from 'react'
import {connect} from 'react-redux'
import {IState} from '../../../state/InitialState'
import withDemoController from '../../../demoController/WithDemoController'
import {RESTAURANTS_BY_IDS} from '../../../../../lib/Restaurants'
import {ORDER_STATUS} from '../../../../../lib/Orders'
import Api from '../../../api/Api'
import doWithMinTime from '../../../utils/DoWithMinTime'
import Error from '../../../components/error/Error'
import {selectOrdersByRestaurantId} from '../../../state/Selectors'
import {setOrders} from '../../../state/Actions'
import {PendingOrder} from '../../../components/PendingOrder'
import {OngoingOrder} from '../../../components/OngoingOrder'
import {FinishedOrder} from '../../../components/FinishedOrder'

// class HandleButton extends React.Component<any, any> {
//     onClick = () => this.props.onClick(this.props.id)
//
//     render() {
//         const {id, disabled} = this.props
//
//         return <button className={disabled ? 'disabled' : ''} onClick={this.onClick}>HANDLE ORDER: <b>{id}</b></button>
//     }
// }

class RestaurantExample extends React.Component<any, any> {
    state = {
        loading: false
    }

    onHandleOrder = (orderId: string) => {
        if (!this.state.loading) {
            this.setState({loading: true})
            doWithMinTime(() => Api.updateOrderStatus(orderId, ORDER_STATUS.READY)).then((orders) => {
                this.props.dispatch(setOrders(orders))
                this.props.demoController.goToNextStep() && this.setState({loading: false})
            })
        }
    }

    render() {
        const {restaurantId} = this.props.match.params
        // const {orders} = this.props
        // const {loading} = this.state

        if (!RESTAURANTS_BY_IDS[restaurantId]) {
            return <Error/>
        }

        return (
            <div className="view-example">
                <div style={{ display: 'flex', flexFlow: 'row nowrap', padding: '25px 250px' }}>
                    <div style={{
                        flex: '1 0 33%',
                        display: 'flex',
                        flexFlow: 'column nowrap',
                        borderRight: '1px solid #ccc',
                        alignItems: 'center',
                    }}>
                        <h3 style={{ color: '#4b3f80', fontWeight: 'bold', fontSize: 18, marginTop: 0 }}>
                            Commandes en attente
                        </h3>
                        <PendingOrder
                            orderId='2'
                            deliveryTime={new Date()}
                            orderedItems={[
                                {
                                    label: 'Rancheros Platters',
                                    count: 2,
                                    totalItemPrice: 18.8,
                                },
                                {
                                    label: 'Petite salade',
                                    count: 3,
                                    totalItemPrice: 7.4,
                                },
                                {
                                    label: 'Pietra 33cl',
                                    count: 1,
                                    totalItemPrice: 3.5,
                                },
                            ]}
                            comment='Les pâtes sans gluten sur le platter, je vous prie. Merci !'
                        />
                        <PendingOrder
                            orderId='5'
                            deliveryTime={new Date()}
                            orderedItems={[
                                {
                                    label: 'New Mexico Platters',
                                    count: 1,
                                    totalItemPrice: 9.8,
                                },
                                {
                                    label: 'Rancheros Platters',
                                    count: 1,
                                    totalItemPrice: 9.4,
                                },
                                {
                                    label: 'Cheescake',
                                    count: 2,
                                    totalItemPrice: 4.9,
                                },
                                {
                                    label: 'Tiramisu',
                                    count: 2,
                                    totalItemPrice: 4.5,
                                },
                            ]}
                        />
                        <PendingOrder
                            orderId='6'
                            deliveryTime={new Date()}
                            orderedItems={[
                                {
                                    label: 'New Mexico Platters',
                                    count: 1,
                                    totalItemPrice: 9.8,
                                },
                                {
                                    label: 'Rancheros Platters',
                                    count: 1,
                                    totalItemPrice: 9.4,
                                },
                                {
                                    label: 'Frites Cheddar Bacon',
                                    count: 1,
                                    totalItemPrice: 4,
                                },
                                {
                                    label: 'Frites',
                                    count: 1,
                                    totalItemPrice: 2.5,
                                },
                                {
                                    label: 'Petite salade',
                                    count: 1,
                                    totalItemPrice: 2.8,
                                },
                                {
                                    label: 'Cheescake',
                                    count: 1,
                                    totalItemPrice: 4.5,
                                },
                            ]}
                        />
                    </div>
                    <div style={{
                        flex: '1 0 33%',
                        display: 'flex',
                        flexFlow: 'column nowrap',
                        borderRight: '1px solid #ccc',
                        alignItems: 'center',
                    }}>
                        <h3 style={{ color: '#4b3f80', fontWeight: 'bold', fontSize: 18, marginTop: 0 }}>
                            En cours
                        </h3>
                        <OngoingOrder
                            orderId='2'
                            deliveryTime={new Date()}
                            orderedItems={[
                                {
                                    label: 'Enchilada Platters',
                                    count: 2,
                                },
                            ]}
                            comment='Sans oignon si possible. Merci bien :)'
                        />
                        <OngoingOrder
                            orderId='3'
                            deliveryTime={new Date()}
                            orderedItems={[
                                {
                                    label: 'New Mexico Platters',
                                    count: 2,
                                },
                                {
                                    label: 'Rancheros Platters',
                                    count: 2,
                                },
                                {
                                    label: 'Cheescake',
                                    count: 1,
                                },
                                {
                                    label: 'Tiramisu',
                                    count: 1,
                                },
                            ]}
                        />
                    </div>
                    <div style={{
                        flex: '1 0 33%',
                        display: 'flex',
                        flexFlow: 'column nowrap',
                        alignItems: 'center',
                    }}>
                        <h3 style={{ color: '#4b3f80', fontWeight: 'bold', fontSize: 18, marginTop: 0 }}>
                            Terminées
                        </h3>
                        <FinishedOrder
                            orderId='1'
                            deliveryTime={new Date()}
                            orderedItems={[
                                {
                                    label: 'Rancheros Platters',
                                    count: 2,
                                    totalItemPrice: 18.8,
                                },
                                {
                                    label: 'Petite salade',
                                    count: 3,
                                    totalItemPrice: 7.4,
                                },
                                {
                                    label: 'Pietra 33cl',
                                    count: 1,
                                    totalItemPrice: 3.5,
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatToProps = (state: IState, props: any) => {
    const {restaurantId} = props.match.params

    return {
        orders: selectOrdersByRestaurantId(state.orders, restaurantId)
    }
}

export default connect(mapStatToProps)(withDemoController(RestaurantExample))
