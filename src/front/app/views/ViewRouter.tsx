import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Api from '../api/Api'
import Loader from '../components/loader/Loader'
import ViewValidator from './ViewValidator'

class MainView extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        const {pathname} = this.props.location
        const demoId = pathname !== '/' ? pathname.split('/')[1] : null

        Api.init(demoId, this.onError.bind(this))

        this.state = {
            error: false,
            ready: false
        }

        this.onRestart = this.onRestart.bind(this)
    }

    onError() {
        this.setState({error: true})
    }

    onRestart() {
        window.location.href = window.location.origin
    }

    componentDidMount() {
        this.setState({ready: true})
    }

    render() {
        const {error, ready} = this.state

        if (error) {
            return (
                <div id="bf-demo-error">
                    <p>Error... Please restart the demo...</p>
                    <button onClick={this.onRestart}>Restart demo</button>
                </div>
            )
        }
        else {
            return (
                <React.Fragment>
                    {ready && (
                        <ViewValidator>
                            <div>Hello BlockFood!</div>
                        </ViewValidator>
                    )}
                    <Loader active={!ready}/>
                </React.Fragment>
            )
        }
    }
}

export default withRouter<any>(connect()(MainView))