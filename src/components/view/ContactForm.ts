import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Form } from "./Form";
import { IContactForm } from "../../types/index";

export class ContactForm extends Form<IContactForm> {
    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container, events);

        // this._email = ensureElement<HTMLInputElement>('input[name="email"]');
        // this._phone = ensureElement<HTMLInputElement>('input[name=phone]');
    }

    set email(value: string) {
        this._email.value = value;
    }

    set phone(value: string) {
        this._phone.value = value;
    }
}


// - `set email(value: string)` - записывает email в поле \_email
// - `set phone(value: string)` - записывает телефон в поле \_phone