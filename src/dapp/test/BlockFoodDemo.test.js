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

    it('should properly set the values from the constructor', async () => {
        const instance = await BlockFoodDemo.deployed()
    })

    const getNewInstance = async (config) => {
        return (await BlockFoodDemo.new(
            { from: ownerAccount }
        ))
    }



})