import * as React from 'react';

import './Order.scss';

interface OrderProps {
    children?: React.ReactNode
    className: string
}

export const Order: React.SFC<OrderProps> = ({children, className}) => (
    <div className={['order', className].join(' ').trim()}>
        {children}
    </div>
);
