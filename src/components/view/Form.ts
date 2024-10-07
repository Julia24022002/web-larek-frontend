import { ensureElement } from '../../utils/utils';
import { Component } from '../base/component';
import { IEvents } from '../base/events';


// Интерфейс для формы
export interface IForm {
    valid: boolean;
    errorMessage: string;
}


export abstract class Form<T> extends Component<IForm> {
    protected container: HTMLFormElement;
    protected submitButton: HTMLButtonElement;
    protected _errorMessage: HTMLSpanElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', container);
        this._errorMessage = ensureElement<HTMLSpanElement>('.form__errors', container);

    }

    // get valid(): boolean {
    //     return !this.submitButton.disabled;
    // }

    set valid(value: boolean) {
        this.submitButton.disabled = value;
    }

    // Установка смс об ошибке
    set errorMessage(value: string) {
        this._errorMessage.textContent = value
    }

    // очистка формы
    clear(): void {
        this.container.reset();
        this.errorMessage = '';
    }


    // render() {

    // }
}




//   `get valid(): boolean `- получения статуса валидности формы
// - `set valid(value: boolean):void` - запись для блокировки (true) / разблокировки (false) кнопки submit
// - `set errorMessage(value: string)`- установка текста ошибок
// - `clear():void` - очистка формы
// - `render()` - метод рендер для формы