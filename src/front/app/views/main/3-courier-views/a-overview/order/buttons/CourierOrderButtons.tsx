import * as  React from 'react'
import {ORDER_STATUS} from '../../../../../../../../lib/Orders'

import './CourierOrderButtons.scss'

interface CourierOrderButtonsProps {
    orderStatus: ORDER_STATUS
    onAccept?: () => void
    onDecline?: () => void
    acceptDisabled: boolean
}

export const CourierOrderButtons: React.SFC<CourierOrderButtonsProps> = ({ orderStatus, onAccept, acceptDisabled, onDecline}) => (
    <div className='courierOrderButtons'>
        {
            onAccept &&
            <button onClick={onAccept} className='button validateButton'  disabled={acceptDisabled}>
                {
                    {
                        [ORDER_STATUS.READY]: 'Accept',
                        [ORDER_STATUS.PICKING]: 'Notify picked',
                        [ORDER_STATUS.DELIVERING]: 'Done'
                    }[orderStatus]
                }
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
