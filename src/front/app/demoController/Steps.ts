export const enum STEPS {
    DEMO_NOT_STARTED = -1,
    CUSTOMER_SET_ADDRESS = 0,
    CUSTOMER_CHOOSE_RESTAURANT = 1,
    CUSTOMER_CREATE_ORDER = 2,
    CUSTOMER_DO_PAYMENT = 3,
    RESTAURANT_ACCEPT_ORDER = 4,
    RESTAURANT_NOTIFY_ORDER_READY = 5,
    COURIER_ACCEPT_ORDER = 6,
    COURIER_NOTIFY_ORDER_PICKED = 7,
    COURIER_NOTIFY_ORDER_DELIVERED = 8,
    FREE_MODE = 9
}

export const FIRST_STEP_WITH_AN_ORDER = STEPS.RESTAURANT_ACCEPT_ORDER

export const getStepLabel = (step: STEPS) => {
    return {
        [STEPS.DEMO_NOT_STARTED]: 'As a customer, choose a sector by typing an address.',
        [STEPS.CUSTOMER_SET_ADDRESS]: 'As a customer, choose a restaurant.',
        [STEPS.CUSTOMER_CHOOSE_RESTAURANT]: 'As a customer, choose your order in the selected restaurant and then, validate your order.',
        [STEPS.CUSTOMER_CREATE_ORDER]: 'As a customer, proceed to the payment of your order.',
        [STEPS.CUSTOMER_DO_PAYMENT]: 'As a restaurant, select a waiting order and accept it.',
        [STEPS.RESTAURANT_ACCEPT_ORDER]: 'As a restaurant, notify that the order is now ready to be delivered.',
        [STEPS.RESTAURANT_NOTIFY_ORDER_READY]: 'As a courier, select a waiting order and accept it.',
        [STEPS.COURIER_ACCEPT_ORDER]: 'As a courier, notify that the order is now picked and on its way to be delivered.',
        [STEPS.COURIER_NOTIFY_ORDER_PICKED]: 'As a courier, notify that the order is now delivered.',
        [STEPS.COURIER_NOTIFY_ORDER_DELIVERED]: 'As a customer, a restaurant or a courier, keep do whatever you want!'
    }[step] || null
}