import { DomListener } from "../../core/DomListener";
import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from "../../core/Dom";
import { resizeHandler } from "./table.resize"
import { TableSelection } from "./Selection";

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

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        const $cell = this.$root.find('[data-id="0:0"]')
        console.log($cell)
        this.selection.select($cell)
    }


    onMousedown(event) {
        const type = event.target.dataset.resize
        if (type) { //should resize
            resizeHandler(this.$root, event, type)

            //cell selection
        } else if (event.target.dataset.type === 'cell') {
            const $target = $(event.target)
            if (event.shiftKey) {
                const target = $target.id(true)
                const current = this.selection.current.id(true)

                const cols = range(current.col, target.col)
                const rows = range(current.row, target.row)

                const ids = cols.reduce((acc, col) => {
                    rows.forEach(row => acc.push(`${row}:${col}`))
                    return acc
                }, [])
                console.log(ids)
            } else {
                this.selection.select($target)

            }
        }
    }

} 
const range = (start, end) => {
    if (start > end) {
        [] = [start, end]
        [end, start] = [start, end]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) =>  start + index)
}
//input: 0, 3
//output: [0, 1, 2, 3]