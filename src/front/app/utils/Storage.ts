import * as _ from 'lodash'

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

    static clearAll() {
        _.forEach(_.keys(window.sessionStorage), key => {
            if (key.indexOf(STORAGE_PREFIX) === 0) {
                Storage._clearObjectFromSessionStorage(key)
            }
        })
    }
}

export default Storage