import { IEvents } from '../base/events';
import { Form } from "./Form";
import { IContactForm } from "../../types/index";

export class ContactForm extends Form<IContactForm> {
    protected _email: HTMLInputElement;
    protected _phone: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this._email = container.querySelector(
            'input[name="email"]'
        ) as HTMLInputElement;
        this._phone = container.querySelector(
            'input[name="phone"]'
        ) as HTMLInputElement;
    }

    set email(value: string) {
        this._email.value = value;
    }

    set phone(value: string) {
        this._phone.value = value;
    }
}
