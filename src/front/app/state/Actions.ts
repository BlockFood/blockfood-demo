import {STEPS} from '../demoController/types/Steps'
import {HELP_MESSAGES} from '../demoController/types/HelpMessages'
import {IOrder} from '../../../lib/Orders'

export const SET_STEP = 'SET_STEP'
export const SET_HELP_MESSAGE = 'SET_HELP_MESSAGE'
export const SET_ORDERS = 'SET_ORDERS'
export const RESTART = 'RESTART'
export const SET_CUSTOMER_LOCATION = 'SET_CUSTOMER_LOCATION'

export const setStep = (step: STEPS) => ({type: SET_STEP, step})

export const setHelpMessage = (id: HELP_MESSAGES | null, onClose: any = null) => ({type: SET_HELP_MESSAGE, id, onClose})

export const closeHelpMessage = () => ({type: SET_HELP_MESSAGE, close: true})

export const setOrders = (orders: IOrder[]) => ({type: SET_ORDERS, orders})

export const restart = () => ({type: RESTART})

export const setCustomerLocation = (customerLocation: string) => ({type: SET_CUSTOMER_LOCATION, customerLocation})