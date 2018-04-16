import * as  React from 'react'

import './PendingOrderButtons.scss'

interface PendingOrderButtonsProps {
    onAccept?: () => void
    onDecline?: () => void
}

export const PendingOrderButtons: React.SFC<PendingOrderButtonsProps> = ({ onAccept, onDecline}) => (
    <div className='pendingOrderButtons'>
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
