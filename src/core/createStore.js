export class CreateStore {
    constructor(rootReducer, initialState={}) {
        this.rootReducer = rootReducer
        this.state = this.rootReducer({...initialState}, {type: '__INIT__'});
        this.listeners = []
    }

    subscribe(fn) {
        this.listeners.push(fn)
        return {
            unsubscribe: () => {
                this.listeners = this.listeners.filter(l => l !== fn)
            }
        }
    }
    dispatch(action) {
        this.state = this.rootReducer(this.state, action) //reducer has two parameteres: state and action
        this.listeners.forEach(listener => listener(this.state))
    }
    getState() {
        return this.state
    }
    
}