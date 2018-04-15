import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CubeTransition from './CubeTransition'

import './CubeTransitionWrapper.scss'

class CubeTransitionWrapper extends React.Component<any, any> {
    private cubeTransition: any
    private pages: any[]
    private previousHTML: string[]

    constructor(props: any) {
        super(props)

        this.previousHTML = _.map(_.range(4), () => '')

        this.state = {
            mounted: false
        }
    }

    public componentDidMount() {
        this.pages = _.toArray(ReactDOM.findDOMNode(this).querySelectorAll('.page'))
        this.cubeTransition = new CubeTransition(this.pages, this.props.index + 1)

        this.setState({mounted: true})
    }

    public componentWillReceiveProps(nextProps: any) {
        if (this.props.index !== nextProps.index) {
            this.previousHTML[this.props.index] = this.pages[this.props.index].innerHTML
            this.cubeTransition.openIndex(nextProps.index + 1)
        }
    }

    public render() {
        const {index} = this.props
        const {mounted} = this.state

        return (
            <div id="cubeTransition">
                {_.map(_.range(4), pageIndex => (
                    <div key={pageIndex} className="page"
                         dangerouslySetInnerHTML={pageIndex !== index ? {__html: this.previousHTML[pageIndex]} : undefined}/>
                ))}
                {mounted && ReactDOM.createPortal(this.props.children, this.pages[index])}
            </div>
        )
    }
}

export default CubeTransitionWrapper