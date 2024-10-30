import { ExcelComponent } from "../../core/ExcelComponent";
import openapiCall from "../../services/openapi";
import { textValues } from "../table/Table";
import { $ } from "../../core/Dom";



export class Modal extends ExcelComponent {
    static className = 'excel__modal'

    constructor($root) {
        super($root, {
            listeners: ['click']
        })
        this.aiResult = '';
    }

    toHTML() {
        return `
            <div class="modal" data-modal="modal">
                <h2>AI Calculator</h2>
                <div class="modal__result">${this.aiResult}</div>
                ${this.aiResult
                    ? ''
                    : `
                    <div class="inputWrap">
                        <input type="text" class="modal__input" value="" />
                        <button class="ask-btn">Ask</button>
                    </div>
                    `
                }
                <button class="modal__close">Close</button>
            </div>
        `
    }
    init() {
        super.init()
    }


    async onClick(event) {
        if (event.target.classList.contains('ask-btn')) {
            const $askValue = $('.modal__input');
            const inputValue = $askValue.$el.value;

            this.aiResult = await openapiCall(`${textValues.join(' ')} ${inputValue}`);
            
            this.$root.$el.innerHTML = this.toHTML();
        }

        if (event.target.classList.contains('modal__close')) {
            this.closeModal();
        }
    }

    //close the modal
    closeModal() {
        this.$root.$el.innerHTML = '';
        const $modal = $('.excel__modal');
        $modal.css({display: "none"});
    }
}