import * as React from 'react'
import withDemoController from '../../../../demoController/WithDemoController';

import './Progress.scss'

class Progress extends React.Component {

    public render(){
        return(<div id='bf-demo-view-customer-location'>
            <div className='progressContainer'>
            <div className='mainTitle mainTitleProgress'><h1>Delivery progress</h1></div>
            <div className='progress'>
                <div className='progressBar'>
                    <div className='colored round'>
                        <span className='progressText'>Command</span>
                    </div>
                    <div className='colored round'>
                        <span className='progressText'>Progression</span>
                    </div>
                    <div className='round'>
                        <span className='progressText'>Delivery</span>
                    </div>
                    <div className='round'>
                        <span className='progressText'>Delivered</span>
                    </div>
                </div>
            </div>
            </div>
        </div>)
    }
}
export default (withDemoController(Progress))
