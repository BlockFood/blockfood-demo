import * as React from 'react'

import './Order.scss'

interface OrderProps {
    children?: React.ReactNode
    orderId: string
    className: string
}

export const Order: React.SFC<OrderProps> = ({children, orderId, className}) => (
    <div className={['order', className].join(' ').trim()} data-order-id={orderId}>
        {children}
    </div>
)
