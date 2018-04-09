import * as React from 'react'
import * as _ from 'lodash'
import * as Routes from '../../../Routes';
import withDemoController from '../../../../demoController/WithDemoController';
import  { RestaurantType } from './restaurantType/RestaurantType'
import { IRestaurant, RESTAURANTS } from '../../../../../../lib/Restaurants'

import './RestaurantList.scss'

const totalRestaurantStar = 5
interface IProps {
    customerLocation?: string
    match?: any
    demoController?: any
    history?: any
}

interface IState {

}

 class RestaurantList extends React.Component<IProps, IState> {
     constructor(props: IProps){
         super(props)

         this.selectRestaurant = this.selectRestaurant.bind(this)
     }

    public render(){
        const { customerLocation } = this.props.match.params

        return(<div id='bf-demo-view-customer-location'>

            <div className='restaurantListContainer'>
                <RestaurantType/>
                <h2>{RESTAURANTS.length} restaurants in <span className='cityTitle'> {customerLocation} </span></h2>

                <div className='restaurantList'>
                    <div className='restaurants'>
                        {_.map(RESTAURANTS, (restaurant: IRestaurant) => {
                            return (
                                <div key={`${restaurant.id}_${_.random(0, 10000)}`} className='restaurant'>
                                    <div onClick={(e) => this.selectRestaurant(e, restaurant.id)}>
                                        <img className='restaurantImage' src={restaurant.image} />
                                        <div className='restaurantDetail'>
                                            <div className='restaurantName'>
                                                <h2>{restaurant.name}</h2>
                                            </div>
                                            <div className='restaurantDescription'>
                                                <h2>{restaurant.category}</h2>
                                            </div>
                                            <div className='restaurantRate'>
                                                <div>
                                                    <i className='colored fas fa-star'></i> {restaurant.star}/{totalRestaurantStar}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}
                        )}
                    </div>
                </div>
            </div>
        </div>)
    }
     private selectRestaurant = (event: any, restaurantId: string) => {
         const { customerLocation } = this.props.match.params
         event.preventDefault()
         this.props.history.replace(Routes.getRouteRestaurantNameExample(customerLocation, restaurantId))
     }
}
export default (withDemoController(RestaurantList))
