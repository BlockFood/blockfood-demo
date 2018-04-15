import {STEPS} from '../demoController/types/Steps'
import {HELP_MESSAGES} from '../demoController/types/HelpMessages'
import {IOrder, IOrderInProgress} from '../../../lib/Orders'

export const SET_STEP = 'SET_STEP'
export const SET_HELP_MESSAGE = 'SET_HELP_MESSAGE'
export const SET_ORDERS = 'SET_ORDERS'
export const TOGGLE_IS_MOBILE = 'TOGGLE_IS_MOBILE'
export const RESTART = 'RESTART'
export const SET_CUSTOMER_LOCATION = 'SET_CUSTOMER_LOCATION'
export const CREATE_CUSTOMER_ORDER_IN_PROGRESS = 'CREATE_CUSTOMER_ORDER_IN_PROGRESS'
export const SET_CUSTOMER_ORDER_IN_PROGRESS = 'SET_CUSTOMER_ORDER_IN_PROGRESS'
export const SET_CUSTOMER_POSITION = 'SET_CUSTOMER_POSITION'

export const setStep = (step: STEPS) => ({type: SET_STEP, step})

export const setHelpMessage = (id: HELP_MESSAGES | null, onClose: any = null) => ({type: SET_HELP_MESSAGE, id, onClose})

export const closeHelpMessage = () => ({type: SET_HELP_MESSAGE, close: true})

export const toggleIsMobile = () => ({type: TOGGLE_IS_MOBILE})

export const restart = () => ({type: RESTART})

export const setOrders = (orders: IOrder[]) => ({type: SET_ORDERS, orders})

export const setCustomerLocation = (customerLocation: string) => ({type: SET_CUSTOMER_LOCATION, customerLocation})

export const createCustomerOrderInProgress = (restaurantId: string) => ({type: CREATE_CUSTOMER_ORDER_IN_PROGRESS, restaurantId})

export const setCustomerOrderInProgress = (customerOrderInProgress: IOrderInProgress | null) => ({type: SET_CUSTOMER_ORDER_IN_PROGRESS, customerOrderInProgress})

export const setCustomerPosition = (customerPosition: [Number, Number]) => ({type: SET_CUSTOMER_POSITION, customerPosition})