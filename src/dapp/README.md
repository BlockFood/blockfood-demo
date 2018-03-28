# BlockFoodDemo Smart Contract

## Goal

The goal of this smart contract is to demonstrate a proof-of-concept (POC) of the BlockFood platforms.

It is a naive version of the smart contract that will be used in the future.

This is for demonstration purpose only.

## Usage

The BlockFood Token Sale Smart Contract will be deployed on the Rinkeby Ethereum blockchain.

## Dev

The smart contract has been written in test-driven development using the Truffle framework.

### Prerequisite

- Node.js 8+

- Truffle 4.0.1+

```bash
cd blockfood-demo/src/dapp/
npm i -g truffle
```

### Launch tests

In a console, from the base directory of the project, type:

```bash
truffle test
```

This will output something like this:

```bash
$ truffle test
Compiling .\contracts\BlockFoodDemo.sol...

Deploy BlockFoodDemo...

  Contract: BlockFoodDemo
    √ should be deployed
    √ should sustain the whole scenario (617ms)
    transitions
      void -> newDemo
        √ should work (284ms)
        √ should not work if orderId already exists (285ms)
        √ should emit an OrderUpdate event (269ms)
      newDemo -> submit
        √ should work (347ms)
        √ should not work if order already submitted (353ms)
        √ should emit an OrderUpdate event (333ms)
        √ should work only for customer (300ms)
        √ should work only if order status is Unset (199ms)
        √ should fail if value is insufficient (354ms)
      submit -> accepted
        √ should work (362ms)
        √ should not work if order already accepted (422ms)
        √ should emit an OrderUpdate event (399ms)
        √ should work only for restaurant (350ms)
        √ should work only if order status is Submitted (332ms)
      accepted -> ready
        √ should work (438ms)
        √ should not work if order already ready (431ms)
        √ should emit an OrderUpdate event (437ms)
        √ should work only for restaurant (416ms)
        √ should work only if order status is Accepted (385ms)
      ready -> picking
        √ should work (538ms)
        √ should not work if order already picking (568ms)
        √ should emit an OrderUpdate event (531ms)
        √ should work only if order status is Ready (437ms)
      picking -> delivering
        √ should work (600ms)
        √ should not work if order already delivering (669ms)
        √ should emit an OrderUpdate event (580ms)
        √ should work only for courier (664ms)
        √ should work only if order status is Accepted (368ms)
      delivering -> done
        √ should work (685ms)
        √ should not work if order already done (755ms)
        √ should emit an OrderUpdate event (670ms)
        √ should work only for courier (748ms)
        √ should work only if order status is Delivering (584ms)
        √ should redistribute the value from the customer to the restaurant and courier (853ms)

  36 passing (17s)
```