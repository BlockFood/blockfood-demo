import * as React from 'react'

import './OrderComment.scss'

interface OrderCommentProps {
    comment: string
}

export const OrderComment: React.SFC<OrderCommentProps> = ({comment}) => (
    <div className='orderComment'>
        {comment}
    </div>
)
