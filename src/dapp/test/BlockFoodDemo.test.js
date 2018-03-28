const BlockFoodDemo = artifacts.require('./BlockFoodDemo.sol')
const _ = require('lodash')

const getBalance = (addr) => new Promise((resolve, reject) =>
    web3.eth.getBalance(addr, (err, result) => {
        if (err) {
            console.log('Failed to get balance', err)
            reject(err)
        } else {
            resolve(result)
        }
    })
)

const OrderStatus =
    { Unset: 0, Submitted: 1, Accepted: 2, Ready: 3, Picking: 4, Delivering: 5, Done: 6 }

const expectFailure = async (promise, errorMessage) => {
    let hasFailed
    try {
        await promise
        hasFailed = false
    } catch (e) {
        hasFailed = true
    }
    assert.equal(hasFailed, true, errorMessage)
}

contract('BlockFoodDemo', function (accounts) {
    const ownerAccount = accounts[2]
    const notOwnerAccount = accounts[1]

    it('should be deployed', async () => {
        const instance = await BlockFoodDemo.deployed()
    })

    const getNewInstance = async () => {
        return (await BlockFoodDemo.new(
            { from: ownerAccount }
        ))
    }

    const customer = accounts[0]
    const restaurant = accounts[1]
    const courier = accounts[2]
    const orderId = 1337

    const restaurantPayment = web3.toWei(0.2, 'ether')
    const courierPayment = web3.toWei(0.1, 'ether')
    const total = web3.toWei(0.3, 'ether')

    it('should sustain the whole scenario', async () => {
        const instance = await BlockFoodDemo.deployed()

        await instance.newDemo(orderId, { from: customer })

        await instance.submit(orderId, restaurant, restaurantPayment, courierPayment, {
            from: customer,
            value: total
        })

        await instance.accept(orderId, { from: restaurant })
        await instance.ready(orderId, { from: restaurant })

        await instance.picking(orderId, { from: courier })
        await instance.delivering(orderId, { from: courier })

        const restaurantBalanceBefore = await getBalance(restaurant)
        const courierBalanceBefore = await getBalance(courier)

        const tx = await instance.done(orderId, { from: courier })

        const restaurantBalanceAfter = await getBalance(restaurant)
        const courierBalanceAfter = await getBalance(courier)
        const gasUsed = tx.receipt.cumulativeGasUsed * Math.pow(10, 11)

        assert.equal(
            restaurantBalanceBefore.plus(restaurantPayment).toNumber(),
            restaurantBalanceAfter.toNumber()
        )
        assert.equal(
            courierBalanceBefore.plus(courierPayment).toNumber(),
            courierBalanceAfter.plus(gasUsed).toNumber()
        )
    })

    describe('transitions', async () => {
        const getNewDemo = async () => {
            const instance = await getNewInstance()

            const { logs } = await instance.newDemo(orderId, { from: customer })

            return { instance, logs }
        }

        const getSubmittedOrder = async (from = customer) => {
            const { instance } = await getNewDemo()

            const { logs } = await instance.submit(
                orderId, restaurant, restaurantPayment, courierPayment,
                {
                    from,
                    value: total
                }
            )

            return { instance, logs }
        }

        const getAcceptedOrder = async (from = restaurant) => {
            const { instance } = await getSubmittedOrder()

            const { logs } = await instance.accept(orderId, { from })

            return { instance, logs }
        }

        const getReadyOrder = async (from = restaurant) => {
            const { instance } = await getAcceptedOrder()

            const { logs } = await instance.ready(orderId, { from })

            return { instance, logs }
        }

        const getPickingOrder = async (from = courier) => {
            const { instance } = await getReadyOrder()

            const { logs } = await instance.picking(orderId, { from })

            return { instance, logs }
        }

        const getDeliveringOrder = async (from = courier) => {
            const { instance } = await getPickingOrder()

            const { logs } = await instance.delivering(orderId, { from })

            return { instance, logs }
        }

        const getDoneOrder = async (from = courier) => {
            const { instance } = await getDeliveringOrder()

            const { logs } = await instance.done(orderId, { from })

            return { instance, logs }
        }

        describe('void -> newDemo', async () => {
            it('should work', async () => await getNewDemo())
            it('should not work if orderId already exists', async () => {
                const { instance } = await getNewDemo()

                await expectFailure(
                    instance.newDemo(orderId, { from: customer }),
                    'Order was overwritten by new call'
                )
            })
            it('should emit an OrderUpdate event', async () => {
                const { logs } = await getNewDemo()

                const lastLog = _.last(logs)

                assert.equal(lastLog.event, 'OrderUpdate')
                assert.equal(lastLog.args.orderId, orderId)
                assert.equal(lastLog.args.status, OrderStatus.Unset)
            })
        })

        describe('newDemo -> submit', async () => {
            it('should work', async () => await getSubmittedOrder())

            it('should not work if order already submitted', async () => {
                const { instance } = await getSubmittedOrder()

                await expectFailure(
                    instance.submit(
                        orderId, restaurant, restaurantPayment, courierPayment,
                        {
                            from: customer,
                            value: total
                        }
                    ),
                    'Order was overwritten by new call'
                )
            })
            it('should emit an OrderUpdate event', async () => {
                const { logs } = await getSubmittedOrder()

                const lastLog = _.last(logs)

                assert.equal(lastLog.event, 'OrderUpdate')
                assert.equal(lastLog.args.orderId, orderId)
                assert.equal(lastLog.args.status, OrderStatus.Submitted)
            })
            it('should work only for customer', async () =>
                await expectFailure(
                    getSubmittedOrder(restaurant),
                    'Submit worked for someone else'
                )
            )
            it('should work only if order status is Unset', async () => {
                const instance = await getNewInstance()
                await expectFailure(
                    instance.submit(
                        orderId, restaurant, restaurantPayment, courierPayment,
                        {
                            from: customer,
                            value: total
                        }
                    ),
                    'Was able to submit an order that was not created'
                )
            })
            it('should fail if value is insufficient', async () => {
                const { instance } = await getNewDemo()

                await expectFailure(
                    instance.submit(
                        orderId, restaurant, restaurantPayment, courierPayment,
                        {
                            from: customer,
                            value: web3.toWei(0.15, 'ether')
                        }
                    ),
                    'Was able to submit an order with insufficient amount'
                )
                await expectFailure(
                    instance.submit(
                        orderId, restaurant, restaurantPayment, courierPayment,
                        {
                            from: customer,
                            value: web3.toWei(0.45, 'ether')
                        }
                    ),
                    'Was able to submit an order with too many weis'
                )
            })
        })

        describe('submit -> accepted', async () => {
            it('should work', async () => await getAcceptedOrder())

            it('should not work if order already accepted', async () => {
                const { instance } = await getAcceptedOrder()

                await expectFailure(
                    instance.accept(orderId, { from: restaurant }),
                    'Order was overwritten by new call'
                )
            })
            it('should emit an OrderUpdate event', async () => {
                const { logs } = await getAcceptedOrder()

                const lastLog = _.last(logs)

                assert.equal(lastLog.event, 'OrderUpdate')
                assert.equal(lastLog.args.orderId, orderId)
                assert.equal(lastLog.args.status, OrderStatus.Accepted)
            })
            it('should work only for restaurant', async () =>
                await expectFailure(
                    getAcceptedOrder(customer),
                    'Accept worked for someone else'
                )
            )
            it('should work only if order status is Submitted', async () => {
                const { instance } = await getNewDemo()
                await expectFailure(
                    instance.accept(orderId, { from: restaurant }),
                    'Was able to submit an order that was not created'
                )
            })
        })

        describe('accepted -> ready', async () => {
            it('should work', async () => await getReadyOrder())

            it('should not work if order already ready', async () => {
                const { instance } = await getReadyOrder()

                await expectFailure(
                    instance.ready(orderId, { from: restaurant }),
                    'Order was overwritten by new call'
                )
            })
            it('should emit an OrderUpdate event', async () => {
                const { logs } = await getReadyOrder()

                const lastLog = _.last(logs)

                assert.equal(lastLog.event, 'OrderUpdate')
                assert.equal(lastLog.args.orderId, orderId)
                assert.equal(lastLog.args.status, OrderStatus.Ready)
            })
            it('should work only for restaurant', async () =>
                await expectFailure(
                    getReadyOrder(customer),
                    'Accept worked for someone else'
                )
            )
            it('should work only if order status is Accepted', async () => {
                const { instance } = await getSubmittedOrder()
                await expectFailure(
                    instance.ready(orderId, { from: restaurant }),
                    'Was able to submit an order that was not created'
                )
            })
        })

        describe('ready -> picking', async () => {
            it('should work', async () => await getPickingOrder())

            it('should not work if order already picking', async () => {
                const { instance } = await getPickingOrder()

                await expectFailure(
                    instance.picking(orderId, { from: courier }),
                    'Order was overwritten by new call'
                )
            })
            it('should emit an OrderUpdate event', async () => {
                const { logs } = await getPickingOrder()

                const lastLog = _.last(logs)

                assert.equal(lastLog.event, 'OrderUpdate')
                assert.equal(lastLog.args.orderId, orderId)
                assert.equal(lastLog.args.status, OrderStatus.Picking)
            })

            it('should work only if order status is Ready', async () => {
                const { instance } = await getAcceptedOrder()
                await expectFailure(
                    instance.picking(orderId, { from: courier }),
                    'Was able to submit an order that was not created'
                )
            })
        })

        describe('picking -> delivering', async () => {
            it('should work', async () => await getDeliveringOrder())

            it('should not work if order already delivering', async () => {
                const { instance } = await getDeliveringOrder()

                await expectFailure(
                    instance.delivering(orderId, { from: courier }),
                    'Order was overwritten by new call'
                )
            })
            it('should emit an OrderUpdate event', async () => {
                const { logs } = await getDeliveringOrder()

                const lastLog = _.last(logs)

                assert.equal(lastLog.event, 'OrderUpdate')
                assert.equal(lastLog.args.orderId, orderId)
                assert.equal(lastLog.args.status, OrderStatus.Delivering)
            })
            it('should work only for courier', async () =>
                await expectFailure(
                    getDeliveringOrder(customer),
                    'Delivering worked for someone else'
                )
            )
            it('should work only if order status is Accepted', async () => {
                const { instance } = await getSubmittedOrder()
                await expectFailure(
                    instance.delivering(orderId, { from: restaurant }),
                    'Was able to submit an order that was not created'
                )
            })
        })

        describe('delivering -> done', async () => {
            it('should work', async () => await getDoneOrder())

            it('should not work if order already done', async () => {
                const { instance } = await getDoneOrder()

                await expectFailure(
                    instance.done(orderId, { from: courier }),
                    'Order was overwritten by new call'
                )
            })
            it('should emit an OrderUpdate event', async () => {
                const { logs } = await getDoneOrder()

                const lastLog = _.last(logs)

                assert.equal(lastLog.event, 'OrderUpdate')
                assert.equal(lastLog.args.orderId, orderId)
                assert.equal(lastLog.args.status, OrderStatus.Done)
            })
            it('should work only for courier', async () =>
                await expectFailure(
                    getDoneOrder(customer),
                    'Delivering worked for someone else'
                )
            )
            it('should work only if order status is Delivering', async () => {
                const { instance } = await getPickingOrder()
                await expectFailure(
                    instance.done(orderId, { from: restaurant }),
                    'Was able to submit an order that was not created'
                )
            })

            it('should redistribute the value from the customer to the restaurant and courier', async () => {
                const { instance } = await getDeliveringOrder()

                const restaurantBalanceBefore = await getBalance(restaurant)
                const courierBalanceBefore = await getBalance(courier)

                const tx = await instance.done(orderId, { from: courier })

                const restaurantBalanceAfter = await getBalance(restaurant)
                const courierBalanceAfter = await getBalance(courier)
                const gasUsed = tx.receipt.cumulativeGasUsed * Math.pow(10, 11)

                assert.equal(
                    restaurantBalanceBefore.plus(restaurantPayment).toNumber(),
                    restaurantBalanceAfter.toNumber()
                )
                assert.equal(
                    courierBalanceBefore.plus(courierPayment).toNumber(),
                    courierBalanceAfter.plus(gasUsed).toNumber()
                )
            })
        })
    })
})