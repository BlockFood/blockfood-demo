import * as _ from 'lodash'
import * as React from 'react'
import {RESTAURANT_TYPES, EMPTY_RESTAURANT_TYPES} from '../../../../../../../lib/Restaurants'

import './RestaurantType.scss'

class RestaurantTypeItem extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.toggleFilter = this.toggleFilter.bind(this)
    }

    private toggleFilter() {
        this.props.toggleFilter(this.props.type)
    }

    public render() {
        const {active, type} = this.props

        const className = _.compact([
            active && 'active',
            EMPTY_RESTAURANT_TYPES.indexOf(type) !== -1 && 'empty'
        ]).join(' ')

        return (
            <li className={className}>
                <span onClick={this.toggleFilter}>{type}</span>
            </li>
        )
    }
}

class RestaurantType extends React.Component<any, any> {
    public render() {
        const {filters, toggleFilter, clearFilters} = this.props

        return (
            <div className="restaurant-type-list-container">
                <h2>
                    <span>Food category</span>
                    {filters.length > 0 && <i className="fas fa-trash" onClick={clearFilters}/>}
                </h2>
                <ul>
                    {_.map(RESTAURANT_TYPES, (type) => (
                        <RestaurantTypeItem key={type} type={type} active={filters.includes(type)}
                                            toggleFilter={toggleFilter}/>
                    ))}
                </ul>
            </div>
        )
    }
}

export default RestaurantType