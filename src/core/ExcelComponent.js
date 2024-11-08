import { DomListener } from '../core/DomListener'

export class ExcelComponent extends DomListener {
    //options: {name, listener, dispatcher}
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.dispatcher = options.dispatcher
        this.unsubs = []

        this.prepare()
    }
    // prepareing the component before init
    prepare() {
        
    }



    // return HTML template
    toHTML() {
        return ''
    }
    //notifying listeners about event
    $dispatch(event, ...args) {
        this.dispatcher.dispatch(event, ...args)
    }

    //subscribing for event
    $on(event, fn) {
        const unsub = this.dispatcher.subscribe(event, fn)
        this.unsubs.push(unsub)
    }


    //init component
    //adding DOM listeners
    init() {
        this.initDOMListeners()
    }

    remove() {
        this.removeDOMListeners()
        this.unsubs.forEach(unsub => unsub())
    }
} 