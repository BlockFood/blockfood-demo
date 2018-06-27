import * as _ from 'lodash'




export interface IDemoState {
    demoId: string,
    onError: () => any,
    fetching: boolean
}



export const DEFAULT_STATE: IDemoState = {
    demoId: '',
    onError: () => {return null},
    fetching: false;
}

export const INITIAL_STATE: IDemoState = _.assign({}, DEFAULT_STATE, {

})
