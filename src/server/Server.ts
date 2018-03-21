import * as _ from 'lodash'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as uuid from 'uuid/v1'
import {IOrder, ORDER_STATUS} from '../lib/Orders'

const database: { [demoId: string]: IOrder[] } = {}

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/api/start-demo', (req, res) => {
    const demoId = uuid()

    database[demoId] = []

    res.send(demoId)
})

app.post('/api/:demoId/order', (req, res) => {
    const {demoId} = req.params

    const orders = database[demoId]

    if (!orders) {
        res.sendStatus(403)
    }
    else {
        const newOrder: IOrder = {
            id: uuid(),
            status: ORDER_STATUS.IN_PROGRESS
        }

        const newOrders = database[demoId] = [...orders, newOrder]

        res.send(newOrders)
    }
})

app.put('/api/:demoId/order/:orderId', (req, res) => {
    const {demoId, orderId} = req.params

    const {status} = req.body
    const isStatusValid = _.values(ORDER_STATUS).indexOf(status) !== -1

    const orders = database[demoId]

    if (!orders || !isStatusValid) {
        res.sendStatus(403)
    }
    else {
        let orderFound = false
        const newOrders = _.map(orders, order => {
            if (order.id === orderId) {
                orderFound = true
                return _.assign({}, order, {status})
            }
            else {
                return order
            }
        })

        if (!orderFound) {
            res.sendStatus(403)
        }
        else {
            database[demoId] = newOrders
            res.send(newOrders)
        }
    }
})

app.get('/api/:demoId/orders', (req, res) => {
    const {demoId} = req.params
    const orders = database[demoId]

    if (!orders || orders.length === 0) {
        res.sendStatus(403)
    }
    else {
        res.send(orders)
    }
})

app.listen(4242, () => console.log('Server listening on port 4242!'))