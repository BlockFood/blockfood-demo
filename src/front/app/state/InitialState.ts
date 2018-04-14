import * as _ from 'lodash'
import {IOrder, IOrderInProgress} from '../../../lib/Orders'
import {STEPS} from '../demoController/types/Steps'
import {HELP_MESSAGES} from '../demoController/types/HelpMessages'
import Storage from '../utils/Storage'

export interface IHelpMessageModal {
    id: HELP_MESSAGES,
    onClose: () => any
}

export interface IState {
    step: STEPS,
    helpMessage: IHelpMessageModal | null,
    orders: IOrder[],
    customerLocation: string,
    customerOrderInProgress: IOrderInProgress | null
}

export const DEFAULT_STATE: IState = {
    step: STEPS.DEMO_NOT_STARTED,
    helpMessage: null,
    orders: [],
    customerLocation: '',
    customerOrderInProgress: null
}

export const INITIAL_STATE: IState = _.assign({}, DEFAULT_STATE, {
    customerLocation: Storage.getCustomerLocation() || DEFAULT_STATE.customerLocation,
    customerOrderInProgress: Storage.getCustomerOrderInProgress() || DEFAULT_STATE.customerOrderInProgress
})