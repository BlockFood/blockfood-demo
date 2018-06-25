import * as _ from 'lodash'




export interface IDemoState {
    demoId: string
}



export const DEFAULT_STATE: IDemoState = {
    demoId: ''
}

export const INITIAL_STATE: IDemoState = _.assign({}, DEFAULT_STATE, {

})
