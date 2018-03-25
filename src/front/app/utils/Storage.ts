import * as _ from 'lodash'
import {IOrderDetails} from '../../../lib/Orders'

const STORAGE_PREFIX = 'bf-demo-'

class Storage {
    static _clearObjectFromSessionStorage(key: string) {
        try {
            window.sessionStorage.removeItem(STORAGE_PREFIX + key)
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

    static setCurrentAddress(currentAddress: string) {
        Storage._writeObjectToSessionStorage('current-address', currentAddress)
    }

    static getCurrentAddress(): string {
        return Storage._readObjectFromSessionStorage('current-address')
    }

    static setOrderInProgress(orderInProgress: IOrderDetails) {
        Storage._writeObjectToSessionStorage('order-in-progress', orderInProgress)
    }

    static getOrderInProgress(): any {
        return Storage._readObjectFromSessionStorage('order-in-progress')
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