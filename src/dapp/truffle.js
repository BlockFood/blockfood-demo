// module.exports = {
//     networks: {
//         "ropsten": {
//             network_id: 3,
//             host: "127.0.0.1",
//             port: 8545   // Different than the default below
//         }
//     },
//     rpc: {
//         host: "127.0.0.1",
//         port: 8545
//     }
// }
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "flocon aiguille pliage anormal pharaon javelot brebis choisir éléphant écraser noble spatial soigneux ethnie absence";

module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*" // Match any network id
      },
      ropsten: {
        provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/utoLY4iXorZDzEInDAPJ"),
        network_id: 3,
        gas:  2123456
      },
      rinkeby: {
        host: "localhost",
        port: 8545,
        network_id: 4,
        from: "0xbe7f3a2429acb9e1b443601e0ad14e08b60099e1",
        gas: 4612388
      }
    },
  };