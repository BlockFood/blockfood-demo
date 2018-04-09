import * as  React from 'react';

import './OrderButtons.scss';

export const OrderButtons: React.SFC = () => (
    <div className='orderButtons'>
        <button className='button validateButton'>
            Accepter
        </button>
        <button className='button declineButton'>
            Refuser
        </button>
    </div>
);
