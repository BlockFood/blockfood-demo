import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {IState} from '../../state/InitialState'
import {CUSTOMER_PREFIX, RESTAURANT_PREFIX, COURIER_PREFIX} from '../Routes'
import {getHelpMessageContent} from '../../demoController/HelpMessages'
import {STEPS, getStepLabel} from '../../demoController/Steps'
import withDemoController from '../../demoController/WithDemoController'
import Modal from '../../components/modal/Modal'
import {closeHelpMessage} from '../../state/Actions'

import './Navigator.scss'

class Navigator extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        const {step} = this.props

        this.state = {
            step,
            stepLabel: getStepLabel(step)
        }

        this.onHelpMessageClose = this.onHelpMessageClose.bind(this)
    }

    onHelpMessageClose() {
        this.props.dispatch(closeHelpMessage())
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.step !== this.props.step && nextProps.step !== STEPS.DEMO_NOT_STARTED) {
            this.setState({step: nextProps.step, stepLabel: getStepLabel(nextProps.step)})
        }
    }

    render() {
        const {visible, demoController, helpMessage} = this.props
        const {step, stepLabel} = this.state

        const getStep = (minStep: STEPS, icon: string | null = null) => {
            const isCompleted = step >= minStep

            return (
                <div className={`${icon ? `icon ${icon}` : 'step'}${isCompleted ? ' completed' : ''}`}>
                    {!icon ? minStep : null}
                </div>
            )
        }

        return (
            <footer id="bf-demo-navigator" className={visible ? 'visible' : ''}>
                <button className="restart" onClick={demoController.restart}>
                    <i className="fas fa-undo-alt"/>Restart
                </button>
                <div className="progress">
                    <div className="step-label">
                        <div><span>{step + 1}.</span> {stepLabel}</div>
                    </div>
                    <div className="breadcrumb">
                        {getStep(STEPS.CUSTOMER_SET_ADDRESS, CUSTOMER_PREFIX)}
                        {getStep(STEPS.CUSTOMER_SET_ADDRESS)}
                        {getStep(STEPS.CUSTOMER_CHOOSE_RESTAURANT)}
                        {getStep(STEPS.CUSTOMER_CREATE_ORDER)}
                        {getStep(STEPS.CUSTOMER_DO_PAYMENT)}
                        {getStep(STEPS.RESTAURANT_ACCEPT_ORDER, RESTAURANT_PREFIX)}
                        {getStep(STEPS.RESTAURANT_ACCEPT_ORDER)}
                        {getStep(STEPS.RESTAURANT_NOTIFY_ORDER_READY)}
                        {getStep(STEPS.COURIER_ACCEPT_ORDER, COURIER_PREFIX)}
                        {getStep(STEPS.COURIER_ACCEPT_ORDER)}
                        {getStep(STEPS.COURIER_NOTIFY_ORDER_PICKED)}
                        {getStep(STEPS.COURIER_NOTIFY_ORDER_DELIVERED)}
                    </div>
                </div>
                <a className="logo" href="http://blockfood.io" target="_blank" rel="noopener noreferrer"/>
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
        step: state.step,
        helpMessage: state.helpMessage
    }
}

export default withRouter(connect(mapStateToProps)(withDemoController(Navigator)) as any) as any