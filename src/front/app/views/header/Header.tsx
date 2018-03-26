import * as React from 'react'
import {CUSTOMER_VIEW, RESTAURANT_VIEW, COURIER_VIEW} from '../Routes'

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
        const {view} = props

        const type = view ? view.split('-')[0] : null

        const userLabel = {
            [CUSTOMER_VIEW]: 'a hungry customer',
            [RESTAURANT_VIEW]: 'a passionate chef',
            [COURIER_VIEW]: 'a motivated courier'
        }[view]

        return {type, userLabel}
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.view !== this.props.view) {
            const {type, userLabel} = this.getStatus(nextProps)

            type && this.setState({type, userLabel})
        }
    }

    render() {
        const {view} = this.props
        const {type, userLabel} = this.state

        return (
            <header id="bf-demo-header" className={!!view ? 'visible' : ''}>
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