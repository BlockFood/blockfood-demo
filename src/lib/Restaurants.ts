import * as _ from 'lodash'

export interface IMenuItem {
    id: string,
    name: string,
    price_eth: number,
    category: string
}

export enum RESTAURANT_TYPES {
    ALL_DAY_BREAKFAST = "All Day Breakfast",
    AMERICAN = "American",
    ASIAN = "Asian",
    BAKERY = "Bakery",
    BRITISH = "British",
    BURGER = "Burger",
    CARIBBEAN = "Caribbean",
    CHINESE = "Chinese",
    COMFORT_FOOD = "Comfort Food",
    CUBAN = "Cuban",
    DESSERTS = "Desserts",
    FAST_FOOD = "Fast Food",
    HEALTHY = "Healthy",
    ICE_CREAM_AND_FROZEN_YOGHURT = "Ice cream and frozen yoghurt",
    ITALIAN = "Italian",
    JUICE_AND_SMOOTHIES = "Juice and smoothies",
    LEBANESE = "Lebanese",
    MEDITERRANEAN = "Mediterranean",
    MIDDLE_EASTERN = "Middle Eastern",
    MODERN_EUROPEAN = "Modern European",
    PASTRY = "Pastry",
    PIZZA = "Pizza",
    SALAD = "Salad",
    SANDWICH = "Sandwich",
    SANDWICHES = "Sandwiches",
    SEAFOOD = "Seafood",
    SPANISH = "Spanish",
    STREET_FOOD = "Street Food",
    TURKISH = "Turkish",
    WINGS = "Wings",
    MOST_POPULAR = "Most Popular"
}

export interface IRestaurant {
    id: string,
    name: string,
    category: RESTAURANT_TYPES,
    rate: number,
    menuItems: IMenuItem[],
    image: string,
    map: {
        position: [number, number],
        labelDirection: string
    }
}

export const MENU_CATEGORIES = {
    FOOD: 'FOOD',
    DRINK: 'DRINK',
    DESSERT: 'DESSERT',
}

