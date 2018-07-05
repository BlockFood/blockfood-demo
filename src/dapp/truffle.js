var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
    networks: {
        "ropsten": {
            network_id: 3,
            host: "127.0.0.1",
            port: 8545   // Different than the default below
        }
    },
    rpc: {
        host: "127.0.0.1",
        port: 8545
    },
    ropsten: {
      provider: function() {
        const mnemonic = "boat sick term barely expand erase loan galaxy stem shiver loan pool feed service ecology"
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/EnIOlsjoYIgrwJGjworX")
      },
      network_id: "3"
    },
}
