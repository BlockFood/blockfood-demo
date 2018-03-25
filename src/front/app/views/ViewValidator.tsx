import * as React from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as Routes from './Routes'

class ViewValidator extends React.Component {
    isValid(): boolean {
        // TODO: for each route, check the step and the state
        return true
    }

    render() {
        if (this.isValid()) {
            return this.props.children
        }
        else {
            return <Redirect to={Routes.HOME}/>
        }
    }
}

export default withRouter<any>(connect()(ViewValidator))