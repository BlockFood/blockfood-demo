export enum ORDER_STATUS {
    SUBMITTED = 'SUBMITTED',
    ACCEPTED = 'ACCEPTED',
    READY = 'READY',
    PICKING = 'PICKING',
    DELIVERING = 'DELIVERING',
    DONE = 'DONE'
}

export interface IOrderDetail {
    menuItemId: string,
    quantity: number
}

export interface IOrder {
    id: string,
    status: ORDER_STATUS,
    restaurantId: string,
    customerPosition: [number, number],
    orderTime?: Date,
    comment?: string,
    details: IOrderDetail[]
}

export interface IOrderInProgress {
    restaurantId: string,
    details: IOrderDetail[]
}
