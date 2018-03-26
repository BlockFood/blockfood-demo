import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {IState} from '../../state/InitialState'
import {ALL_VIEWS, CUSTOMER_VIEW, RESTAURANT_VIEW, COURIER_VIEW} from '../../views/Routes'
import {getHelpMessageContent} from '../types/HelpMessages'
import {STEPS, getStepLabel} from '../types/Steps'
import withDemoController from '../WithDemoController'
import Modal from '../../components/modal/Modal'
import {closeHelpMessage} from '../../state/Actions'

import './DemoControllerPanel.scss'

class DemoControllerPanel extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        const {step} = this.props

        this.state = {
            step,
            stepLabel: getStepLabel(step)
        }

        this.onHelpMessageClose = this.onHelpMessageClose.bind(this)
        this.switchView = this.switchView.bind(this)
    }

    onHelpMessageClose() {
        this.props.dispatch(closeHelpMessage())
    }

    switchView(event: any) {
        const newView = _.find(ALL_VIEWS, view => event.target.className.indexOf(view) !== -1)

        if (newView) {
            this.props.demoController.switchView(newView)
        }
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.step !== this.props.step && nextProps.step !== STEPS.DEMO_NOT_STARTED) {
            this.setState({step: nextProps.step, stepLabel: getStepLabel(nextProps.step)})
        }
    }

    render() {
        const {view, demoController, helpMessage} = this.props
        const {step, stepLabel} = this.state

        const getStep = (minStep: STEPS, icon: string | null = null) => {
            const isCompleted = step >= minStep

            return (
                <div className={`${icon ? `icon ${icon}` : 'step'}${isCompleted ? ' completed' : ''}`}>
                    {!icon ? minStep + 1 : null}
                </div>
            )
        }

        return (
            <footer id="bf-demo-controller-panel" className={!!view ? 'visible' : ''}>
                <button className="restart" onClick={demoController.restart}>
                    <i className="fas fa-undo-alt"/>Restart
                </button>
                <div className="progress">
                    {step < STEPS.FREE_MODE && (
                        <div className="step-label">
                            <div><span>{step + 1}.</span> {stepLabel}</div>
                        </div>
                    )}
                    <div className="breadcrumb">
                        {step < STEPS.FREE_MODE ? (
                            <React.Fragment>
                                {getStep(STEPS.CUSTOMER_SET_ADDRESS, CUSTOMER_VIEW)}
                                {getStep(STEPS.CUSTOMER_SET_ADDRESS)}
                                {getStep(STEPS.CUSTOMER_CHOOSE_RESTAURANT)}
                                {getStep(STEPS.CUSTOMER_CREATE_ORDER)}
                                {getStep(STEPS.CUSTOMER_DO_PAYMENT)}
                                {getStep(STEPS.RESTAURANT_ACCEPT_ORDER, RESTAURANT_VIEW)}
                                {getStep(STEPS.RESTAURANT_ACCEPT_ORDER)}
                                {getStep(STEPS.RESTAURANT_NOTIFY_ORDER_READY)}
                                {getStep(STEPS.COURIER_ACCEPT_ORDER, COURIER_VIEW)}
                                {getStep(STEPS.COURIER_ACCEPT_ORDER)}
                                {getStep(STEPS.COURIER_NOTIFY_ORDER_PICKED)}
                                {getStep(STEPS.COURIER_NOTIFY_ORDER_DELIVERED)}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {_.map(ALL_VIEWS, view => {
                                    const isActive = view.indexOf(view) === 0

                                    return (
                                        <div key={view} className={`icon btn ${view}${isActive ? ' active' : ''}`} onClick={this.switchView}/>
                                    )
                                })}
                            </React.Fragment>
                        )}
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

export default withRouter(connect(mapStateToProps)(withDemoController(DemoControllerPanel)) as any) as any