import * as React from 'react'
import {connect} from 'react-redux'
import {IState} from '../../../../state/InitialState'
import {setCustomerLocation} from '../../../../state/Actions'

import './CustomerLocation.scss'

export class CustomerLocation extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.onChange = this.onChange.bind(this)
    }

    onChange = (event: any) => {
        this.props.dispatch(setCustomerLocation(event.target.value))
    }

    render() {
        const {customerLocation} = this.props

        return (
            <div id="bf-demo-view-customer-location">
                <div className="localisation">
                    <h1>Deliver my food</h1>
                    <div className="search">
                        <input className="input" type="text"
                               placeholder="Enter your delivery address"
                               value={customerLocation} onChange={this.onChange}/>
                        <button className="searchButton">I am hungry!</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatToProps = (state: IState) => {
    return {
        customerLocation: state.customerLocation
    }
}

export default connect(mapStatToProps)(CustomerLocation)