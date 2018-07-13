import * as _ from 'lodash'




export interface IDemoState {
    demoId: number,
    onError: () => any,
}



export const DEFAULT_STATE: IDemoState = {
    demoId: 0,
    onError: () => {return null},
}

export const INITIAL_STATE: IDemoState = _.assign({}, DEFAULT_STATE, {

})
