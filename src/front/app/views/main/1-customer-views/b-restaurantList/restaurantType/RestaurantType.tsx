import * as React from 'react'
import './RestaurantType.scss'
import withDemoController from '../../../../../demoController/WithDemoController';

export class RestaurantType extends React.Component{
    render(){
        return(<div className='restaurantTypeContainer'>
            <div className='title'>
                Food category
            </div>
            <div className='foodType'>
                <ul>
                    <li><a>All Day Breakfast</a></li>
                    <li><a>American</a></li>
                    <li><a>Asian</a></li>
                    <li><a>Bakery</a></li>
                    <li><a>British</a></li>
                    <li><a>Burger</a></li>
                    <li><a>Caribbean</a></li>
                    <li><a>Chinese</a></li>
                    <li><a>Comfort Food</a></li>
                    <li><a>Cuban</a></li>
                    <li><a>Desserts</a></li>
                    <li><a>Fast Food</a></li>
                    <li><a>Healthy</a></li>
                    <li><a>Ice cream and frozen yoghurt</a></li>
                    <li><a>Italian</a></li>
                    <li><a>Juice and smoothies</a></li>
                    <li><a>Lebanese</a></li>
                    <li><a>Mediterranean</a></li>
                    <li><a>Middle Eastern</a></li>
                    <li><a>Modern European</a></li>
                    <li><a>Pastry</a></li>
                    <li><a>Pizza</a></li>
                    <li><a>Salad</a></li>
                    <li><a>Sandwich</a></li>
                    <li><a>Sandwiches</a></li>
                    <li><a>Seafood</a></li>
                    <li><a>Spanish</a></li>
                    <li><a>Street Food</a></li>
                    <li><a>Turkish</a></li>
                    <li><a>Wings</a></li>
                    <li><a>Most Popular</a></li>
                </ul>
            </div>
        </div>)
    }
}

export default (withDemoController(RestaurantType))