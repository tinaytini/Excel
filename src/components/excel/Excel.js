import { $ } from '../../core/Dom'
import { Dispatcher } from '../../core/Dispatcher'

export class Excel {
    constructor(selector, options) { 
        this.$el = $(selector)
        this.components = options.components || []
        //dispatcher
        this.dispatcher = new Dispatcher()
    }

    getRoot() {
        const $root = $.create('div', 'excel')

        //dispatcher
        const componentOptions = {
            dispatcher: this.dispatcher
        }

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })

        return $root
    }

    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(component => component.init())
    }

    destroy() {
        this.components.forEach(component => component.remove())
    }
}