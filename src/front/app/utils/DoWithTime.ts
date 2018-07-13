export default (action:any,argument:any, minTime: number = 750):void => {
    const startAt = +new Date()
    const delay = Math.max(0, minTime - (+new Date() - startAt))
    if (delay === 0) {
      action(argument)
    }
    else {
      setTimeout(()=>action(argument), delay)
    }
}
