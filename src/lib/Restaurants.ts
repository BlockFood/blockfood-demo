import * as _ from 'lodash'

export interface IMenu {
    id: string,
    name: string,
    price_eth: number,
    price_euro: number,
    category: string,
    description?: string
}

export interface IRestaurant {
    id: string,
    name: string,
    category: string,
    star: number,
    preparationTime: string,
    menu: IMenu[],
    image: string
}

export const RESTAURANT_TYPES = {
    ALL_DAY_BREAKFAST: "All Day Breakfast",
    AMERICAN: "American",
    ASIAN: "Asian",
    BAKERY: "Bakery",
    BRITISH: "British",
    BURGER: "Burger",
    CARIBBEAN: "Caribbean",
    CHINESE: "Chinese",
    COMFORT_FOOD: "Comfort Food",
    CUBAN: "Cuban",
    DESSERTS: "Desserts",
    FAST_FOOD: "Fast Food",
    HEALTHY: "Healthy",
    ICE_CREAM_AND_FROZEN_YOGHURT: "Ice cream and frozen yoghurt",
    ITALIAN: "Italian",
    JUICE_AND_SMOOTHIES: "Juice and smoothies",
    LEBANESE: "Lebanese",
    MEDITERRANEAN: "Mediterranean",
    MIDDLE_EASTERN: "Middle Eastern",
    MODERN_EUROPEAN: "Modern European",
    PASTRY: "Pastry",
    PIZZA: "Pizza",
    SALAD: "Salad",
    SANDWICH: "Sandwich",
    SANDWICHES: "Sandwiches",
    SEAFOOD: "Seafood",
    SPANISH: "Spanish",
    STREET_FOOD: "Street Food",
    TURKISH: "Turkish",
    WINGS: "Wings",
    MOST_POPULAR: "Most Popular"
}

