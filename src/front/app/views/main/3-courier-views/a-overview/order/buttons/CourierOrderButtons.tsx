import * as  React from 'react'

import './CourierOrderButtons.scss'

interface CourierOrderButtonsProps {
    onAccept?: () => void
    onDecline?: () => void
}

export const CourierOrderButtons: React.SFC<CourierOrderButtonsProps> = ({ onAccept, onDecline}) => (
    <div className='courierOrderButtons'>
        {
            onAccept &&
            <button onClick={onAccept} className='button validateButton'>
                Accept
            </button>
        }
        {
            onDecline &&
            <button onClick={onDecline} className='button declineButton'>
                Decline
            </button>
        }
    </div>
)
