
import { Component } from '../base/component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';


export interface ICard {
  id: string;
  title: string;
  image: string;
  price: number | null;
  category: string;
  description?: string;
  index?: number;

}

export class Card extends Component<ICard> {
  protected _id: string;
  protected _title: HTMLHeadingElement;
  protected _price: HTMLSpanElement;
  protected _image: HTMLImageElement;
  protected _category: HTMLSpanElement;

  constructor(container: HTMLElement, events: IEvents) {

    super(container);
    this.events = events;
    this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this._price = ensureElement<HTMLSpanElement>('.card__price', container);
    this._category = ensureElement<HTMLSpanElement>('.card__category', container);


  this.container.addEventListener('click', () => {
      console.log('Клик по карточке, id:', this.id); // Логирование
      this.events.emit('modal-card:open', { id: this.id });
    });
  }


  set id(value: string) {
    this.container.dataset.id = value;  }

  get id(): string {
    return this.container.dataset.id || '';
  }

  set title(value: string) {
    this.setText(this._title, value);
  }


  set price(value: number | null) {
    if (value === null) {
      this.setText(this._price, 'Бесценно');
    } else {
      this.setText(this._price, `  ${value} синапсов`);
    }
  }

  set image(src: string) {
    this._image.src = src;
    this._image.alt = this.title
  }

  set category(value: string) {
    this.setText(this._category, value);
  }
}




export class CardPreview extends Card {

  // protected _index: HTMLElement;
  protected _description: HTMLElement;
  buttonElement: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this._description = ensureElement<HTMLElement>('.card__text', container);
    // this._index = ensureElement<HTMLElement>('.basket__item-index', container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', container);
    this.buttonElement.addEventListener('click', () => {
      if(this.buttonElement.textContent.trim().toLowerCase() === 'В корзину'.trim().toLowerCase()) {this.events.emit('purchases:add', {id: this.id})}
      else {this.events.emit('purchases:delete', {id: this.id})}
    })
  }


  set description(value: string) {
    this._description.textContent = value
  }

}