import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './Error.scss'

class Error extends React.Component<any, any> {

    private domNode: HTMLElement

    constructor(props: any) {
        super(props)

        this.domNode = document.querySelector('#errorLayer') as HTMLElement

        this.onRestart = this.onRestart.bind(this)
    }

    onRestart() {
        window.location.href = window.location.origin
    }

    render() {
        return ReactDOM.createPortal(
            (
                <div id="bf-demo-error">
                    <p>Oops, something went wrong!</p>
                    <button onClick={this.onRestart}>Restart</button>
                </div>
            ),
            this.domNode,
        )
    }
}

export default Error