import * as React from 'react'

import './Loader.scss'

const MIN_LOADING_TIME = 1000

class Loader extends React.Component<any, any> {
    private startedAt: number;

    constructor(props: any) {
        super(props)

        this.state = {
            visible: true,
            loading: true
        }

        this.startedAt = +new Date()

        this.onTransitionEnd = this.onTransitionEnd.bind(this)
    }

    onTransitionEnd() {
        this.setState({visible: false})
    }

    componentWillReceiveProps(nextProps: any) {
        if (this.props.active && !nextProps.active) {
            const delay = Math.max(MIN_LOADING_TIME - (+new Date() - this.startedAt), 0)
            setTimeout(() => this.setState({loading: false}), delay)
        }
    }

    render() {
        const {visible, loading} = this.state

        return (
            <div id="bf-demo-loader" className={!loading ? 'fade-out' : ''} style={{display: !visible ? 'none' : ''}}
                 onTransitionEnd={this.onTransitionEnd}>
                <div/>
            </div>
        )
    }
}

export default Loader