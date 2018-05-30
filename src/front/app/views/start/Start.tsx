import * as React from 'react'
import {connect} from 'react-redux'
import Api from '../../api/Api'
import doWithMinTime from '../../utils/DoWithMinTime'
import withDemoController from '../../demoController/WithDemoController'
import {restart} from '../../state/Actions'
import './Start.scss'
    
const BigNum = require('big.js')
const Tx = require('ethereumjs-tx')
var Personal = require('web3-eth-personal');
var HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require('web3');
const wa = window as any;
var personal = new Personal(Personal.givenProvider || 'https://ropsten.infura.io/utoLY4iXorZDzEInDAPJ');
if (window.hasOwnProperty('web3')) {
    //metamask or other provider
  wa.web3 = new Web3(wa.web3.currentProvider);
} else {
    //Infura -> ropsten -> https://ropsten.infura.io/utoLY4iXorZDzEInDAPJ
    //wa.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/utoLY4iXorZDzEInDAPJ"));
    var mnemonic = "flocon aiguille pliage anormal pharaon javelot brebis choisir éléphant écraser noble spatial soigneux ethnie absence"
    const provider = new HDWalletProvider(mnemonic,'https://ropsten.infura.io/utoLY4iXorZDzEInDAPJ')
    wa.web3 = new Web3(provider)
    //RPC
    // wa.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    console.log(wa.web3)
}

var addressFrom="0x6733f5d3259fB40D74b29FC56D5EaE4525e7B5aB"
var privateKeyFrom="e704ce606e91ab2b7b3d4cbad5e5a071e7dc6b66fba7d16b754bb3bad13ff705"
var publicKeyTo = "0x75562e67F7aF995d058025b4f626833f467B08E1";
var privateKeyTo = "36d8da51624315944241054b4d7bb695e388faa68cc041138c4a39f153e2331c"

function sendSigned(txData:any, cb:any) {
    const privK = new Buffer(privateKeyFrom, 'hex')
    const transaction = new Tx(txData)
    transaction.sign(privK)
    const serializedTx = transaction.serialize().toString('hex')
    wa.web3.eth.sendSignedTransaction('0x' + serializedTx, cb)
  }
  wa.web3.eth.getTransactionCount(addressFrom).then((txCount:any) => {

    const txData = {
        nonce: txCount+1,
        gasPrice: wa.web3.utils.toHex(10000),
        gasLimit:  wa.web3.utils.toHex(100000),
        to: publicKeyTo, 
        value: '0x10', 
        data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
    }
  
    sendSigned(txData, function(err:any, result:any) {
      if (err) return console.log('error', err)
      console.log('sent', result);
  })
})
  

const deploy = async() =>{
    const accounts = await wa.web3.eth.getAccounts()
    console.log('attempting to deploy from account',accounts)
    const balance = await wa.web3.eth.getBalance(accounts[0])
    console.log('with a balance of ',balance) 

    var result = await new wa.web3.eth.Contract([
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "orderId",
                        "type": "uint256"
                    }
                ],
                "name": "picking",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "orderId",
                        "type": "uint256"
                    }
                ],
                "name": "accept",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "orderId",
                        "type": "uint256"
                    }
                ],
                "name": "newDemo",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "orderId",
                        "type": "uint256"
                    }
                ],
                "name": "delivering",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "orderId",
                        "type": "uint256"
                    }
                ],
                "name": "done",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "orderId",
                        "type": "uint256"
                    },
                    {
                        "name": "restaurant",
                        "type": "address"
                    },
                    {
                        "name": "restaurantPayment",
                        "type": "uint256"
                    },
                    {
                        "name": "courierPayment",
                        "type": "uint256"
                    }
                ],
                "name": "submit",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "ordersDetails",
                "outputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "restaurantPayment",
                        "type": "uint256"
                    },
                    {
                        "name": "courierPayment",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "orders",
                "outputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "customer",
                        "type": "address"
                    },
                    {
                        "name": "restaurant",
                        "type": "address"
                    },
                    {
                        "name": "courier",
                        "type": "address"
                    },
                    {
                        "name": "status",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "ordersIds",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "orderId",
                        "type": "uint256"
                    }
                ],
                "name": "ready",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "orderId",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "status",
                        "type": "uint8"
                    }
                ],
                "name": "OrderUpdate",
                "type": "event"
            }
        ],{from: addressFrom,gasPrice:'20000000000'})
        console.log(result)

        result.deploy({data:"458fa2c2a0c5e1ec8285a0bb31b91cb113c46060ec08351f604bb233d53aedd9"
        })
        .send({
            from: accounts[0],
            gas: 3000000,
            gasPrice: 25000
        })
        .then(function(newContractInstance:any){
            console.log(newContractInstance.options.address) // instance with the new contract address
        });
    };  
deploy();


class Start extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            loading: false
        }

        this.onStartDemo = this.onStartDemo.bind(this)
    }

    onStartDemo() {
        this.setState({loading: true})

        doWithMinTime(() => Api.startDemo()).then(() => this.props.demoController.start())
    }

    componentDidMount() {
        this.props.dispatch(restart())
    }

    render() {
        const {loading} = this.state

        return (
            <div id="bf-demo-start">
                {loading ? (
                    <i className="spin-circle-loader fa-spin"/>
                ) : (
                    <button onClick={this.onStartDemo}>Start</button>
                )}
            </div>
        )
    }
}

export default connect()(withDemoController(Start))