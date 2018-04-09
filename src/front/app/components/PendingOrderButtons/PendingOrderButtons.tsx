import * as  React from 'react';

import './PendingOrderButtons.scss';

interface PendingOrderButtonsProps {
    onAccept?: () => void
    onDecline?: () => void
}

export const PendingOrderButtons: React.SFC<PendingOrderButtonsProps> = ({ onAccept = () => {}, onDecline = () => {}}) => (
    <div className='pendingOrderButtons'>
        <button onClick={onAccept} className='button validateButton'>
            Accepter
        </button>
        <button onClick={onDecline} className='button declineButton'>
            Refuser
        </button>
    </div>
);
