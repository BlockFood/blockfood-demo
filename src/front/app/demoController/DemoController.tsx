import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {STEPS} from './Steps'
import {HELP_MESSAGES} from './HelpMessages'
import * as Routes from '../views/Routes'
import {setHelpMessage, setStep, restart} from '../state/Actions'

export default (WrappedComponent: any) => {

    class WrappedComponentWithDemoController extends React.Component<any, any> {
        constructor(props: any) {
            super(props)

            this.start = this.start.bind(this)
            this.restart = this.restart.bind(this)
        }

        start() {
            this.props.dispatch(setStep(STEPS.CUSTOMER_SET_ADDRESS))
            this.props.dispatch(setHelpMessage(HELP_MESSAGES.START_AS_CUSTOMER))
            this.props.history.replace(Routes.getRouteCustomerExample())
        }

        restart() {
            this.props.dispatch(restart())
            this.props.history.replace(Routes.HOME)
        }

        render() {
            const demoController = {
                start: this.start,
                restart: this.restart
            }

            return <WrappedComponent {...this.props} demoController={demoController}/>
        }
    }

    return withRouter(connect()(WrappedComponentWithDemoController) as any) as any
}