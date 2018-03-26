import * as _ from 'lodash'

export interface IRestaurant {
    id: string
}

export const RESTAURANTS: IRestaurant[] = [
    {
        id: 'fda8f9396d91'
    },
    {
        id: '5c84bfe0'
    },
    {
        id: '311811e8a8eb'
    }
]

export const RESTAURANTS_BY_IDS = _.keyBy(RESTAURANTS, ({id}) => id)