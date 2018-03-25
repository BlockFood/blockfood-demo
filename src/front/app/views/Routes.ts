import Api from '../api/Api'

export const CUSTOMER_PREFIX = 'customer-view'
export const RESTAURANT_PREFIX = 'restaurant-view'
export const COURIER_PREFIX = 'courier-view'

export const CUSTOMER_EXAMPLE_ROUTE = `/:demoId/${CUSTOMER_PREFIX}/`
export const RESTAURANT_EXAMPLE_ROUTE = `/:demoId/${RESTAURANT_PREFIX}/`
export const COURIER_EXAMPLE_ROUTE = `/:demoId/${COURIER_PREFIX}/`

const getRouteWithDemoId = (route: string): string => {
    return route.replace(':demoId', Api.getDemoId())
}

export const getRouteCustomerExample = (): string => {
    return getRouteWithDemoId(CUSTOMER_EXAMPLE_ROUTE)
}

export const getRouteRestaurantExample = (): string => {
    return getRouteWithDemoId(RESTAURANT_EXAMPLE_ROUTE)
}

export const getRouteCourierExample = (): string => {
    return getRouteWithDemoId(COURIER_EXAMPLE_ROUTE)
}