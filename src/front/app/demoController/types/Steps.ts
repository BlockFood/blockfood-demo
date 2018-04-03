export const enum STEPS {
    DEMO_NOT_STARTED = -1,
    CUSTOMER_SET_ADDRESS = 0,
    CUSTOMER_CHOOSE_RESTAURANT = 1,
    CUSTOMER_CREATE_ORDER = 2,
    CUSTOMER_SET_POSITION = 3,
    CUSTOMER_DO_PAYMENT = 4,
    RESTAURANT_ACCEPT_ORDER = 5,
    RESTAURANT_NOTIFY_ORDER_READY = 6,
    COURIER_ACCEPT_ORDER = 7,
    COURIER_NOTIFY_ORDER_PICKED = 8,
    COURIER_NOTIFY_ORDER_DELIVERED = 9,
    FREE_MODE = 10
}

export const FIRST_STEP_WITH_AN_ORDER = STEPS.RESTAURANT_ACCEPT_ORDER

export const getStepLabel = (step: STEPS) => {
    return {
        [STEPS.CUSTOMER_SET_ADDRESS]: 'As a customer, choose a sector by typing an address.',
        [STEPS.CUSTOMER_CHOOSE_RESTAURANT]: 'As a customer, choose a restaurant.',
        [STEPS.CUSTOMER_CREATE_ORDER]: 'As a customer, choose your order in the selected restaurant and then, validate your order.',
        [STEPS.CUSTOMER_SET_POSITION]: 'As a customer, indicate your exact position on the map.',
        [STEPS.CUSTOMER_DO_PAYMENT]: 'As a customer, proceed to the payment of your order.',
        [STEPS.RESTAURANT_ACCEPT_ORDER]: 'As a restaurant, select a waiting order and accept it.',
        [STEPS.RESTAURANT_NOTIFY_ORDER_READY]: 'As a restaurant, notify that the order is now ready to be delivered.',
        [STEPS.COURIER_ACCEPT_ORDER]: 'As a courier, select a waiting order and accept it.',
        [STEPS.COURIER_NOTIFY_ORDER_PICKED]: 'As a courier, notify that the order is now picked and on its way to be delivered.',
        [STEPS.COURIER_NOTIFY_ORDER_DELIVERED]: 'As a courier, notify that the order is now delivered.'
    }[step] || null
}