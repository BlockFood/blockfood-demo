// https://www.jqueryscript.net/slider/3D-Cube-Page-Transition-Plugin-With-jQuery-cubeTransition-js.html

export default class CubeTransition {
    constructor(pages, index) {
        this.pages = pages

        this.current = index
        this.next = index
        this.outClass = false
        this.inClass = ''
        this.onGoing = ''
        this.queue = []

        this.pages[index - 1].classList.add('visible')
    }

    show() {
        this.pages[this.next - 1].classList.add('visible')
        this.pages[this.current - 1].classList.add(this.outClass)
        this.pages[this.next - 1].classList.add(this.inClass)

        setTimeout(() => {
            this.pages[this.current - 1].classList.remove('visible')
        }, 750)

        setTimeout(() => {
            this.pages[this.current - 1].classList.remove(this.outClass)
            this.pages[this.next - 1].classList.remove(this.inClass)
            this.current = this.next
            this.onGoing = false

            if (this.queue.length > 0) {
                const i = this.queue.pop()
                this.queue = []
                this.openIndex(i)
            }
        }, 1000)
    }

    openIndex(i) {
        if (!this.onGoing && this.next !== i) {
            this.onGoing = true
            this.next = i
            this.outClass = this.current > i ? 'rotateCubeBottomOut' : 'rotateCubeTopOut'
            this.inClass = this.current > i ? 'rotateCubeBottomIn' : 'rotateCubeTopIn'
            this.show()
        }
        else if (this.next !== i) {
            this.queue.push(i)
        }
    }
}