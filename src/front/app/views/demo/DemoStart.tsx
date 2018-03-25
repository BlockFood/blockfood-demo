import * as React from 'react'
import {connect} from 'react-redux'
import Api from '../../api/Api'
import doWithMinTime from '../../utils/DoWithMinTime'
import {STEPS} from '../../demoController/Steps'
import {HELP_MESSAGES} from '../../demoController/HelpMessages'
import {getRouteCustomerExample} from '../Routes'
import {restart, setStep, setHelpMessage} from '../../state/Actions'

import './DemoStart.scss'

class DemoStart extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            loading: false
        }

        this.onStartDemo = this.onStartDemo.bind(this)
    }

    onStartDemo() {
        this.setState({loading: true})

        doWithMinTime(() => Api.startDemo()).then(() => {
            this.props.dispatch(setStep(STEPS.CUSTOMER_SET_ADDRESS))
            this.props.dispatch(setHelpMessage(HELP_MESSAGES.START_AS_CUSTOMER))
            this.props.history.replace(getRouteCustomerExample())
        })
    }

    componentDidMount() {
        this.props.dispatch(restart())
    }

    render() {
        const {loading} = this.state

        return (
            <div id="bf-demo-start">
                {loading ? <i className="fas fa-circle-notch fa-spin"/> : <button onClick={this.onStartDemo}>Start</button>}
            </div>
        )
    }
}

export default connect()(DemoStart)