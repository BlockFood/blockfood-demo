import * as React from 'react'
import {connect} from 'react-redux'
import Api from '../../api/Api'
import doWithMinTime from '../../utils/DoWithMinTime'
import withDemoController from '../../demoController/WithDemoController'
import {restart,startDemo} from '../../state/Actions'
import './Start.scss'

var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
var web3 = new Web3('https://ropsten.infura.io/EnIOlsjoYIgrwJGjworX')
const account_restaurant = "0xd9D8759f68b4C4ADf8A54d3FC02371E462708bB7"
const account_customer = "0x08672f5E4236465829f133405A3893dA0e0581A1"
var mode   = process.env.NODE_ENV;
// var privateKey_cust = process.env.PRIVATE_KEY_CUSTOMER
// var privateKey_rest = process.env.PRIVATE_KEY_RESTAURANT
const privateKey_rest = Buffer.from('33b8f9147fb2febbea51a1fcafd917fa3aaf879e8315e3779b904b2cf4169817','hex')
const privateKey_cust = Buffer.from('66765ed03dd15aa5df8c407bbf0e85925c243359e5f9a5c51b4d30a34c213994','hex')
//web3.eth.getBalance(account_restaurant,(err:any,bal:any)=>{console.log('rest:',web3.utils.fromWei(bal,'ether'))})
web3.eth.getBalance(account_customer,(err:any,bal:any)=>{console.log('cust:',web3.utils.fromWei(bal,'ether'))})
// web3.eth.accounts.privateKeyToAccount(privateKey_cust);

//CONTRACT DEPLOYED -- ALREADY DEPLOYED ON ROPTSTEN AT  0x676347a1c6322d0008aa69866a6505e8badbbe9f

// web3.eth.getTransactionCount(account_customer,(err:any,txCount:any) => {
//
//   const data ='0x608060405234801561001057600080fd5b5061111b806100206000396000f3006080604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630a6f91c4146100a957806319b05f49146100d65780632385e0461461010357806335fc6da31461013057806358a743c71461015d578063734140071461018a578063738e257c146101de578063a85c38ef1461022d578063e09b86741461031c578063f0bd2b9e1461035d575b600080fd5b3480156100b557600080fd5b506100d46004803603810190808035906020019092919050505061038a565b005b3480156100e257600080fd5b50610101600480360381019080803590602001909291905050506104b4565b005b34801561010f57600080fd5b5061012e600480360381019080803590602001909291905050506105fd565b005b34801561013c57600080fd5b5061015b600480360381019080803590602001909291905050506108b5565b005b34801561016957600080fd5b50610188600480360381019080803590602001909291905050506109fe565b005b6101dc60048036038101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190505050610cb0565b005b3480156101ea57600080fd5b5061020960048036038101908080359060200190929190505050610eb6565b60405180848152602001838152602001828152602001935050505060405180910390f35b34801561023957600080fd5b5061025860048036038101908080359060200190929190505050610ee0565b604051808681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182600681111561030457fe5b60ff1681526020019550505050505060405180910390f35b34801561032857600080fd5b5061034760048036038101908080359060200190929190505050610f83565b6040518082815260200191505060405180910390f35b34801561036957600080fd5b5061038860048036038101908080359060200190929190505050610fa6565b005b80600380600681111561039957fe5b6001600084815260200190815260200160002060030160149054906101000a900460ff1660068111156103c857fe5b1415156103d457600080fd5b336001600085815260200190815260200160002060030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060046001600085815260200190815260200160002060030160146101000a81548160ff0219169083600681111561045c57fe5b02179055507f6f82c7805bdbbdb8452159c69cc66755731cac63aec40113c6b2d1ea79b4e4d38360046040518083815260200182600681111561049b57fe5b60ff1681526020019250505060405180910390a1505050565b80338073ffffffffffffffffffffffffffffffffffffffff166001600084815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561052657600080fd5b82600180600681111561053557fe5b6001600084815260200190815260200160002060030160149054906101000a900460ff16600681111561056457fe5b14151561057057600080fd5b60026001600087815260200190815260200160002060030160146101000a81548160ff021916908360068111156105a357fe5b02179055507f6f82c7805bdbbdb8452159c69cc66755731cac63aec40113c6b2d1ea79b4e4d3856002604051808381526020018260068111156105e257fe5b60ff1681526020019250505060405180910390a15050505050565b806000600681111561060b57fe5b6001600083815260200190815260200160002060030160149054906101000a900460ff16600681111561063a57fe5b14151561064657600080fd5b60006001600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156106a157600080fd5b60a0604051908101604052808381526020013373ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000600681111561071657fe5b815250600160008481526020019081526020016000206000820151816000015560208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060808201518160030160146101000a81548160ff0219169083600681111561082f57fe5b021790555090505060008290806001815401808255809150509060018203906000526020600020016000909192909190915055507f6f82c7805bdbbdb8452159c69cc66755731cac63aec40113c6b2d1ea79b4e4d38260006040518083815260200182600681111561089d57fe5b60ff1681526020019250505060405180910390a15050565b80338073ffffffffffffffffffffffffffffffffffffffff166001600084815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561092757600080fd5b82600480600681111561093657fe5b6001600084815260200190815260200160002060030160149054906101000a900460ff16600681111561096557fe5b14151561097157600080fd5b60056001600087815260200190815260200160002060030160146101000a81548160ff021916908360068111156109a457fe5b02179055507f6f82c7805bdbbdb8452159c69cc66755731cac63aec40113c6b2d1ea79b4e4d3856005604051808381526020018260068111156109e357fe5b60ff1681526020019250505060405180910390a15050505050565b60008082338073ffffffffffffffffffffffffffffffffffffffff166001600084815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610a7357600080fd5b846005806006811115610a8257fe5b6001600084815260200190815260200160002060030160149054906101000a900460ff166006811115610ab157fe5b141515610abd57600080fd5b60066001600089815260200190815260200160002060030160146101000a81548160ff02191690836006811115610af057fe5b02179055507f6f82c7805bdbbdb8452159c69cc66755731cac63aec40113c6b2d1ea79b4e4d387600660405180838152602001826006811115610b2f57fe5b60ff1681526020019250505060405180910390a1600260008881526020019081526020016000206001015495506002600088815260200190815260200160002060020154945060006002600089815260200190815260200160002060010181905550600060026000898152602001908152602001600020600201819055506001600088815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc879081150290604051600060405180830381858888f19350505050158015610c29573d6000803e3d6000fd5b506001600088815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc869081150290604051600060405180830381858888f19350505050158015610ca6573d6000803e3d6000fd5b5050505050505050565b83338073ffffffffffffffffffffffffffffffffffffffff166001600084815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610d2257600080fd5b34848480820183141515610d3557600080fd5b886000806006811115610d4457fe5b6001600084815260200190815260200160002060030160149054906101000a900460ff166006811115610d7357fe5b141515610d7f57600080fd5b89600160008d815260200190815260200160002060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018060008d815260200190815260200160002060030160146101000a81548160ff02191690836006811115610e0657fe5b02179055506060604051908101604052808c81526020018a815260200189815250600260008d81526020019081526020016000206000820151816000015560208201518160010155604082015181600201559050507f6f82c7805bdbbdb8452159c69cc66755731cac63aec40113c6b2d1ea79b4e4d38b600160405180838152602001826006811115610e9557fe5b60ff1681526020019250505060405180910390a15050505050505050505050565b60026020528060005260406000206000915090508060000154908060010154908060020154905083565b60016020528060005260406000206000915090508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030160149054906101000a900460ff16905085565b600081815481101515610f9257fe5b906000526020600020016000915090505481565b80338073ffffffffffffffffffffffffffffffffffffffff166001600084815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561101857600080fd5b82600280600681111561102757fe5b6001600084815260200190815260200160002060030160149054906101000a900460ff16600681111561105657fe5b14151561106257600080fd5b60036001600087815260200190815260200160002060030160146101000a81548160ff0219169083600681111561109557fe5b02179055507f6f82c7805bdbbdb8452159c69cc66755731cac63aec40113c6b2d1ea79b4e4d3856003604051808381526020018260068111156110d457fe5b60ff1681526020019250505060405180910390a150505050505600a165627a7a72305820458fa2c2a0c5e1ec8285a0bb31b91cb113c46060ec08351f604bb233d53aedd90029'
//
//   const txObject = {
//     nonce: web3.utils.toHex(txCount),
//     gasLimit: web3.utils.toHex(5000000), //21000 for a simple trans, 1000000 for deploying
//     gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
//     data: data
//   }
//   console.log(txObject.gasLimit)
//   console.log(txObject.gasPrice)
//   //sign the transaction
//   const tx = new Tx(txObject)
//   tx.sign(privateKey_cust)
//
//   const serializedTransaction = tx.serialize()
//   const raw = '0x' + serializedTransaction.toString('hex')
//
//   //Broadcast the transaction
//   web3.eth.sendSignedTransaction(raw,(err:any,txHash:any)=>{
//       console.log('err:', err, 'txHash:',txHash)
//   })
// })
const contractABI =[ { "constant": false, "inputs": [ { "name": "orderId", "type": "uint256" } ], "name": "picking", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "orderId", "type": "uint256" } ], "name": "accept", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "orderId", "type": "uint256" } ], "name": "newDemo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "orderId", "type": "uint256" } ], "name": "delivering", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "orderId", "type": "uint256" } ], "name": "done", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "orderId", "type": "uint256" }, { "name": "restaurant", "type": "address" }, { "name": "restaurantPayment", "type": "uint256" }, { "name": "courierPayment", "type": "uint256" } ], "name": "submit", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "ordersDetails", "outputs": [ { "name": "id", "type": "uint256" }, { "name": "restaurantPayment", "type": "uint256" }, { "name": "courierPayment", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "orders", "outputs": [ { "name": "id", "type": "uint256" }, { "name": "customer", "type": "address" }, { "name": "restaurant", "type": "address" }, { "name": "courier", "type": "address" }, { "name": "status", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "ordersIds", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "orderId", "type": "uint256" } ], "name": "ready", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "orderId", "type": "uint256" }, { "indexed": false, "name": "status", "type": "uint8" } ], "name": "OrderUpdate", "type": "event" } ]
const contractAddress = '0x676347a1c6322d0008aa69866a6505e8badbbe9f'
var bfContract = new web3.eth.Contract(contractABI,contractAddress,{from:account_customer})
console.log(bfContract)
const id = web3.utils.toBN(999);
console.log(web3.utils.isBN(id))
bfContract.methods.newDemo(id).call({from: account_customer}).then((result:any)=>{console.log(result)})
bfContract.methods.ordersIds(id).call((err:any,result:any) => {console.log(result)})

class Start extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            loading: false
        }
        this.props.startDemo()
        this.onStartDemo = this.onStartDemo.bind(this)
    }

    onStartDemo() {
        this.setState({loading: true})
        doWithMinTime(() => Api.startDemo()).then(() => this.props.demoController.start())
    }

    componentDidMount() {
        this.props.restart()
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

const mapDispatchToProps = (dispatch:any) => {
  return {
    restart: () => dispatch(restart()),
    startDemo: () => dispatch(startDemo())
  }
}

export default connect(null,mapDispatchToProps)(withDemoController(Start))
