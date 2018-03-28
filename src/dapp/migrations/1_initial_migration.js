const BlockFoodDemo = artifacts.require('./BlockFoodDemo.sol')

module.exports = function (deployer) {
    console.log('Deploy BlockFoodDemo...')

    deployer.deploy(BlockFoodDemo,
        { from: web3.eth.accounts[2] }
    )
}
