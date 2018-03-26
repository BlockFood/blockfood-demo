import * as _ from 'lodash'
import {matchPath} from 'react-router-dom'
import Api from '../api/Api'

export const HOME = '/'

export const CUSTOMER_VIEW = 'customer-view'
export const RESTAURANT_VIEW = 'restaurant-view'
export const COURIER_VIEW = 'courier-view'

export const ALL_VIEWS = [CUSTOMER_VIEW, RESTAURANT_VIEW, COURIER_VIEW]

export const CUSTOMER_EXAMPLE_ROUTE = `/:demoId/${CUSTOMER_VIEW}/`
export const RESTAURANT_EXAMPLE_ROUTE = `/:demoId/${RESTAURANT_VIEW}/`
export const COURIER_EXAMPLE_ROUTE = `/:demoId/${COURIER_VIEW}/`

const CUSTOMER_ROUTES_LIST = [
    CUSTOMER_EXAMPLE_ROUTE
]

const ALL_ROUTES = [
    CUSTOMER_EXAMPLE_ROUTE,
    RESTAURANT_EXAMPLE_ROUTE,
    COURIER_EXAMPLE_ROUTE
]

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

export const getDefaultRouteCustomer = () => {
 return getRouteCustomerExample()
}

export const getDefaultRouteRestaurant = () => {
    return getRouteRestaurantExample()
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