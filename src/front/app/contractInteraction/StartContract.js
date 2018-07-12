//Import for contract
const Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/EnIOlsjoYIgrwJGjworX')

//Key -> need to store in process.env


const account_customer = "0x08672f5E4236465829f133405A3893dA0e0581A1"
const account_restaurant = "0xd9D8759f68b4C4ADf8A54d3FC02371E462708bB7"
const privateKey_cust = Buffer.from('66765ed03dd15aa5df8c407bbf0e85925c243359e5f9a5c51b4d30a34c213994','hex')
const privateKey_rest = Buffer.from('33b8f9147fb2febbea51a1fcafd917fa3aaf879e8315e3779b904b2cf4169817','hex')


const contractABI =[ { "constant": false, "inputs": [ { "name": "orderId", "type": "uint256" } ], "name": "picking", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "orderId", "type": "uint256" } ], "name": "accept", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "orderId", "type": "uint256" } ], "name": "newDemo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "orderId", "type": "uint256" } ], "name": "delivering", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "orderId", "type": "uint256" } ], "name": "done", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "orderId", "type": "uint256" }, { "name": "restaurant", "type": "address" }, { "name": "restaurantPayment", "type": "uint256" }, { "name": "courierPayment", "type": "uint256" } ], "name": "submit", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "ordersDetails", "outputs": [ { "name": "id", "type": "uint256" }, { "name": "restaurantPayment", "type": "uint256" }, { "name": "courierPayment", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "orders", "outputs": [ { "name": "id", "type": "uint256" }, { "name": "customer", "type": "address" }, { "name": "restaurant", "type": "address" }, { "name": "courier", "type": "address" }, { "name": "status", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "ordersIds", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "orderId", "type": "uint256" } ], "name": "ready", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "orderId", "type": "uint256" }, { "indexed": false, "name": "status", "type": "uint8" } ], "name": "OrderUpdate", "type": "event" } ]
const contractAddress = '0x676347a1c6322d0008aa69866a6505e8badbbe9f'
var bfContract = new web3.eth.Contract(contractABI,contractAddress)
export const demoId = Math.random()*1000000000

export const data = bfContract.methods.newDemo(demoId).encodeABI()

//start new Demo

  web3.eth.getTransactionCount( account_customer, (err:any,txCount:any) =>{
   const txObject = {
     nonce: web3.utils.toHex(txCount),
     gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
     gasLimit: web3.utils.toHex(800000),
     to: contractAddress,
     data: data
   };
   console.log(txObject)
   //Sign transaction
   const tx = new Tx(txObject)
   tx.sign(privateKey_cust)
   const serializedTx = tx.serialize()
   const raw = '0x' + serializedTx.toString('hex')

   // send transaction
   // web3.eth.sendSignedTransaction(raw,(err:any,txHash:any) => {
   // console.log('err:',err,'txHash',txHash)
   // })
 })

    bfContract.getPastEvents(
      'AllEvents',
      {
        fromBlock: 3616466,
        toBlock: 'latest'
      },
      (err:any,events:any) => {
        console.log(events[0])   //we can get orderId here
      }
    )