export const RESTAURANTS: IRestaurant[] = [
    {
        "id": "sdf454azad",
        "name": "Maroush (Beauchamp place)",
        "category": RESTAURANT_TYPES.FAST_FOOD,
        "star": 4.4,
        "preparationTime": "10-20 min",
        "menu": [
            {
                "id": "Moutabal_Baba_Ghanouj",
                "name": "Moutabal Baba Ghanouj",
                "price_eth": 12,
                "price_euro": 6,
                "category": "food"
            },
            {
                "id": "Hommos",
                "name": "hommos",
                "price_eth": 15,
                "price_euro": 6.25,
                "category": "food"
            },
            {
                "id": "Kibbeh",
                "name": "Kibbeh",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "Shawarma Lamb",
                "name": "Shawarma_Lamb",
                "price_eth": 6.5,
                "price_euro": 12,
                "category": "food"
            },
            {
                "id": "coca",
                "name": "Coca-Cola",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "sparkling_water",
                "name": "Sparkling water",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "cookie",
                "name": "cookie",
                "price_eth": 5,
                "price_euro": 2,
                "category": "dessert"
            },
            {
                "id": "ice_cream",
                "name": "ice cream",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            }
        ],
        "image": "https://f.roocdn.com/images/menus/24538/header-image.jpg"
    }, {
        "id": "a77x84gf1b",
        "name": "Wok To Walk (Great Windmill St.)",
        "star": 3.7,
        "category": RESTAURANT_TYPES.ASIAN,
        "preparationTime": "5-10 min",
        "menu": [
            {
                "id": "Egg_Noodles",
                "name": "Egg Noodles",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "Veggie_Dish",
                "name": "The Veggie Dish",
                "price_eth": 40,
                "price_euro": 20,
                "category": "food"
            },
            {
                "id": "Meat_Noodles",
                "name": "Meat Noodles",
                "price_eth": 50,
                "price_euro": 25,
                "category": "food"
            },
            {
                "id": "Chicken_Noodles",
                "name": "Chicken Noodles",
                "price_eth": 50,
                "price_euro": 25,
                "category": "food"
            },
            {
                "id": "Coca_Cola",
                "name": "Coca-Cola",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "Sparkling_water",
                "name": "Sparkling water",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            }
        ],
        "image": "https://f.roocdn.com/images/menus/16532/header-image.jpg"
    }, {
        "id": "wcwr54dry",
        "name": "Basilic and bas",
        "category": RESTAURANT_TYPES.SALAD,
        "star": 4.5,
        "preparationTime": "20-30 min",
        "menu": [
            {
                "name": "Basilic 1",
                "id": "Basilic_1",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "Basilic_2",
                "name": "Basilic 2",
                "price_eth": 40,
                "price_euro": 20,
                "category": "food"
            },
            {
                "id": "Basilic_3",
                "name": "Basilic 3",
                "price_eth": 50,
                "price_euro": 25,
                "category": "food"
            },
            {
                "id": "Coca_Cola",
                "name": "Coca-Cola",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "Sparkling_water",
                "name": "Sparkling water",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            }, {
                "id": "cookie",
                "name": "cookie",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            }
        ],
        "image": "https://ow.roocdn.com/assets/images/campaign-landing-pages/thumbs/vegetarian-fa4b679813cfac9cdeebe704f4a3e07c.jpg"
    }, {
        "id": "sdfsdfsxv45tyhh",
        "name": "Sushi shop",
        "category": RESTAURANT_TYPES.ASIAN,
        "star": 5,
        "preparationTime": "5-10 min",
        "menu": [
            {
                "id": "California_dream",
                "name": "California dream",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "super_salmon",
                "name": "super Salmon",
                "price_eth": 40,
                "price_euro": 20,
                "category": "food"
            },
            {
                "id": "Salmon_lovers",
                "name": "Salmon lovers",
                "price_eth": 50,
                "price_euro": 25,
                "category": "food"
            },
            {
                "id": "Seven_Up",
                "name": "Seven-Up",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "cookie",
                "name": "cookie",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            },
            {
                "id": "ice_cream",
                "name": "ice cream",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            }
        ],
        "image": "https://duyt4h9nfnj50.cloudfront.net/resized/39eea2f47cdd7dc388ca42dfe71b21dd-w750-bc.jpg"
    },
    {
        "id": "874ezar4cf1",
        "name": "Cumin & Chantilly",
        "category": RESTAURANT_TYPES.FAST_FOOD,
        "star": 3.8,
        "preparationTime": "10-20 min",
        "menu": [
            {
                "id": "box1",
                "name": "box 1",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "coca",
                "name": "Coca-Cola",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "sparkling_water",
                "name": "Sparkling water",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "cookie",
                "name": "cookie",
                "price_eth": 5,
                "price_euro": 2,
                "category": "dessert"
            },
            {
                "id": "ice_cream",
                "name": "ice cream",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            }
        ],
        "image": "https://duyt4h9nfnj50.cloudfront.net/resized/02210e1d2c6fdec88b7ee40604c4da46-w750-bd.jpg"
    }, {
        "id": "qdf4t4y88uuuuu",
        "name": "pizzaria",
        "category": RESTAURANT_TYPES.PIZZA,
        "star": 4.1,
        "preparationTime": "5-10 min",
        "menu": [
            {
                "id": "pizza_Napolitain",
                "name": "pizza Napolitain",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "pizza Vegie",
                "name": "pizza_Vegie",
                "price_eth": 40,
                "price_euro": 20,
                "category": "food"
            },
            {
                "id": "Coca_Cola",
                "name": "Coca-Cola",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "Sparkling_water",
                "name": "Sparkling water",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            }
        ],
        "image": "https://duyt4h9nfnj50.cloudfront.net/resized/6c30305e0d24fcc3c68975303ec481c5-w750-f1.jpg"
    }
]

export const EMPTY_RESTAURANT_TYPES = _.filter(RESTAURANT_TYPES, type => !_.find(RESTAURANTS, restaurant => restaurant.category === type))
export const RESTAURANTS_BY_IDS = _.keyBy(RESTAURANTS, ({id}) => id)