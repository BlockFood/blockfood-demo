import * as _ from 'lodash'
import {IOrder} from '../../../lib/Orders'
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
    customerLocation: string
}

export const DEFAULT_STATE: IState = {
    step: STEPS.DEMO_NOT_STARTED,
    helpMessage: null,
    orders: [],
    customerLocation: ''
}

export const INITIAL_STATE: IState = _.assign({}, DEFAULT_STATE, {
    customerLocation: Storage.getCustomerLocation() || DEFAULT_STATE.customerLocation
})