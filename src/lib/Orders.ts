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

export interface IOrderDetail {
    menuItemId: string,
    quantity: Number
}

export interface IOrder {
    id: string,
    status: ORDER_STATUS,
    restaurantId: string,
    customerPosition: [Number, Number],
    orderTime?: Date,
    comment?: string,
    details: IOrderDetail[]
}

export interface IOrderInProgress {
    restaurantId: string,
    details: IOrderDetail[]
}
