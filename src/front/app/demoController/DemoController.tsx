import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {STEPS} from './Steps'
import {HELP_MESSAGES} from './HelpMessages'
import {getRouteCustomerExample} from '../views/Routes'
import {setHelpMessage, setStep} from '../state/Actions'

export default (WrappedComponent: any) => {

    class WrappedComponentWithDemoController extends React.Component<any, any> {
        constructor(props: any) {
            super(props)

            this.start = this.start.bind(this)
        }

        start() {
            this.props.dispatch(setStep(STEPS.CUSTOMER_SET_ADDRESS))
            this.props.dispatch(setHelpMessage(HELP_MESSAGES.START_AS_CUSTOMER))
            this.props.history.replace(getRouteCustomerExample())
        }

        render() {
            const demoController = {
                start: this.start
            }

            return <WrappedComponent {...this.props} demoController={demoController}/>
        }
    }

    return withRouter(connect()(WrappedComponentWithDemoController) as any) as any
}