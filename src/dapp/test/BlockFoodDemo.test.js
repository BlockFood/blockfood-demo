const BlockFoodDemo = artifacts.require('./BlockFoodDemo.sol')

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

    const getNewInstance = async (config) => {
        return (await BlockFoodDemo.new(
            { from: ownerAccount }
        ))
    }

    const customer = accounts[0]
    const restaurant = accounts[1]
    const courier = accounts[2]
    const orderId = 1337

    it('should sustain the whole scenario', async () => {
        const instance = await BlockFoodDemo.deployed()

        await instance.newDemo(orderId, { from: customer })

        const restaurantPayment = web3.toWei(0.2, 'ether')
        const courierPayment = web3.toWei(0.1, 'ether')

        await instance.submit(orderId, restaurant, restaurantPayment, courierPayment, {
            from: customer,
            value: web3.toWei(0.3, 'ether')
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

})