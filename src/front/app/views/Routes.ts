import * as _ from 'lodash'
import {matchPath} from 'react-router-dom'
import Api from '../api/Api'

export const HOME = '/'

export const CUSTOMER_VIEW = 'customer-view'
export const RESTAURANT_VIEW = 'restaurant-view'
export const COURIER_VIEW = 'courier-view'

export const ALL_VIEWS = [CUSTOMER_VIEW, RESTAURANT_VIEW, COURIER_VIEW]

export const CUSTOMER_LOCATION_ROUTE = `/:demoId/${CUSTOMER_VIEW}/`
export const CUSTOMER_EXAMPLE_ROUTE = `/:demoId/${CUSTOMER_VIEW}/example/`
export const RESTAURANT_EXAMPLE_ROUTE = `/:demoId/${RESTAURANT_VIEW}/:restaurantId/`
export const COURIER_EXAMPLE_ROUTE = `/:demoId/${COURIER_VIEW}/`

const CUSTOMER_ROUTES_LIST = [
    CUSTOMER_LOCATION_ROUTE,
    CUSTOMER_EXAMPLE_ROUTE
]

const RESTAURANT_ROUTES_LIST = [
    RESTAURANT_EXAMPLE_ROUTE
]

const ALL_ROUTES = [
    CUSTOMER_EXAMPLE_ROUTE,
    RESTAURANT_EXAMPLE_ROUTE,
    COURIER_EXAMPLE_ROUTE
]

const getRouteWithDemoId = (route: string): string => {
    return route.replace(':demoId', Api.getDemoId())
}

export const getRouteLocationExample = (): string => {
    return getRouteWithDemoId(CUSTOMER_LOCATION_ROUTE)
}

export const getRouteCustomerExample = (): string => {
    return getRouteWithDemoId(CUSTOMER_EXAMPLE_ROUTE)
}

export const getRouteRestaurantExample = (restaurantId: string): string => {
    return getRouteWithDemoId(RESTAURANT_EXAMPLE_ROUTE).replace(':restaurantId', restaurantId)
}

export const getRouteCourierExample = (): string => {
    return getRouteWithDemoId(COURIER_EXAMPLE_ROUTE)
}

export const getDefaultRouteCustomer = () => {
 return getRouteLocationExample()
}

export const getDefaultRouteRestaurant = (restaurantId: string) => {
    return getRouteRestaurantExample(restaurantId)
}

export const getDefaultRouteCourier = () => {
    return getRouteCourierExample()
}

export const getViewFromPathname = (pathname: string): string | null => {
    return _.find(ALL_VIEWS, route => pathname.indexOf(route) !== -1) || null
}

export const getCustomerRouteIndex = (pathname: string) => {
    return _.findIndex(CUSTOMER_ROUTES_LIST, path => matchPath(pathname, {path, exact: true}))
}

export const getCurrentRoute = (pathname: string) => {
    return _.find(ALL_ROUTES, path => matchPath(pathname, {path, exact: true}))
}

export const getRestaurantIdFromPathname = (pathname: string): string => {
    const currentRestaurantRoute = _.find(RESTAURANT_ROUTES_LIST, path => matchPath(pathname, {path, exact: true}))
    return (matchPath(pathname, {path: currentRestaurantRoute, exact: true}) as any).params.restaurantId
}