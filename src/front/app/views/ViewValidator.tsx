import * as React from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {IState} from '../state/InitialState'
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

const mapStateToProps = (state: IState) => {
    return {}
}

export default withRouter<any>(connect(mapStateToProps)(ViewValidator))