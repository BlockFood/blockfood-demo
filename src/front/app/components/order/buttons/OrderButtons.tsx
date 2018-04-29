import * as  React from 'react'

import './OrderButtons.scss'

interface OrderButtonsProps {
    onValid?: Function
    onValidLabel?: string
    onValidDisabled?: boolean
    onCancel?: Function
    onCancelLabel?: string
    onCancelDisabled?: boolean
}

export const OrderButtons: React.SFC<OrderButtonsProps> = ({onValid, onValidLabel, onValidDisabled, onCancel, onCancelLabel, onCancelDisabled}) => (
    <div className='orderButtons'>
        {
            onValid &&
            <button onClick={onValid as any} className='button validateButton' disabled={onValidDisabled}>
                {onValidLabel || 'Valid'}
            </button>
        }
        {
            onCancel &&
            <button onClick={onCancel as any} className='button declineButton' disabled={onCancelDisabled}>
                {onCancelLabel || 'Cancel'}
            </button>
        }
    </div>
)
