import { DomListener } from "../../core/DomListener";
import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from "../../core/Dom";
import { resizeHandler } from "./table.resize"

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
        const type = event.target.dataset.resize
        if (type) { //should resize
            resizeHandler(this.$root, event, type)
        } 
    }

} 