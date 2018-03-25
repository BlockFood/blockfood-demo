import {STEPS} from '../demoController/Steps'
import {HELP_MESSAGES} from '../demoController/HelpMessages'

export const SET_STEP = 'SET_STEP'
export const SET_HELP_MESSAGE = 'SET_HELP_MESSAGE'
export const SET_CUSTOMER_ADDRESS = 'SET_CUSTOMER_ADDRESS'
export const SET_ORDER_IN_PROGRESS = 'SET_ORDER_IN_PROGRESS'
export const SET_ORDERS = 'SET_ORDERS'
export const RESTART = 'RESTART'

export const setStep = (step: STEPS) => ({type: SET_STEP, step})

export const setHelpMessage = (helpMessage: HELP_MESSAGES) => ({type: SET_HELP_MESSAGE, helpMessage})

export const restart = () => ({type: RESTART})