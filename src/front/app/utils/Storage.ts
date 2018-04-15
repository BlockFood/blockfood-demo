import * as _ from 'lodash'
import {IOrderInProgress} from '../../../lib/Orders'

const STORAGE_PREFIX = 'bf-demo-'

class Storage {
    static _clearObjectFromSessionStorage(key: string) {
        try {
            window.sessionStorage.removeItem(key)
        }
        catch (e) {}
    }

    static _readObjectFromSessionStorage(key: string) {
        try {
            const response = window.sessionStorage.getItem(STORAGE_PREFIX + key)
            return response ? JSON.parse(response) : undefined
        }
        catch (e) {
            return undefined
        }
    }

    static _writeObjectToSessionStorage(key: string, object: any) {
        try {
            window.sessionStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(object))
        }
        catch (e) {}
    }

    static setCustomerLocation(customerLocation: string) {
        Storage._writeObjectToSessionStorage('customer-location', customerLocation)
    }

    static getCustomerLocation(): string {
        return Storage._readObjectFromSessionStorage('customer-location')
    }

    static setCustomerOrderInProgress(customerOrderInProgress: IOrderInProgress) {
        Storage._writeObjectToSessionStorage('customer-order-in-progress', customerOrderInProgress)
    }

    static getCustomerOrderInProgress(): IOrderInProgress {
        return Storage._readObjectFromSessionStorage('customer-order-in-progress')
    }

    static setCustomerPosition(customerPosition: [Number, Number]) {
        Storage._writeObjectToSessionStorage('customer-position', customerPosition)
    }

    static getCustomerPosition(): [Number, Number] {
        return Storage._readObjectFromSessionStorage('customer-position')
    }

    static clearAll() {
        _.forEach(_.keys(window.sessionStorage), key => {
            if (key.indexOf(STORAGE_PREFIX) === 0) {
                Storage._clearObjectFromSessionStorage(key)
            }
        })
    }
}

export default Storage