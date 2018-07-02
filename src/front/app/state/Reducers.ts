import * as _ from 'lodash'
import Http from 'axios'
import { combineReducers } from 'redux'
import {IOrderInProgress,IOrder} from '../../../lib/Orders'
import * as ApplicationInitialState  from './ApplicationInitialState'
import * as IDemoState  from './DemoInitialState'

import {
    SET_STEP,
    SET_HELP_MESSAGE,
    TOGGLE_IS_MOBILE,
    RESTART,
    SET_ORDERS,
    SET_CUSTOMER_LOCATION,
    CREATE_CUSTOMER_ORDER_IN_PROGRESS,
    SET_CUSTOMER_ORDER_IN_PROGRESS,
    SET_CUSTOMER_POSITION,
    SET_COURIER_POSITION,
    INIT,
    SET_INIT,
    GET_DEMO_ID,
    START_DEMO,
    CREATE_NEW_ORDER,
    UPDATE_ORDER_STATUS,
    IS_FETCHING,
    FETCHED,
    GET_ORDERS
} from './Actions'
import Storage from '../utils/Storage'

const API_REMOTE_URL = 'http://localhost:4242'

const reduceStep = (state: ApplicationInitialState.IApplicationState, action: any): ApplicationInitialState.IApplicationState => {
    if (action.allowBack || action.step > state.step) {
        return _.assign({}, state, {step: action.step})
    }
    else {
        return state
    }
}

const reduceHelpMessage = (state: ApplicationInitialState.IApplicationState, action: any): ApplicationInitialState.IApplicationState => {
    const helpMessage: ApplicationInitialState.IHelpMessageModal | null = !action.close ? {
        id: action.id,
        onClose: action.onClose
    } : null
    return _.assign({}, state, {helpMessage})
}

const reduceIsMobile = (state: ApplicationInitialState.IApplicationState): ApplicationInitialState.IApplicationState => {
    const isMobile = !state.isMobile
    Storage.setIsMobile(isMobile)
    return _.assign({}, state, {isMobile})
}

const reduceOrders = (state: ApplicationInitialState.IApplicationState, action: any): ApplicationInitialState.IApplicationState => {
    return _.assign({}, state, {orders: action.orders})
}

const reduceCustomerLocation = (state: ApplicationInitialState.IApplicationState, action: any): ApplicationInitialState.IApplicationState => {
    Storage.setCustomerLocation(action.customerLocation)
    return _.assign({}, state, {customerLocation: action.customerLocation})
}

const reduceNewCustomerOrderInProgress = (state: ApplicationInitialState.IApplicationState, action: any): ApplicationInitialState.IApplicationState => {
    if (state.customerOrderInProgress && state.customerOrderInProgress.restaurantId === action.restaurantId) {
        return state
    }
    else {
        const customerOrderInProgress: IOrderInProgress = {
            restaurantId: action.restaurantId,
            details: []
        }
        return reduceCustomerOrderInProgress(state, {customerOrderInProgress})
    }
}

const reduceCustomerOrderInProgress = (state: ApplicationInitialState.IApplicationState, action: any): ApplicationInitialState.IApplicationState => {
    Storage.setCustomerOrderInProgress(action.customerOrderInProgress)
    return _.assign({}, state, {customerOrderInProgress: action.customerOrderInProgress})
}

const reduceCustomerPosition = (state: ApplicationInitialState.IApplicationState, action: any): ApplicationInitialState.IApplicationState => {
    Storage.setCustomerPosition(action.customerPosition)
    return _.assign({}, state, {customerPosition: action.customerPosition})
}

const reduceCourierPosition = (state: ApplicationInitialState.IApplicationState, action: any): ApplicationInitialState.IApplicationState => {
    Storage.setCourierPosition(action.courierPosition)
    return _.assign({}, state, {courierPosition: action.courierPosition})
}

export interface IRootState {
    application: ApplicationInitialState.IApplicationState,
    demo: IDemoState.IDemoState
}

export const application = (state = ApplicationInitialState.INITIAL_STATE, action: any) => {
    switch (action.type) {
        case SET_STEP:
            return reduceStep(state, action)
        case SET_HELP_MESSAGE:
            return reduceHelpMessage(state, action)
        case SET_ORDERS:
            return reduceOrders(state, action)
        case TOGGLE_IS_MOBILE:
            return reduceIsMobile(state)
        case RESTART:
            Storage.clearAll()
            return ApplicationInitialState.DEFAULT_STATE
        case SET_CUSTOMER_LOCATION:
            return reduceCustomerLocation(state, action)
        case CREATE_CUSTOMER_ORDER_IN_PROGRESS:
            return reduceNewCustomerOrderInProgress(state, action)
        case SET_CUSTOMER_ORDER_IN_PROGRESS:
            return reduceCustomerOrderInProgress(state, action)
        case SET_CUSTOMER_POSITION:
            return reduceCustomerPosition(state, action)
        case SET_COURIER_POSITION:
            return reduceCourierPosition(state, action)
        default:
            return state
    }
}

const init = (state: IDemoState.IDemoState,action:any):IDemoState.IDemoState => {
  return _.assign({},state,{demoId: action.demoId})
}

const setInit = (state: IDemoState.IDemoState,action:any):IDemoState.IDemoState => {
  return _.assign({},state,{demoId: action.demoId})
}

const getDemoId = (state: IDemoState.IDemoState,action:any) => {
  return(state.demoId)
}

// const startDemo = (state: IDemoState.IDemoState,action:any) => {
//
// }

const createNewOrder = (state: IDemoState.IDemoState,action:any) => {
}

const updateOrderStatus = (state: IDemoState.IDemoState,action:any) => {
}

const isfetching = (state: IDemoState.IDemoState,action:any) => {
  return _.assign({},state,{demoId: true})
}

const fetched = (state: IDemoState.IDemoState,action:any) => {
  return _.assign({},state,{demoId: false})
}

export const demo = (state = IDemoState.INITIAL_STATE, action: any) => {
  switch (action.type) {
      case IS_FETCHING:
        return isfetching(state,action)
      case FETCHED:
        return fetched(state,action)
      case INIT:
          return init(state, action)
      case SET_INIT:
          return setInit(state, action)
      case GET_DEMO_ID:
          return getDemoId(state, action)
      case CREATE_NEW_ORDER:
          return createNewOrder(state, action)
      case UPDATE_ORDER_STATUS:
          return updateOrderStatus(state, action)
      default:
          return state
  }
}

export const rootReducer = combineReducers({
  application,
  demo
})
​
