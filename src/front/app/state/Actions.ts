import {STEPS} from '../demoController/types/Steps'
import {HELP_MESSAGES} from '../demoController/types/HelpMessages'
import {IOrder, IOrderInProgress,IOrderDetail,ORDER_STATUS} from '../../../lib/Orders'
import * as IDemoState  from './DemoInitialState'
const API_REMOTE_URL = 'http://localhost:4242'
import Http from 'axios'

//ACTION APPLICATION

export const SET_STEP = 'SET_STEP'
export const SET_HELP_MESSAGE = 'SET_HELP_MESSAGE'
export const SET_ORDERS = 'SET_ORDERS'
export const TOGGLE_IS_MOBILE = 'TOGGLE_IS_MOBILE'
export const RESTART = 'RESTART'
export const SET_CUSTOMER_LOCATION = 'SET_CUSTOMER_LOCATION'
export const CREATE_CUSTOMER_ORDER_IN_PROGRESS = 'CREATE_CUSTOMER_ORDER_IN_PROGRESS'
export const SET_CUSTOMER_ORDER_IN_PROGRESS = 'SET_CUSTOMER_ORDER_IN_PROGRESS'
export const SET_CUSTOMER_POSITION = 'SET_CUSTOMER_POSITION'
export const SET_COURIER_POSITION = 'SET_COURIER_POSITION'

export const setStep = (step: STEPS) => ({type: SET_STEP, step})

export const setHelpMessage = (id: HELP_MESSAGES | null, onClose: any = null) => ({type: SET_HELP_MESSAGE, id, onClose})

export const closeHelpMessage = () => ({type: SET_HELP_MESSAGE, close: true})

export const toggleIsMobile = () => ({type: TOGGLE_IS_MOBILE})

export const restart = () => ({type: RESTART})

export const setOrders = (orders: IOrder[]) => ({type: SET_ORDERS, orders})

export const setCustomerLocation = (customerLocation: string) => ({type: SET_CUSTOMER_LOCATION, customerLocation})

export const createCustomerOrderInProgress = (restaurantId: string) => ({type: CREATE_CUSTOMER_ORDER_IN_PROGRESS, restaurantId})

export const setCustomerOrderInProgress = (customerOrderInProgress: IOrderInProgress | null) => ({type: SET_CUSTOMER_ORDER_IN_PROGRESS, customerOrderInProgress})

export const setCustomerPosition = (customerPosition: [number, number]) => ({type: SET_CUSTOMER_POSITION, customerPosition})

export const setCourierPosition = (courierPosition: [number, number]) => ({type: SET_COURIER_POSITION, courierPosition})

//ACTION DEMO
export const IS_FETCHING = "IS_FETCHING"
export const FETCHED = "FETCHED"
export const INIT = 'INIT'
export const SET_INIT = 'SET_INIT'
export const GET_DEMO_ID = 'GET_DEMO_ID'
export const START_DEMO = 'START_DEMO'
export const CREATE_NEW_ORDER = 'CREATE_NEW_ORDER'
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'
export const GET_ORDERS = 'GET_ORDERS'

export const isfetching = () =>({type: IS_FETCHING})
export const fetched   = () =>({type: FETCHED})
export const init = (demoId: string,onError: () => any) => ({type: INIT,demoId,onError})
export const setInit = (demoId: string) => ({type: SET_INIT,demoId})
export const getDemoId = () => ({type: GET_DEMO_ID})
// export const startDemo = () => ({type: START_DEMO})
export const createNewOrder = (restaurantId:string, customerPosition: [number][number],details: IOrderDetail[]) => ({type: CREATE_NEW_ORDER})
export const updateOrderStatus = (orderId: string, status: ORDER_STATUS) => ({type: UPDATE_ORDER_STATUS})
export const getOrders = (demoId:string) => {
  return (dispatch:any) => {
    dispatch(isfetching)
    Http.get(`${API_REMOTE_URL}/api/${demoId}/orders`)
        .then(({data: orders}: any) =>
         setOrders(orders))
        .catch((err) => {
        if (!err || !err.response || !err.response.status || err.response.status !== 403) {
        console.error(err)}
        dispatch(fetched)
    })
  }
}

export const startDemo = () => {
  return (dispatch:any) => {
    dispatch(isfetching)
    Http.post(`${API_REMOTE_URL}/api/start-demo`)
        .then(({data: demo}: any) => {
            dispatch(setInit(demo))
        })
        .catch((err) => {
          if (!err || !err.response || !err.response.status || err.response.status !== 403) {
            console.error(err)
          }
        })
    }
}
