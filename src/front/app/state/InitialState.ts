import * as _ from 'lodash'
import {IOrderDetails, IOrder} from '../../../lib/Orders'
import {STEPS} from '../demoController/Steps'
import {HELP_MESSAGES} from '../demoController/HelpMessages'
import Storage from '../utils/Storage'

export interface IHelpMessageModal {
    id: HELP_MESSAGES,
    onClose: () => any
}

export interface IState {
    step: STEPS,
    helpMessage: IHelpMessageModal | null,
    customerAddress: string,
    orderInProgress: IOrderDetails | null,
    orders: IOrder[]
}

export const DEFAULT_STATE: IState = {
    step: STEPS.DEMO_NOT_STARTED,
    helpMessage: null,
    customerAddress: '',
    orderInProgress: null,
    orders: []
}

export const INITIAL_STATE: IState = _.assign({}, DEFAULT_STATE, {
    customerAddress: Storage.getCurrentAddress() || DEFAULT_STATE.customerAddress,
    orderInProgress: Storage.getOrderInProgress() || DEFAULT_STATE.orderInProgress
})