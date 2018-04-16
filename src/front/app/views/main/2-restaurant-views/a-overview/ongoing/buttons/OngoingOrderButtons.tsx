import * as  React from 'react'

import './OngoingOrderButtons.scss'

interface OngoingOrderButtonsProps {
    onFinish?: () => void
}

export const OngoingOrderButtons: React.SFC<OngoingOrderButtonsProps> = ({ onFinish }) => (
    <div className='ongoingOrderButtons'>
        {
            onFinish &&
            <button onClick={onFinish} className='button finishButton'>
                Finish
            </button>
        }
    </div>
)
