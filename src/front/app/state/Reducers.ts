import * as _ from 'lodash'
import {IOrderInProgress} from '../../../lib/Orders'
import {DEFAULT_STATE, INITIAL_STATE, IHelpMessageModal, IState} from './InitialState'
import {
    SET_STEP,
    SET_HELP_MESSAGE,
    SET_ORDERS,
    RESTART,
    SET_CUSTOMER_LOCATION,
    CREATE_CUSTOMER_ORDER_IN_PROGRESS,
    SET_CUSTOMER_ORDER_IN_PROGRESS,
    SET_CUSTOMER_POSITION
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

const reduceOrders = (state: IState, action: any): IState => {
    return _.assign({}, state, {orders: action.orders})
}

const reduceCustomerLocation = (state: IState, action: any): IState => {
    Storage.setCustomerLocation(action.customerLocation)
    return _.assign({}, state, {customerLocation: action.customerLocation})
}

const _reduceCustomerOrderInProgress = (state: IState, customerOrderInProgress: IOrderInProgress): IState => {
    Storage.setCustomerOrderInProgress(customerOrderInProgress)
    return _.assign({}, state, {customerOrderInProgress})
}

const reduceNewCustomerOrderInProgress = (state: IState, action: any): IState => {
    if (state.customerOrderInProgress && state.customerOrderInProgress.restaurantId === action.restaurantId) {
        return state
    }
    else {
        const customerOrderInProgress: IOrderInProgress = {
            restaurantId: action.restaurantId,
            customerPosition: null,
            details: []
        }
        return _reduceCustomerOrderInProgress(state, customerOrderInProgress)
    }
}

const reduceCustomerOrderInProgress = (state: IState, action: any): IState => {
    return _reduceCustomerOrderInProgress(state, action.customerOrderInProgress)
}

const reduceCustomerPosition = (state: IState, action: any): IState => {
    const customerOrderInProgress = _.assign({}, state.customerOrderInProgress, {customerPosition: action.customerPosition})
    return _reduceCustomerOrderInProgress(state, customerOrderInProgress)
}

export const rootReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case SET_STEP:
            return reduceStep(state, action)
        case SET_HELP_MESSAGE:
            return reduceHelpMessage(state, action)
        case SET_ORDERS:
            return reduceOrders(state, action)
        case RESTART:
            Storage.clearAll()
            return DEFAULT_STATE
        case SET_CUSTOMER_LOCATION:
            return reduceCustomerLocation(state, action)
        case CREATE_CUSTOMER_ORDER_IN_PROGRESS:
            return reduceNewCustomerOrderInProgress(state, action)
        case SET_CUSTOMER_ORDER_IN_PROGRESS:
            return reduceCustomerOrderInProgress(state, action)
        case SET_CUSTOMER_POSITION:
            return reduceCustomerPosition(state, action)
        default:
            return state
    }
}