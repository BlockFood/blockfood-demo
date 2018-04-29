import * as React from 'react'

import './OrderRestaurant.scss'

interface OrderCommentProps {
    restaurantName: string | null
}

export const OrderRestaurant: React.SFC<OrderCommentProps> = ({restaurantName}) => (
    <div className='orderRestaurant'>
        {restaurantName}
    </div>
)
