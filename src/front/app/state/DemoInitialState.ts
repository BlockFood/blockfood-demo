import * as _ from 'lodash'




export interface IDemoState {
    demoId: string,
    onError: () => any,
}



export const DEFAULT_STATE: IDemoState = {
    demoId: '',
    onError: () => {return null},
}

export const INITIAL_STATE: IDemoState = _.assign({}, DEFAULT_STATE, {

})
