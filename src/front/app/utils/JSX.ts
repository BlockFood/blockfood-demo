export const preventDrag = {
    draggable: true,
    onDragStart: (e: any) => {
        e.preventDefault()
        e.stopPropagation()
    }
}