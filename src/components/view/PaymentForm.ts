import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Form } from "./Form";
import { IPaymentForm , TPayment} from "../../types/index";



export class PaymentForm extends Form<IPaymentForm> {
    protected _payment: HTMLButtonElement[];
    protected _address: HTMLInputElement;

    constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container, events);

        // this._payment = Array.from(container.querySelectorAll('button[name="payment"]')) as HTMLButtonElement[]; 
        // this._address = ensureElement<HTMLInputElement>('input[name=address]');
    }


    set paymentSelected(name: string) {

    }

    paymentSelectedRemove() {
        this._payment.forEach(button => {
            button.classList.remove('active'); 
        });
    }

    set address(value: string) {
        this._address.value = value;
    }
}



// set paymentSelected(name: string)` - вешается класс на кнопку выбранного способа оплаты и инициализируется - событие куда передается выбранный способ оплаты.
// - `paymentSelectedRemove()` - удаляет класс с активной кнопки после заказа\
// - `set address(value: string)` - записывает адрес в поле \_address