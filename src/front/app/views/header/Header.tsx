import * as React from 'react'
import {CUSTOMER_PREFIX, RESTAURANT_PREFIX, COURIER_PREFIX} from '../Routes'

import './Header.scss'

class Header extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        const {type, userLabel} = this.getStatus()

        this.state = {
            type,
            userLabel
        }
    }

    getStatus(props = this.props) {
        const {viewPrefix} = props

        const type = viewPrefix ? viewPrefix.split('-')[0] : null

        const userLabel = {
            [CUSTOMER_PREFIX]: 'a hungry customer',
            [RESTAURANT_PREFIX]: 'a passionate chef',
            [COURIER_PREFIX]: 'a motivated courier'
        }[viewPrefix]

        return {type, userLabel}
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.viewPrefix !== this.props.viewPrefix) {
            const {type, userLabel} = this.getStatus(nextProps)

            type && this.setState({type, userLabel})
        }
    }

    render() {
        const {visible} = this.props
        const {type, userLabel} = this.state

        return (
            <header id="bf-demo-header" className={visible ? 'visible' : ''}>
                <div className="logo">
                    <div className="name">
                        <i className={type}/>
                        <div>Block<span>Food</span><span>/{type}</span></div>
                    </div>
                </div>
                <div className="user">
                    <div className="username"><i className="fas fa-user"/> Welcome to <span>{userLabel}</span></div>
                </div>
            </header>
        )
    }
}

export default Header