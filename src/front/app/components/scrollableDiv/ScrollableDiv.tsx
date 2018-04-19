import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './ScrollableDiv.scss'

class ScrollableDiv extends React.Component<any, any> {
    private containerElement: HTMLElement

    constructor(props: any) {
        super(props)

        this.setScrollableStatus = this.setScrollableStatus.bind(this)
    }

    private setScrollableStatus() {
        const hasScrollbar = this.containerElement.scrollHeight > this.containerElement.clientHeight
        this.containerElement.className = this.containerElement.className
            .replace(/with(?:out)?-scrollbar/, `with${hasScrollbar ? '' : 'out'}-scrollbar`)
    }

    public componentDidMount() {
        this.containerElement = ReactDOM.findDOMNode(this) as HTMLElement
        this.setScrollableStatus()

        window.addEventListener('resize', this.setScrollableStatus, false)
    }

    public componentDidUpdate() {
        this.setScrollableStatus()
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.setScrollableStatus, false)
    }

    public render() {
        let {className} = this.props
        className += (className ? ' ' : '') + 'scrollable-div without-scrollbar'

        return (
            <div className={className}>
                {this.props.children}
            </div>
        )
    }

}

export default ScrollableDiv
