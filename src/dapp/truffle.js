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

module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*" // Match any network id
      }
    },
    rpc: {
              host: "127.0.0.1",
              port: 8545  
    }
  };