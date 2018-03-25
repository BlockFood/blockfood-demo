import * as React from 'react'
import {withRouter} from 'react-router-dom'

import './Navigator.scss'

class Navigator extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.onRestart = this.onRestart.bind(this)
    }

    onRestart() {
        this.props.history.replace('/')
    }

    render() {
        const {visible} = this.props

        return (
            <footer id="bf-demo-navigator" className={visible ? 'visible' : ''}>
                <button className="restart" onClick={this.onRestart}><i className="fas fa-undo-alt"/>Restart</button>
            </footer>
        )
    }
}

export default withRouter(Navigator) as any