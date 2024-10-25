export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null

    }
    //$el instance of DOM
    select($el) {
        this.clear()  
        this.group.push($el)
        this.current = $el
        $el.addClassName(TableSelection.className)
    }

    clear($el) {
        this.group.forEach($el => $el.removeClassName(TableSelection.className))
        this.group = []
    }
    selectGroup() {

    }
}