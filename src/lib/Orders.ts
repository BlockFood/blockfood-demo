export enum ORDER_STATUS {
    SUBMITTED = 'SUBMITTED',
    ACCEPTED = 'ACCEPTED',
    READY = 'READY',
    PICKING = 'PICKING',
    DELIVERING = 'DELIVERING',
    DONE = 'DONE'
}

export interface IOrderedItem {
    label: string
    count: number
    totalItemPrice?: number
}

export interface IOrderDetails {
    orderTime?: Date
    orderedItems?: IOrderedItem[]
    comment?: string
}

export interface IOrder {
    id: string,
    status: ORDER_STATUS,
    restaurantId: string,
    details: IOrderDetails
}
