import * as  React from 'react';

import './OngoingOrderButtons.scss';

interface OngoingOrderButtonsProps {
    onFinish?: () => void
}

export const OngoingOrderButtons: React.SFC<OngoingOrderButtonsProps> = ({ onFinish = () => {}}) => (
    <div className='ongoingOrderButtons'>
        <button onClick={onFinish} className='button validateButton'>
            Terminer
        </button>
    </div>
);
