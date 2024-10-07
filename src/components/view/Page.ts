import { ensureElement } from '../../utils/utils';
import { Component } from '../base/component';
import { IEvents } from '../base/events';

export interface IPage {
    catalog: HTMLElement[];
    counter: number;
    locked: boolean;
}

export class Page extends Component<IPage> {
    protected _catalog: HTMLElement;
    protected buttonBasket: HTMLButtonElement;
    protected _counter: HTMLSpanElement;
    protected screen: HTMLDivElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._catalog = ensureElement<HTMLElement>('.gallery',container);
        this.buttonBasket = ensureElement<HTMLButtonElement>('.header__basket', container);
        this._counter = ensureElement<HTMLSpanElement>('.header__basket-counter', container);
        this.screen = ensureElement<HTMLDivElement>('.page__wrapper', container);

        this.buttonBasket.addEventListener('click', () => {
            this.events.emit('modal-basket:open')
        })

    }
    // записывает карточки
    set catalog(cards: HTMLElement[]) {
        this._catalog.replaceChildren(...cards)
    }

    set counter(value: number) {
        this._counter.textContent = String(value);
    }

    set locked(value: boolean) {
        if (value) {
            this.screen.classList.add('page__wrapper_locked'); //блокируем экран
        } else {
            this.screen.classList.remove('page__wrapper_locked'); //разбл экран
        }
    }
}


// - `set catalog(cards: HTMLElement[]): void` - записывает карточки в \_catalog для отображения их на главной странице
// - `set counter(value: number): void `- записывает количество добавленных товаров в корзину
// - `set locked(value: boolean): void` - данный метод служит для блокировки/разблокировки экрана(окна), чтоб не было его прокрутки при открытии/закрытии модального окна.