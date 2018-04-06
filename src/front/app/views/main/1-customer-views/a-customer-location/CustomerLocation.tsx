import * as React from 'react'

import './CustomerLocation.scss'

export class CustomerLocation extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            savedCityName: ''
        }

        this.onChange = this.onChange.bind(this)
    }

    onChange = (event: any) => {
        this.setState({savedCityName: event.target.value})
    }

    render() {
        const {savedCityName} = this.state

        return (
            <div id="bf-demo-view-customer-location">
                <div className="localisation">
                    <h1>Deliver my food</h1>
                    <div className="search">
                        <input className="input" type="text"
                               placeholder="Enter your delivery address"
                               value={savedCityName} onChange={this.onChange}/>
                        <button className="searchButton">I am hungry!</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomerLocation