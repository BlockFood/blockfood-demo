import * as React from 'react'

import './MenuItem.scss'

class OrderInProgressItem extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.addToOrderInProgress = this.addToOrderInProgress.bind(this)
    }

    private addToOrderInProgress() {
        this.props.addToOrderInProgress(this.props.menuItem.id, 1)
    }

    public render() {
        const {name, price_eth} = this.props.menuItem

        return (
            <div className="menu-item" onClick={this.addToOrderInProgress}>
                <h2>{name}</h2>
                <h3>{price_eth} ETH</h3>
            </div>
        )
    }
}

export default OrderInProgressItem