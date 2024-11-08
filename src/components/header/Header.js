import { ExcelComponent } from "../../core/ExcelComponent";


export class Header extends ExcelComponent {
    static className = 'excel__header'

    //options = {name: 'blabla', listeners: blabla}
    constructor($root, options) {
        super($root, {
            name: 'Header',
            ...options
        })
    }

    toHTML() {
        return `<input type="text" class="input" value="New Table"></input>
                <div>
                    <div class="button">
                        <i class="material-icons">delete</i>
                    </div>
                    <div class="button">
                        <i class="material-icons">exit_to_app</i>
                    </div>
                </div>
                `
    }
}