import { createTable } from "./table.template";
import { ExcelComponent } from "../../core/ExcelComponent";
import { matrix } from "./table.functions";
import { resizeHandler } from "./table.resize"

import { TableSelection } from "./Selection";
import { $ } from "../../core/Dom";
import { Modal } from "../modal/modal";



export class Table extends ExcelComponent {
    static className = 'excel__table'
    
    constructor($root) {
        super($root, {
            listeners: ['mousedown', 'keydown', 'click']
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

                const $cells = matrix(target, current).map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
                
                textValues = $cells.map($cell => {
                    return $cell.textContent()
                })
                const $modal = $('.excel__modal');
                $modal.css({display: "flex"});

            } else {
                this.selection.select($target)
            }
        }
    }

    onClick(event) {
        const $target = $(event.target)
        const id = $target.id()
        const $cell = this.$root.find(`[data-id="${id}"]`)
    }

    onKeydown(event) {
        let $target = $(event.target);

        switch (event.key) {
            case "ArrowDown":
                const $cell = this.$root.find(`[data-id="${0}:${0}"]`)
                this.selection.selectNextRow($cell);
                $target = $cell
        }
    }
    

} 

export let textValues = [];
