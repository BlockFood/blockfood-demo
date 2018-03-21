export enum ORDER_STATUS {
    SUBMITTED = 'SUBMITTED',
    ACCEPTED = 'ACCEPTED',
    READY = 'READY',
    PICKING = 'PICKING',
    DELIVERING = 'DELIVERING',
    DONE = 'DONE'
}

export interface IOrderDetails {

}

export interface IOrder {
    id: string,
    status: ORDER_STATUS,
    restaurantId: string,
    details: IOrderDetails
}