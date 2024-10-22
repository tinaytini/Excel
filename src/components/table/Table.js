import { DomListener } from "../../core/DomListener";
import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";

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

    onMousedown() {
        console.log(event.target.getAttribute('data-resize'))
        if (event.target.dataset.resize) {
            console.log('resize')
        }
    }

} 