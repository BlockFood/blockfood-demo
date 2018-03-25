import * as React from 'react'

import './ApiError.scss'

class ApiError extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.onRestart = this.onRestart.bind(this)
    }

    onRestart() {
        window.location.href = window.location.origin
    }

    render() {
        return (
            <div id="bf-demo-error">
                <p>Error... Please restart the demo...</p>
                <button onClick={this.onRestart}>Restart</button>
            </div>
        )
    }
}

export default ApiError