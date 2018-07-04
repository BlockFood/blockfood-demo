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
web3.eth.getBalance(account_restaurant,(err:any,bal:any)=>{console.log('rest:',web3.utils.fromWei(bal,'ether'))})
web3.eth.getBalance(account_customer,(err:any,bal:any)=>{console.log('cust:',web3.utils.fromWei(bal,'ether'))})

web3.eth.getTransactionCount(account_customer,(err:any,txCount:any) => {
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: account_restaurant,
    value: web3.utils.toHex(web3.utils.toWei('1','ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
  }
  //sgn the transaction
  const tx = new Tx(txObject)
  tx.sign(privateKey_cust)

  const serializedTransaction = tx.serialize()
  const raw = '0x' + serializedTransaction.toString('hex')

  //Broadcast the transaction
  // web3.eth.sendSignedTransaction(raw,(err:any,txHash:any)=>{
  //     console.log('txHash:',txHash)
  // })
})

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
