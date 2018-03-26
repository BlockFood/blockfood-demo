import * as _ from 'lodash'

export interface IRestaurant {
    id: string,
    name: string
}

export const RESTAURANTS: IRestaurant[] = [
    {
        id: 'fda8f9396d91',
        name: 'Wokbar'
    },
    {
        id: '5c84bfe0',
        name: 'Los Pollos Hermanos'
    },
    {
        id: '311811e8a8eb',
        name: 'PastaFiesta'
    }
]

export const RESTAURANTS_BY_IDS = _.keyBy(RESTAURANTS, ({id}) => id)