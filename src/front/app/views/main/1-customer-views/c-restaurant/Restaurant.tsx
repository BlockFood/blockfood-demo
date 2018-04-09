import * as React from 'react'
import * as _ from 'lodash'
import withDemoController from '../../../../demoController/WithDemoController';
import {IMenu, IRestaurant, RESTAURANTS} from '../../../../../../lib/Restaurants'

import './Restaurant.scss'
import * as Routes from '../../../Routes';

const deliveryFee = 4
const totalRestaurantStar = 5
interface IProps {
    match?: any
    history?: any
    demoController?: any
}
interface IState {
    basket: any[]
    currentRestaurant: any
    loading: boolean
}
class Restaurant extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props)
        this.state = {
            basket: [],
            currentRestaurant: null,
            loading: false
        }

        this.getTheTotal = this.getTheTotal.bind(this)
        this.categorizingFoods = this.categorizingFoods.bind(this)
        this.addToShoppingList = this.addToShoppingList.bind(this)
        this.addToShoppingList = this.addToShoppingList.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentWillMount() {
        const {restaurantId} = this.props.match.params

        this.setState({
            currentRestaurant: _.find(RESTAURANTS, (restaurant: IRestaurant) => restaurant.id === restaurantId)
        })
    }
    public render() {
        const {basket, currentRestaurant} = this.state

        const restaurant = currentRestaurant

        return (<div id="restaurantListContainer">
            <div className='restaurantContainer'>
                <div className='header'>
                    <div className='deliveryAddress'>
                        <div className='add'>
                            <span className='svg'>
                                <i className='fas fa-map-marker'></i>
                            </span>
                            Deliver to:<br/><br/>
                            Bellmoor, <br/>
                            East Heath Road, <br/>
                            Hampstead<br/>
                            NW31DY London
                        </div>
                        <div className='time'>
                            <span className='svg'>
                                <i className='fas fa-clock'></i>
                            </span>
                            19:00
                        </div>
                    </div>

                    <div className='titleDescription'>
                        <h1 className='mainTitle'>{restaurant.name}</h1>
                        <div className='subTitle'>{restaurant.category}</div>
                        <div className='star'>
                            <div>
                                <i className='colored fas fa-star'></i> {restaurant.star}/{totalRestaurantStar}
                            </div>

                        </div>
                    </div>
                </div>
                <div className='foodContainer'>
                    <div className='foodContent'>
                        {this.categorizingFoods(restaurant, 'food')}
                        {this.categorizingFoods(restaurant, 'drink')}
                        {this.categorizingFoods(restaurant, 'dessert')}
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
                                <span className='colored'> {deliveryFee} ETH</span>
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
            </div>
        </div>)
    }
    private getTheTotal = (delivery: boolean) => {
        const {basket} = this.state

        const totalPrice = _.reduce(basket, (total, item) => {
            total += (item.item.price_euro * item.value)
            return total
        }, 0)
        return delivery ? totalPrice + deliveryFee : totalPrice
    }
    private categorizingFoods = (restaurant: IRestaurant, choice: string) => {
        const items = _.reduce(restaurant.menu, (coll, menu) => {
            if (menu.category === choice) {
                return [...coll, menu]
            }
            return coll
        }, [])
        return (
            items.length > 0 && (<div className='foodPart'>
                <a>{choice}</a>
                <div className='foodList'>
                    {_.map(items, (food: IMenu) => (
                        <div key={food.id} className='foods' onClick={() => this.addToShoppingList(food, 1)}>
                            <img className='foodImage'/>
                            <div className='foodTitle'>
                                <h2>{food.name}</h2>
                                <p>{food.description}</p>
                            </div>
                            <h3>{food.price_eth} ETH</h3>
                        </div>
                    ))}
                </div>
            </div>)
        )
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

         this.props.history.replace(Routes.getRouteRestaurantProgressExample())
    }

}
export default (withDemoController(Restaurant))
