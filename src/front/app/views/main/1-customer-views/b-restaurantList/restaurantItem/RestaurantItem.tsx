import * as React from 'react'
import {TOTAL_RESTAURANT_STAR} from '../../../../../../../lib/Restaurants'

import './RestaurantItem.scss'

export class RestaurantItem extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.selectRestaurant = this.selectRestaurant.bind(this)
    }

    private selectRestaurant() {
        this.props.selectRestaurant(this.props.restaurant.id)
    }

    public render() {
        const {restaurant} = this.props

        return (
            <div className="restaurant">
                <div onClick={this.selectRestaurant}>
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
            </div>
        )
    }
}

export default RestaurantItem