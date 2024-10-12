import { IProduct } from '../../types';
import { Component } from '../base/component';

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface ICard extends IProduct {
  index?: number;
}

export class Card extends Component<ICard> {
  protected _title: HTMLHeadingElement;
  protected _price: HTMLSpanElement;
  protected _image: HTMLImageElement;
  protected _category?: HTMLElement;
  protected _description: HTMLElement;
  protected _buttonElement: HTMLButtonElement;

  private categoryColors: Map<string, string> = new Map([
    ['софт-скил', 'card__category_soft'],
    ['другое', 'card__category_other'],
    ['дополнительное', 'card__category_additional'],
    ['кнопка', 'card__category_button'],
    ['хард-скил', 'card__category_hard'],
  ]);

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._price = container.querySelector('.card__price');
    this._title = container.querySelector('.card__title');
    this._image = container.querySelector('.card__image');
    this._category = container.querySelector('.card__category');
    this._description = container.querySelector('.card__text');
    this._buttonElement = container.querySelector('.card__button');

    if (actions?.onClick) {
      if (this._buttonElement) {
        this._buttonElement.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  }

  setButtonText(value: string) {
    this.setText(this._buttonElement, value);
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }

  get id(): string {
    return this.container.dataset.id || '';
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  //не получится добавить бесценный товар в корзину
  set price(value: number){
    this.setText(this._price, value? `${value} синапсов` : `Бесценно`);
    if (this._buttonElement){
      this._buttonElement.disabled = !value;
    }
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }

  set category(value: string) {
    this.setText(this._category, value);
    if (this._category) {
      const categoryClass = this.categoryColors.get(value.toLowerCase());
      if (categoryClass) {
        this._category.className = `card__category ${categoryClass}`;
      }
    }
  }

  set description(value: string) {
    this.setText(this._description, value);
  }
}