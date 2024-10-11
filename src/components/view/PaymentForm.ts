import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Form } from "./Form";
import { IPaymentForm, TPayment } from "../../types/index";

export class PaymentForm extends Form<IPaymentForm> {
    protected _address: HTMLInputElement;
    protected buttonCard: HTMLButtonElement;
    protected buttonCash: HTMLButtonElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container, events);

        this._address = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
        this.buttonCard = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.buttonCash = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);

        this.buttonCard.addEventListener('click', () => {
            this.payment = 'card';
            this.onInputChange('payment', 'card');
        });

        this.buttonCash.addEventListener('click', () => {
            this.payment = 'cash';
            this.onInputChange('payment', 'cash');
        });
    }

    set address(value: string) {
        this._address.value = value;
    }

    set payment(value: TPayment) {
        this.buttonCard.classList.toggle('button_alt-active', value === 'card');
        this.buttonCash.classList.toggle('button_alt-active', value === 'cash');
    }
}


