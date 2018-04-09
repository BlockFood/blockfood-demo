import * as _ from 'lodash'

export interface IMenu {
    id: string
    name: string,
    price_eth: number,
    price_euro: number,
    category: string
    description?: string
}

export interface IRestaurant {
    id: string
    name: string
    category: string
    star: number
    preparationTime: string
    menu: IMenu[]
    image: string
}

export const RESTAURANTS: IRestaurant[] = [
    {
        "id": "Maroush",
        "name": "Maroush (Beauchamp place)",
        "category": "fast food",
        "star": 4.4,
        "preparationTime": "10-20 min",
        "menu": [
            {
                "id": "Moutabal_Baba_Ghanouj",
                "name": "Moutabal Baba Ghanouj",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 12,
                "price_euro": 6,
                "category": "food"
            },
            {
                "id": "Hommos",
                "name": "hommos",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 15,
                "price_euro": 6.25,
                "category": "food"
            },
            {
                "id": "Kibbeh",
                "name": "Kibbeh",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "Shawarma Lamb",
                "name": "Shawarma_Lamb",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 6.5,
                "price_euro": 12,
                "category": "food"
            },
            {
                "id": "coca",
                "name": "Coca-Cola",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "sparkling_water",
                "name": "Sparkling water",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "cookie",
                "name": "cookie",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 5,
                "price_euro":2,
                "category": "dessert"
            },
            {
                "id": "ice_cream",
                "name": "ice cream",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            }
        ],
        "image" : "https://f.roocdn.com/images/menus/24538/header-image.jpg"
    },{
        "id": "Wok_To_Walk",
        "name": "Wok To Walk (Great Windmill St.)",
        "star": 3.7,
        "category": "Asian Fusion",
        "preparationTime": "5-10 min",
        "menu": [
            {
                "id": "Egg_Noodles",
                "name": "Egg Noodles",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "Veggie_Dish",
                "name": "The Veggie Dish",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 40,
                "price_euro": 20,
                "category": "food"
            },
            {
                "id": "Meat_Noodles",
                "name": "Meat Noodles",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 50,
                "price_euro": 25,
                "category": "food"
            },
            {
                "id": "Chicken_Noodles",
                "name": "Chicken Noodles",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 50,
                "price_euro": 25,
                "category": "food"
            },
            {
                "id": "Coca_Cola",
                "name": "Coca-Cola",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "Sparkling_water",
                "name": "Sparkling water",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            }
        ],
        "image" : "https://f.roocdn.com/images/menus/16532/header-image.jpg"
    },{
        "id": "Basilic_and_bas",
        "name": "Basilic and bas",
        "category": "pizza",
        "star": 4.5,
        "preparationTime": "20-30 min",
        "menu": [
            {
                "name": "Basilic 1",
                "id": "Basilic_1",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "Basilic_2",
                "name": "Basilic 2",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 40,
                "price_euro": 20,
                "category": "food"
            },
            {
                "id": "Basilic_3",
                "name": "Basilic 3",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 50,
                "price_euro": 25,
                "category": "food"
            },
            {
                "id": "Coca_Cola",
                "name": "Coca-Cola",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "Sparkling_water",
                "name": "Sparkling water",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            }, {
                "id": "cookie",
                "name": "cookie",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            }
        ],
        "image" : "https://ow.roocdn.com/assets/images/campaign-landing-pages/thumbs/vegetarian-fa4b679813cfac9cdeebe704f4a3e07c.jpg"
    },{
        "id": "Sushi_shop",
        "name": "Sushi shop",
        "category": "Japanese food",
        "star": 5,
        "preparationTime": "5-10 min",
        "menu": [
            {
                "id": "California_dream",
                "name": "California dream",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "super_salmon",
                "name": "super Salmon",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 40,
                "price_euro": 20,
                "category": "food"
            },
            {
                "id": "Salmon_lovers",
                "name": "Salmon lovers",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 50,
                "price_euro": 25,
                "category": "food"
            },
            {
                "id": "Seven_Up",
                "name": "Seven-Up",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "cookie",
                "name": "cookie",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            },
            {
                "id": "ice_cream",
                "name": "ice cream",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            }
        ],
        "image" : "https://duyt4h9nfnj50.cloudfront.net/resized/39eea2f47cdd7dc388ca42dfe71b21dd-w750-bc.jpg"
    },
    {
        "id": "Cumin_Chantilly",
        "name": "Cumin & Chantilly",
        "category": "fast food",
        "star": 3.8,
        "preparationTime": "10-20 min",
        "menu": [
            {
                "id": "box1",
                "name": "box 1",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "coca",
                "name": "Coca-Cola",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "sparkling_water",
                "name": "Sparkling water",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "cookie",
                "name": "cookie",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 5,
                "price_euro":2,
                "category": "dessert"
            },
            {
                "id": "ice_cream",
                "name": "ice cream",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            }
        ],
        "image" : "https://duyt4h9nfnj50.cloudfront.net/resized/02210e1d2c6fdec88b7ee40604c4da46-w750-bd.jpg"
    },{
        "id": "pizzaria",
        "name": "pizzaria",
        "category": "pizza",
        "star": 4.1,
        "preparationTime": "5-10 min",
        "menu": [
            {
                "id": "pizza_Napolitain",
                "name": "pizza Napolitain",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "pizza Vegie",
                "name": "pizza_Vegie",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 40,
                "price_euro": 20,
                "category": "food"
            },
            {
                "id": "Coca_Cola",
                "name": "Coca-Cola",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "Sparkling_water",
                "name": "Sparkling water",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            }
        ],
        "image" : "https://duyt4h9nfnj50.cloudfront.net/resized/6c30305e0d24fcc3c68975303ec481c5-w750-f1.jpg"
    },{
        "id": "Basilic_and_bas",
        "name": "Basilic and bas",
        "category": "pizza",
        "star": 4,
        "preparationTime": "20-30 min",
        "menu": [
            {
                "id": "Basilic_1",
                "name": "Basilic 1",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "Basilic_2",
                "name": "Basilic 2",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 40,
                "price_euro": 20,
                "category": "food"
            },
            {
                "id": "Basilic_3",
                "name": "Basilic 3",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 50,
                "price_euro": 25,
                "category": "food"
            },
            {
                "id": "Coca_Cola",
                "name": "Coca-Cola",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "Sparkling_water",
                "name": "Sparkling water",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            }, {
                "id": "cookie",
                "name": "cookie",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            }
        ],
        "image" : "https://duyt4h9nfnj50.cloudfront.net/resized/35fab2618f9ac02427df8488b463fc83-w750-2b.jpg"
    },{
        "id": "Sushi_shop",
        "name": "Sushi shop",
        "category": "Japanese food",
        "star": 5,
        "preparationTime": "5-10 min",
        "menu": [
            {
                "id": "California_dream",
                "name": "California dream",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "super_salmon",
                "name": "super Salmon",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 40,
                "price_euro": 20,
                "category": "food"
            },
            {
                "name": "Salmon lovers",
                "id": "Salmon_lovers",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 50,
                "price_euro": 25,
                "category": "food"
            },
            {
                "id": "Seven_Up",
                "name": "Seven-Up",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "cookie",
                "name": "cookie",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            },
            {
                "id": "ice_cream",
                "name": "ice cream",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            }
        ],
        "image" : "https://duyt4h9nfnj50.cloudfront.net/resized/39eea2f47cdd7dc388ca42dfe71b21dd-w750-bc.jpg"
    },
    {
        "id": "Cumin_Chantilly",
        "name": "Cumin & Chantilly",
        "category": "fast food",
        "star": 3.6,
        "preparationTime": "10-20 min",
        "menu": [
            {
                "id": "box1",
                "name": "box 1",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "coca",
                "name": "Coca-Cola",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "sparkling_water",
                "name": "Sparkling water",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "cookie",
                "name": "cookie",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 5,
                "price_euro":2,
                "category": "dessert"
            },
            {
                "id": "ice_cream",
                "name": "ice cream",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            }
        ],
        "image" : "https://duyt4h9nfnj50.cloudfront.net/resized/02210e1d2c6fdec88b7ee40604c4da46-w750-bd.jpg"
    },{
        "id": "pizzaria",
        "name": "pizzaria",
        "category": "pizza",
        "star": 4.2,
        "preparationTime": "5-10 min",
        "menu": [
            {
                "id": "pizza_Napolitain",
                "name": "pizza Napolitain",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "pizza Vegie",
                "name": "pizza_Vegie",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 40,
                "price_euro": 20,
                "category": "food"
            },
            {
                "id": "Coca_Cola",
                "name": "Coca-Cola",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "Sparkling_water",
                "name": "Sparkling water",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            }
        ],
        "image" : "https://duyt4h9nfnj50.cloudfront.net/resized/6c30305e0d24fcc3c68975303ec481c5-w750-f1.jpg"
    },{
        "id": "Basilic_and_bas",
        "name": "Basilic and bas",
        "category": "pizza",
        "star": 5,
        "preparationTime": "20-30 min",
        "menu": [
            {
                "id": "Basilic_1",
                "name": "Basilic 1",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "Basilic_2",
                "name": "Basilic 2",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 40,
                "price_euro": 20,
                "category": "food"
            },
            {
                "id": "Basilic_3",
                "name": "Basilic 3",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 50,
                "price_euro": 25,
                "category": "food"
            },
            {
                "id": "Coca_Cola",
                "name": "Coca-Cola",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "Sparkling_water",
                "name": "Sparkling water",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            }, {
                "id": "cookie",
                "name": "cookie",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            }
        ],
        "image" : "https://duyt4h9nfnj50.cloudfront.net/resized/35fab2618f9ac02427df8488b463fc83-w750-2b.jpg"
    },{
        "id": "Sushi_shop",
        "name": "Sushi shop",
        "category": "Japanese food",
        "star": 4.6,
        "preparationTime": "5-10 min",
        "menu": [
            {
                "id": "California_dream",
                "name": "California dream",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 30,
                "price_euro": 15,
                "category": "food"
            },
            {
                "id": "super_salmon",
                "name": "super Salmon",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 40,
                "price_euro": 20,
                "category": "food"
            },
            {
                "id": "Salmon_lovers",
                "name": "Salmon lovers",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 50,
                "price_euro": 25,
                "category": "food"
            },
            {
                "id": "Seven_Up",
                "name": "Seven-Up",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "drink"
            },
            {
                "id": "cookie",
                "name": "cookie",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            },
            {
                "id": "ice_cream",
                "name": "ice cream",
                "description": "Combine asparagus, goat's cheese, new potatoes, peas and lettuce to make this easy springtime vegetarian dish. Great for a midweek meal",
                "price_eth": 10,
                "price_euro": 5,
                "category": "dessert"
            }
        ],
        "image" : "https://duyt4h9nfnj50.cloudfront.net/resized/39eea2f47cdd7dc388ca42dfe71b21dd-w750-bc.jpg"
    }
]

export const RESTAURANTS_BY_IDS = _.keyBy(RESTAURANTS, ({id}) => id)