export enum ORDER_STATUS {
    IN_PROGRESS = 0,
    DONE = 1
}

export interface IOrder {
    id: string,
    status: ORDER_STATUS
}