import * as React from 'react'

import './Success.scss'

class Success extends React.Component<any, any> {
    render() {
        const {x, y} = this.props

        return (
            <div className="success" style={{top: Math.round(y), left: Math.round(x)}}>
                <div className="spark-wrapper">
                    <div className="spark spark-1"/>
                    <div className="spark spark-2"/>
                    <div className="spark spark-3"/>
                    <div className="spark spark-4"/>
                </div>
                <div className="spark-wrapper">
                    <div className="spark spark-1"/>
                    <div className="spark spark-2"/>
                    <div className="spark spark-3"/>
                    <div className="spark spark-4"/>
                </div>
            </div>
        )
    }
}

export default Success