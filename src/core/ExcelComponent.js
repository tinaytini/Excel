import { DomListener } from '../core/DomListener'

export class ExcelComponent extends DomListener {
    //options: {name, listener, emitter}
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubs = []
        this.store = options.store
        this.storeSub = null
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
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    //subscribing for event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubs.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    $subscribe(fn) {
        this.storeSub = this.store.subscribe(fn)
    }

    //init component
    //adding DOM listeners
    init() {
        this.initDOMListeners()
    }

    remove() {
        this.removeDOMListeners()
        this.unsubs.forEach(unsub => unsub())
        this.store.unsubscribe()
    }
} 