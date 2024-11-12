import { $ } from "../../core/Dom";

export function resizeHandler($root, event, type) {
    return new Promise(resolve => {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        let value;
        const cells = $root.findAll(`[data-col="${$parent.$el.dataset.col}"]`)
        const sideProp = type === 'col' ? 'bottom' : 'right'
        $resizer.css({
            opacity: 1,
            zIndex: 1000,
            [sideProp]: '-5000px'
        })


        document.onmousemove = e => {
            if (type === 'col') {
                const deltaCol = e.pageX - coords.$el.right
                value = coords.$el.width + deltaCol
                $resizer.css({ right: -deltaCol + 'px' })
            } else {
                const deltaRow = e.pageY - coords.$el.bottom
                value = coords.$el.height + deltaRow
                $resizer.css({ bottom: -deltaRow + 'px' })
            }

            document.onmouseup = (e) => {
                if (type === 'col') {
                    $parent.css({ width: value + 'px' })
                    cells.forEach(el => {
                        el.style.width = value + 'px';
                    })
                }
                if (type === 'row') {
                    $parent.css({ height: value + 'px' })
                }

                resolve({
                    value,
                    id: type === 'col' ? $parent.$el.dataset.col : null
                })
                document.onmousemove = null
                document.onmouseup = null
                $resizer.css({
                    opacity: 0,
                    bottom: 0,
                    right: 0,
                })

            }
        }
    })

}