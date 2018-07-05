import * as _ from 'lodash'
import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {IRootState} from '../../state/Reducers'
import {ALL_VIEWS, CUSTOMER_VIEW, RESTAURANT_VIEW, COURIER_VIEW} from '../../views/Routes'
import {getHelpMessageContent} from '../types/HelpMessages'
import {STEPS, getStepLabel} from '../types/Steps'
import withDemoController from '../WithDemoController'
import Modal from '../../components/modal/Modal'
import {closeHelpMessage, toggleIsMobile} from '../../state/Actions'

import './DemoControllerPanel.scss'

class DemoControllerPanel extends React.Component<any, any> {
    private initialStep: STEPS

    constructor(props: any) {
        super(props)

        this.initialStep = this.props.step
        this.state = {
            step: this.initialStep,
            stepLabel: getStepLabel(this.initialStep)
        }

        this.onHelpMessageClose = this.onHelpMessageClose.bind(this)
        this.toggleIsMobile = this.toggleIsMobile.bind(this)
        this.switchView = this.switchView.bind(this)
    }

    onHelpMessageClose() {
        this.props.dispatch(closeHelpMessage())
    }

    toggleIsMobile() {
        this.props.dispatch(toggleIsMobile())
    }

    switchView(event: any) {
        const newView = _.find(ALL_VIEWS, view => event.target.className.indexOf(view) !== -1)

        if (newView) {
            this.props.demoController.switchView(newView)
        }
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.step !== this.props.step) {
            if (nextProps.step !== STEPS.DEMO_NOT_STARTED) {
                this.setState({step: nextProps.step, stepLabel: getStepLabel(nextProps.step)})
            }
            else {
                this.initialStep = STEPS.DEMO_NOT_STARTED
            }
        }
    }

    render() {
        const {view, demoController, helpMessage, isMobile} = this.props
        const {step, stepLabel} = this.state

        const getStep = (minStep: STEPS, icon: string | null = null, clickable=false) => {
            const isCompleted = step >= minStep
            const completedClassName = minStep <= this.initialStep ? 'initial-completed' : 'completed'

const go = () => {
  if (clickable) {
    this.props.demoController.switchView(icon)
  }
}
            return (
                <div key={`${minStep}_${icon ? 'i' : ''}`}
                  onClick={go}
                     className={`${icon ? `icon ${icon}` : 'step'}${isCompleted ? ` ${completedClassName}` : ''}`}>
                    <div className="circle">{!icon ? minStep + 1 : null}</div>
                    <div className="line"/>
                </div>
            )
        }

        return (
            <footer id="bf-demo-controller-panel" className={!!view ? 'visible' : ''}>
                <div className="left">
                    <button className="restart" onClick={demoController.restart}>
                        <i className="fas fa-undo-alt"/>Restart
                    </button>
                    <div className="devices">
                        <i className={`fas fa-desktop${!isMobile ? ' active' : ''}`}
                           onClick={this.toggleIsMobile}/> /
                        <i className={`fas fa-mobile-alt${isMobile ? ' active' : ''}`}
                           onClick={this.toggleIsMobile}/>
                    </div>
                </div>
                <div className="progress">
                    {step < STEPS.FREE_MODE && (
                        <div className="step-label">
                            <div><span>{step + 1}.</span> {stepLabel}</div>
                        </div>
                    )}
                    <div className="breadcrumb">
                        {step < STEPS.FREE_MODE ? (
                            <React.Fragment>
                                {getStep(STEPS.CUSTOMER_SET_LOCATION, CUSTOMER_VIEW)}
                                {getStep(STEPS.CUSTOMER_SET_LOCATION)}
                                {getStep(STEPS.CUSTOMER_CHOOSE_RESTAURANT)}
                                {getStep(STEPS.CUSTOMER_CREATE_ORDER)}
                                {getStep(STEPS.CUSTOMER_SET_POSITION)}
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
                              {getStep(STEPS.CUSTOMER_SET_LOCATION, CUSTOMER_VIEW, true)}
                              {getStep(STEPS.RESTAURANT_ACCEPT_ORDER, RESTAURANT_VIEW, true)}
                              {getStep(STEPS.COURIER_ACCEPT_ORDER, COURIER_VIEW, true)}
                          </React.Fragment>
                        )}
                    </div>
                </div>
                <div className="right">
                    <a className="logo" href="http://blockfood.io" target="_blank" rel="noopener noreferrer"/>
                </div>
                {helpMessage && (
                    <Modal onImmediateClose={helpMessage.onClose} onClose={this.onHelpMessageClose}>
                        {getHelpMessageContent(helpMessage.id)}
                    </Modal>
                )}
            </footer>
        )
    }
}

const mapStateToProps = (state: IRootState) => {
    return {
        step: state.application.step,
        helpMessage: state.application.helpMessage,
        isMobile: state.application.isMobile
    }
}

export default withRouter(connect(mapStateToProps)(withDemoController(DemoControllerPanel)) as any) as any
