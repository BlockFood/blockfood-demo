import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './Modal.scss'

// .js instead of .tsx because of a bug with onTransitionEnd
class Modal extends React.Component {

    constructor(props) {
        super(props)

        this.domNode = document.querySelector('#modalLayer')

        this.onTransitionEnd = this.onTransitionEnd.bind(this)
        this.close = this.close.bind(this)
    }

    onTransitionEnd(event) {
        if (event.target === this.containerElement && this.containerElement.className.indexOf('closing') !== -1) {
            this.props.onClose()
        }
    }

    close() {
        this.props.onImmediateClose && this.props.onImmediateClose()

        this.containerElement.className += ' closing'
    }

    componentDidMount() {
        this.containerElement = ReactDOM.findDOMNode(this)

        setTimeout(() => this.containerElement.className += ' ready', 100)

        const activeElement = document.activeElement
        activeElement && activeElement.blur()
    }

    render() {
        return ReactDOM.createPortal(
            (
                <div id="bf-demo-modal" className="with-transition" onTransitionEnd={this.onTransitionEnd}>
                    <div className="wrapper">
                        <div className="container">
                            {this.props.children}
                            <div className="close" onClick={this.close}>Go!</div>
                        </div>
                    </div>
                </div>
            ),
            this.domNode,
        )
    }

}

export default Modal