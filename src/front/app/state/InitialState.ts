import * as _ from 'lodash'
import {IOrder, IOrderInProgress} from '../../../lib/Orders'
import {STEPS} from '../demoController/types/Steps'
import {HELP_MESSAGES} from '../demoController/types/HelpMessages'
import MapData from '../components/map/MapData.js'
import Storage from '../utils/Storage'
import {distance} from '../components/map/utils/Geometry.js'

export interface IHelpMessageModal {
    id: HELP_MESSAGES,
    onClose: () => any
}

export interface IState {
    step: STEPS,
    helpMessage: IHelpMessageModal | null,
    isMobile: boolean,
    orders: IOrder[],
    customerLocation: string,
    customerOrderInProgress: IOrderInProgress | null,
    customerPosition: [number, number] | null,
    courierPosition: [number, number] | null,
}

const randomPositions = _.shuffle(_.map(_.values(MapData.graph), ({position}) => position))
const validPositions = _.filter(randomPositions, ([x, y]) => x > 50 && x < 750 && y > 50 && y < 500)
const position1 = validPositions[0]
let i = 1, position2 = validPositions[i]
while (distance(position1, position2) < 100 && i < validPositions.length - 1) {
    position2 = validPositions[++i]
}

export const DEFAULT_STATE: IState = {
    step: STEPS.DEMO_NOT_STARTED,
    helpMessage: null,
    isMobile: false,
    orders: [],
    customerLocation: '',
    customerOrderInProgress: null,
    customerPosition: position1,
    courierPosition: position2,
}

export const INITIAL_STATE: IState = _.assign({}, DEFAULT_STATE, {
    isMobile: Storage.getIsMobile() || DEFAULT_STATE.isMobile,
    customerLocation: Storage.getCustomerLocation() || DEFAULT_STATE.customerLocation,
    customerOrderInProgress: Storage.getCustomerOrderInProgress() || DEFAULT_STATE.customerOrderInProgress,
    customerPosition: Storage.getCustomerPosition() || DEFAULT_STATE.customerPosition,
    courierPosition: Storage.getCourierPosition() || DEFAULT_STATE.courierPosition
})