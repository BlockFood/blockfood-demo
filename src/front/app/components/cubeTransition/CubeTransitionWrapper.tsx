import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CubeTransition from './CubeTransition'

import './CubeTransitionWrapper.scss'

class CubeTransitionWrapper extends React.Component<any, any> {
    private cubeTransition: any
    private pages: any[]
    private previousHTML: string[]
    private previousPageIndex: number | null = null

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
            this.previousPageIndex = this.props.index
            const previousPage = this.pages[this.previousPageIndex as number]
            _.map(previousPage.querySelectorAll('*'), el => {
                if (el.scrollTop) {
                    el.setAttribute('data-scroll-top', el.scrollTop)
                }
            })
            this.previousHTML[this.previousPageIndex as number] = previousPage.innerHTML

            this.cubeTransition.openIndex(nextProps.index + 1)
        }
    }

    public componentDidUpdate() {
        if (this.previousPageIndex) {
            _.forEach(this.pages[this.previousPageIndex as number].querySelectorAll('*'), el => {
                const scrollTop = el.getAttribute('data-scroll-top')
                if (scrollTop) {
                    el.scrollTop = scrollTop
                }
            })

            this.previousPageIndex = null
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