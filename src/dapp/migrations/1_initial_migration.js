const BlockFoodDemo = artifacts.require('./BlockFoodDemo.sol')

module.exports = function (deployer) {
    console.log('Deploy BlockFoodDemo...')

    deployer.deploy(BlockFoodDemo,
        { from: web3.eth.getAccountsPromise = function () {
            return new Promise(function (resolve, reject) {
                web3.eth.getAccounts(function (e, accounts) {
                    if (e != null) {
                        reject(e);
                    } else {
                        resolve(accounts[2]);
                    }
                });
            });
        }
        
    }
    )
}
