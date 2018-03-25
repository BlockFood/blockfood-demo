import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {IState} from '../../state/InitialState'
import {getHelpMessageContent} from '../HelpMessages'
import withDemoController from '../DemoController'
import Modal from '../../components/modal/Modal'
import {closeHelpMessage} from '../../state/Actions'

import './Navigator.scss'

class Navigator extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.onHelpMessageClose = this.onHelpMessageClose.bind(this)
    }

    onHelpMessageClose() {
        this.props.dispatch(closeHelpMessage())
    }

    render() {
        const {visible, demoController, helpMessage} = this.props

        return (
            <footer id="bf-demo-navigator" className={visible ? 'visible' : ''}>
                <button className="restart" onClick={demoController.restart}><i className="fas fa-undo-alt"/>Restart</button>
                {helpMessage && (
                    <Modal onImmediateClose={helpMessage.onClose} onClose={this.onHelpMessageClose}>
                        {getHelpMessageContent(helpMessage.id)}
                    </Modal>
                )}
            </footer>
        )
    }
}

const mapStateToProps = (state: IState) => {
    return {
        helpMessage: state.helpMessage
    }
}

export default withRouter(connect(mapStateToProps)(withDemoController(Navigator)) as any) as any