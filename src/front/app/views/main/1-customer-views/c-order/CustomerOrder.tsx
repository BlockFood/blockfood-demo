import * as _ from 'lodash'
import * as React from 'react'
import withDemoController from '../../../../demoController/WithDemoController'
import * as Routes from '../../../Routes'
import {
    IRestaurant, RESTAURANTS_BY_IDS, TOTAL_RESTAURANT_STAR,
    IMenu, MENU_CATEGORIES
} from '../../../../../../lib/Restaurants'
import GoBack from '../../../../components/goBack/GoBack'

import './CustomerOrder.scss'

const DELIVERY_FEE = 4

class CustomerOrder extends React.Component<any, any> {
    private restaurant: IRestaurant

    constructor(props: any) {
        super(props)

        this.restaurant = RESTAURANTS_BY_IDS[this.props.match.params.restaurantId]

        this.state = {
            basket: []
        }

        this.onGoBack = this.onGoBack.bind(this)
        this.getTheTotal = this.getTheTotal.bind(this)
        this.addToShoppingList = this.addToShoppingList.bind(this)
        this.addToShoppingList = this.addToShoppingList.bind(this)
        this.validate = this.validate.bind(this)
    }

    private onGoBack() {
        this.props.history.replace(Routes.getRouteCustomerRestaurantList())
    }

    public render() {
        const {restaurant} = this
        const {basket} = this.state

        const categorizingFoods = (category: string) => {
            const items = _.reduce(restaurant.menu, (items, menu) => {
                if (menu.category === category) {
                    return [...items, menu]
                }
                return items
            }, [])

            return items.length > 0 ? (
                <div key={category} className="foodPart">
                    <h6>{category}</h6>
                    <div className="foodList">
                        {_.map(items, (food: IMenu) => (
                            <div key={food.id} className="foods" onClick={() => this.addToShoppingList(food, 1)}>
                                <h2>{food.name}</h2>
                                <h3>{food.price_eth} ETH</h3>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null
        }

        return (
            <div id="bf-demo-view-customer-order">
                <GoBack onGoBack={this.onGoBack}/>
                <div className="header">
                    <img className="image" src={restaurant.image}/>
                    <div className="detail">
                        <div className="name">
                            <p>{restaurant.name}</p>
                        </div>
                        <div className="category">
                            <p>{restaurant.category}</p>
                        </div>
                        <div className="rate">
                            <i className="colored fas fa-star"/> {restaurant.star}/{TOTAL_RESTAURANT_STAR}
                        </div>
                    </div>
                </div>
                <div className="foodContent">
                    {_.map(MENU_CATEGORIES, category => categorizingFoods(category))}
                </div>
                <div className='foodOrder'>
                    <div className='validateButton' onClick={this.validate}>
                        Validate my order
                    </div>
                    <div className='foodList divider'>
                        {_.map(basket, item => {
                            return (<div key={item.item.id}>
                                <div className='fooName'>
                                    <span>{item.value} x {item.item.name} </span>
                                    <span className='colored'>{item.item.price_euro * item.value} ETH</span>
                                </div>
                            </div>)
                        })}
                    </div>
                    <div className='foodPriceResume divider borderGray'>
                        <div>
                            <span>Total: </span>
                            <span className='colored'> {this.getTheTotal(false)} ETH</span>
                        </div>
                        <div>
                            <span>Delivery: </span>
                            <span className='colored'> {DELIVERY_FEE} ETH</span>
                        </div>
                    </div>
                    <div className='foodPriceTotal divider borderGray'>
                        <div>
                            <span>TOTAL: </span>
                            <span className='colored'> {this.getTheTotal(true)} ETH</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    private getTheTotal = (delivery: boolean) => {
        const {basket} = this.state

        const totalPrice = _.reduce(basket, (total, item) => {
            total += (item.item.price_euro * item.value)
            return total
        }, 0)
        return delivery ? totalPrice + DELIVERY_FEE : totalPrice
    }

    private addToShoppingList = (item: IMenu, valueItem: number) => {
        const {basket} = this.state

        const container = basket.length ? basket : []

        const foundItem = _.find(basket, value => {
            return value.item.id === item.id
        })

        if (foundItem) {
            foundItem.value = foundItem.value + valueItem
        } else {
            container.push({
                value: valueItem,
                item
            })
        }

        this.setState({
            basket: container
        })
    }
    private validate = (event: any) => {
        event.preventDefault()
    }

}
export default (withDemoController(CustomerOrder))
