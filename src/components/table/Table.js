import { DomListener } from "../../core/DomListener";
import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from "../../core/Dom";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable()
    }


    onMousedown(event) {
        if (event.target.dataset.resize === 'col') {
            const $resizer = $(event.target)
            const $parentCol = $resizer.closest('[data-type="resizable-column"]')
            const coordsCol = $parentCol.getCoords()
            const cells = this.$root.findAll(`[data-col="${$parentCol.$el.dataset.col}"]`)

            document.onmousemove = e => {
                const deltaCol = e.pageX - coordsCol.$el.right
                const valueCol = coordsCol.$el.width + deltaCol
                $parentCol.$el.style.width = valueCol + 'px'
                cells.forEach(el => {
                    el.style.width = valueCol + 'px';
                    el.classList.add('active')
                    console.log(el)
                })
                

                document.onmouseup = (e) => {
                    document.onmousemove = null
                }
            }
        }

            if (event.target.dataset.resize === 'row') {
                const $resizer = $(event.target)
                console.log($resizer)
                const $parentRow = $resizer.closest('[data-type="resizable-row"]')
                const coordsRow = $parentRow.getCoords()

                document.onmousemove = e => {
                    const deltaRow = e.pageY - coordsRow.$el.bottom
                    const valueRow = coordsRow.$el.height + deltaRow
                    $parentRow.$el.style.height = valueRow + 'px'
                }
                document.onmouseup = (e) => {
                    document.onmousemove = null
                }
            }

    }

} 