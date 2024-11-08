export class Dispatcher {
    constructor() {
        //onclick, onkeydown ...
        this.listeners = {}
    }

    //Ex: dispatch, fire, trigger, emit
    //Notifying the listeners if they excist
    //table.dispatch('table:select', args = {a:1})
    dispatch(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }

    //subsribe, on, listen
    //subscribe to the notification
    //add new listener
    //formula.subscribe('table: select', () => {})
    
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        console.log(this.listeners[event])
        return () => {
            this.listeners[event] = 
                this.listeners[event].filter(listener => listener !== fn )
        }
    }
}

const dispatcher = new Dispatcher()
const unsubscribe = dispatcher.subscribe('vladilen', data => console.log('Sub:', data))
// console.log(unsubscribe())