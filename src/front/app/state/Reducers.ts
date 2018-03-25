import * as _ from 'lodash'
import {DEFAULT_STATE, INITIAL_STATE, IHelpMessageModal, IState} from './InitialState'
import {
    SET_STEP,
    SET_HELP_MESSAGE,
    SET_CUSTOMER_ADDRESS,
    SET_ORDER_IN_PROGRESS,
    SET_ORDERS,
    RESTART
} from './Actions'
import Storage from '../utils/Storage'

const reduceStep = (state: IState, action: any): IState => {
    if (action.allowBack || action.step > state.step) {
        return _.assign({}, state, {step: action.step})
    }
    else {
        return state
    }
}

const reduceHelpMessage = (state: IState, action: any): IState => {
    const helpMessage: IHelpMessageModal | null = !action.close ? {
        id: action.id,
        onClose: action.onClose
    } : null
    return _.assign({}, state, {helpMessage})
}

const reduceCustomerAddress = (state: IState, action: any): IState => {
    Storage.setCurrentAddress(action.customerAddress)
    return _.assign({}, state, {customerAddress: action.customerAddress})
}

const reduceOrderInProgress = (state: IState, action: any): IState => {
    Storage.setOrderInProgress(action.orderInProgress)
    return _.assign({}, state, {orderInProgress: action.orderInProgress})
}

const reduceOrders = (state: IState, action: any): IState => {
    return _.assign({}, state, {orders: action.orders})
}

export const rootReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case SET_STEP:
            return reduceStep(state, action)
        case SET_HELP_MESSAGE:
            return reduceHelpMessage(state, action)
        case SET_CUSTOMER_ADDRESS:
            return reduceCustomerAddress(state, action)
        case SET_ORDER_IN_PROGRESS:
            return reduceOrderInProgress(state, action)
        case SET_ORDERS:
            return reduceOrders(state, action)
        case RESTART:
            Storage.clearAll()
            return DEFAULT_STATE
        default:
            return state
    }
}