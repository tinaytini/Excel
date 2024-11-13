import { createTable } from "./table.template";
import { ExcelComponent } from "../../core/ExcelComponent";
import { matrix } from "./table.functions";
import { resizeHandler } from "./table.resize"
import { TableSelection } from "./Selection";
import { $ } from "../../core/Dom";
import { Modal } from "../modal/modal";
import { nextSelector } from "./table.functions";
import * as actions from '../../redux/actions'


export class Table extends ExcelComponent {
    static className = 'excel__table'
    
    //options = {}
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
        this.unsubs = []
    }

    toHTML() {
        return createTable(20, this.store.getState())
    }

    prepare() {
        this.selection = new TableSelection()

    }

    init() {
        super.init()
        
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)
        this.$emit('table:select', $cell)

        this.$on('formula:input', (text) => {
            this.selection.current.text(text) 
        })

        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
        // this.$subscribe(state => {
        //     console.log('tableState', state)
        // })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        this.$dispatch({type: 'TEST'})
    }

    async resizeTabe(event, type) {
        try {
            const data = await resizeHandler(this.$root, event, type)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.error('table resize', e.message)
        }
        
    } 
    onMousedown(event) {
        const type = event.target.dataset.resize
        if (type) { //should resize
            this.resizeTabe(event, type)

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
                this.selectCell($target)
            }
        }
    }

    onKeydown(event) {
        const keys = [ 
            'Enter', 
            'Tab', 
            'ArrowLeft', 
            'ArrowRight', 
            'ArrowDown', 
            'ArrowUp'
        ]
        
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selection.select($next)
            this.$emit('table:select', $next)
        }

    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }

} 

export let textValues = [];
