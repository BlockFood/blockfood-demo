
export default (action:any, minTime: number = 750): Promise<any> => {
    const startAt = +new Date()

    return new Promise((resolve, reject) => {
        action()
        const delay = Math.max(0, minTime - (+new Date() - startAt))
        if (delay === 0) {
            resolve()
        }
        else {
          setTimeout(() => resolve(), delay)
        }
    })
}