export const RESTAURANTS: IRestaurant[] = [
    {
        "id": "sdf454azad",
        "name": "Maroush",
        "category": RESTAURANT_TYPES.FAST_FOOD,
        "rate": 4.4,
        "menuItems": [
            {
                "id": "Moutabal_Baba_Ghanouj",
                "name": "Moutabal Baba Ghanouj",
                "price_eth": 12,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "Hommos",
                "name": "hommos",
                "price_eth": 15,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "Kibbeh",
                "name": "Kibbeh",
                "price_eth": 30,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "Shawarma Lamb",
                "name": "Shawarma_Lamb",
                "price_eth": 6.5,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "coca",
                "name": "Coca-Cola",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DRINK
            },
            {
                "id": "sparkling_water",
                "name": "Sparkling water",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DRINK
            },
            {
                "id": "cookie",
                "name": "cookie",
                "price_eth": 5,
                "category": MENU_CATEGORIES.DESSERT
            },
            {
                "id": "ice_cream",
                "name": "ice cream",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DESSERT
            }
        ],
        "image": "https://f.roocdn.com/images/menus/24538/header-image.jpg",
        "map": {
            "position": [140, 106],
            "labelDirection": 'bottom'
        }
    }, {
        "id": "a77x84gf1b",
        "name": "Wok To Walk",
        "rate": 3.7,
        "category": RESTAURANT_TYPES.ASIAN,
        "menuItems": [
            {
                "id": "Egg_Noodles",
                "name": "Egg Noodles",
                "price_eth": 30,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "Veggie_Dish",
                "name": "The Veggie Dish",
                "price_eth": 40,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "Meat_Noodles",
                "name": "Meat Noodles",
                "price_eth": 50,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "Chicken_Noodles",
                "name": "Chicken Noodles",
                "price_eth": 50,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "Coca_Cola",
                "name": "Coca-Cola",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DRINK
            },
            {
                "id": "Sparkling_water",
                "name": "Sparkling water",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DRINK
            }
        ],
        "image": "https://f.roocdn.com/images/menus/16532/header-image.jpg",
        "map": {
            "position": [302, 95],
            "labelDirection": 'bottom'
        }
    }, {
        "id": "wcwr54dry",
        "name": "Basilic & Co",
        "category": RESTAURANT_TYPES.SALAD,
        "rate": 4.5,
        "menuItems": [
            {
                "name": "Basilic 1",
                "id": "Basilic_1",
                "price_eth": 30,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "Basilic_2",
                "name": "Basilic 2",
                "price_eth": 40,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "Basilic_3",
                "name": "Basilic 3",
                "price_eth": 50,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "Coca_Cola",
                "name": "Coca-Cola",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DRINK
            },
            {
                "id": "Sparkling_water",
                "name": "Sparkling water",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DRINK
            }, {
                "id": "cookie",
                "name": "cookie",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DESSERT
            }
        ],
        "image": "https://ow.roocdn.com/assets/images/campaign-landing-pages/thumbs/vegetarian-fa4b679813cfac9cdeebe704f4a3e07c.jpg",
        "map": {
            "position": [395, 277],
            "labelDirection": 'top'
        }
    }, {
        "id": "sdfsdfsxv45tyhh",
        "name": "Sushi Shop",
        "category": RESTAURANT_TYPES.ASIAN,
        "rate": 5,
        "menuItems": [
            {
                "id": "California_dream",
                "name": "California dream",
                "price_eth": 30,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "super_salmon",
                "name": "super Salmon",
                "price_eth": 40,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "Salmon_lovers",
                "name": "Salmon lovers",
                "price_eth": 50,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "Seven_Up",
                "name": "Seven-Up",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DRINK
            },
            {
                "id": "cookie",
                "name": "cookie",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DESSERT
            },
            {
                "id": "ice_cream",
                "name": "ice cream",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DESSERT
            }
        ],
        "image": "https://duyt4h9nfnj50.cloudfront.net/resized/39eea2f47cdd7dc388ca42dfe71b21dd-w750-bc.jpg",
        "map": {
            "position": [110, 345],
            "labelDirection": 'bottom'
        }
    },
    {
        "id": "874ezar4cf1",
        "name": "Cumin World",
        "category": RESTAURANT_TYPES.FAST_FOOD,
        "rate": 3.8,
        "menuItems": [
            {
                "id": "box1",
                "name": "box 1",
                "price_eth": 30,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "coca",
                "name": "Coca-Cola",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DRINK
            },
            {
                "id": "sparkling_water",
                "name": "Sparkling water",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DRINK
            },
            {
                "id": "cookie",
                "name": "cookie",
                "price_eth": 5,
                "category": MENU_CATEGORIES.DESSERT
            },
            {
                "id": "ice_cream",
                "name": "ice cream",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DESSERT
            }
        ],
        "image": "https://duyt4h9nfnj50.cloudfront.net/resized/02210e1d2c6fdec88b7ee40604c4da46-w750-bd.jpg",
        "map": {
            "position": [628, 400],
            "labelDirection": 'bottom'
        }
    }, {
        "id": "qdf4t4y88uuuuu",
        "name": "Pizz'",
        "category": RESTAURANT_TYPES.PIZZA,
        "rate": 4.1,
        "menuItems": [
            {
                "id": "pizza_Napolitain",
                "name": "pizza Napolitain",
                "price_eth": 30,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "pizza Vegie",
                "name": "pizza_Vegie",
                "price_eth": 40,
                "category": MENU_CATEGORIES.FOOD
            },
            {
                "id": "Coca_Cola",
                "name": "Coca-Cola",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DRINK
            },
            {
                "id": "Sparkling_water",
                "name": "Sparkling water",
                "price_eth": 10,
                "category": MENU_CATEGORIES.DRINK
            }
        ],
        "image": "https://duyt4h9nfnj50.cloudfront.net/resized/6c30305e0d24fcc3c68975303ec481c5-w750-f1.jpg",
        "map": {
            "position": [550, 165],
            "labelDirection": 'top'
        }
    }
]

export const TOTAL_RESTAURANT_STAR = 5

export const EMPTY_RESTAURANT_TYPES = _.filter(RESTAURANT_TYPES, type => !_.find(RESTAURANTS, restaurant => restaurant.category === type))
export const RESTAURANTS_BY_IDS = _.keyBy(RESTAURANTS, ({id}) => id)
export const MENU_ITEMS_BY_IDS = _.mapValues(RESTAURANTS_BY_IDS, (restaurant) => _.keyBy(restaurant.menuItems, ({id}) => id))