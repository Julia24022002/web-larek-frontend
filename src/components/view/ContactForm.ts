import { Form } from './Form';
import { IOrderContactForm } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class ContactForm extends Form<IOrderContactForm> {
	static clear() {
		throw new Error('Method not implemented.');
	}
	protected inputEmail: HTMLInputElement;
	protected inputPhone: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this.inputEmail = ensureElement<HTMLInputElement>(
			'input[name=email]',
			container
		);
		this.inputPhone = ensureElement<HTMLInputElement>(
			'input[name=phone]',
			container
		);
	}

	get email() {
		return this.inputEmail.value;
	}

	get phone() {
		return this.inputPhone.value;
	}

	get valid() {
		const isInputEmail = Boolean(this.inputEmail.value);
		const isInputPhone = Boolean(this.inputPhone.value);
		if (isInputEmail && isInputPhone) {
			this.errorMessage = '';
			return false;
		} else if (super.valid) {
			this.errorMessage = 'Заполните поля эл. почты и телефона';
			return true;
		} else if (!isInputEmail && isInputPhone) {
			this.errorMessage = 'Заполните поле эл. почты';
			return true;
		} else if (isInputEmail && !isInputPhone) {
			this.errorMessage = 'Заполните поле телефона';
			return true;
		}
	}

	set valid(value: boolean) {
		super.valid = value;
	}
}
