import * as React from 'react'
import {connect} from 'react-redux'
// import Api from '../../api/Api'
import doWithMinTime from '../../utils/DoWithMinTime'
import doWithTime from '../../utils/DoWithTime'
import withDemoController from '../../demoController/WithDemoController'
import {restart,startDemo} from '../../state/Actions'

import './Start.scss'

class Start extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            loading: false
        }
        this.onStartDemo = this.onStartDemo.bind(this)
    }

    onStartDemo() {
        this.setState({loading: true})
        doWithTime(this.props.startDemo,this.props.demoController)
    }

    componentDidMount() {
        this.props.restart()
    }

    render() {
        const {loading} = this.state

        return (
            <div id="bf-demo-start">
                {loading ? (
                    <i className="spin-circle-loader fa-spin"/>
                ) : (
                    <button onClick={this.onStartDemo}>Start</button>
                )}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    restart: () => dispatch(restart()),
    startDemo: (demoController:any) => dispatch(startDemo(demoController))
  }
}

export default connect(null,mapDispatchToProps)(withDemoController(Start))
