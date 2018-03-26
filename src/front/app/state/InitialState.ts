import * as _ from 'lodash'
import {IOrder} from '../../../lib/Orders'
import {STEPS} from '../demoController/types/Steps'
import {HELP_MESSAGES} from '../demoController/types/HelpMessages'

export interface IHelpMessageModal {
    id: HELP_MESSAGES,
    onClose: () => any
}

export interface IState {
    step: STEPS,
    helpMessage: IHelpMessageModal | null,
    orders: IOrder[]
}

export const DEFAULT_STATE: IState = {
    step: STEPS.DEMO_NOT_STARTED,
    helpMessage: null,
    orders: []
}

export const INITIAL_STATE: IState = _.assign({}, DEFAULT_STATE) // TODO: add stuff from Storage