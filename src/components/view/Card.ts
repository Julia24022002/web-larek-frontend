import { Component } from '../base/component';

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

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
  protected _title: HTMLHeadingElement;
  protected _price: HTMLSpanElement;
  protected _image: HTMLImageElement;
  protected _category?: HTMLElement;
  protected _description: HTMLElement;
  protected _buttonElement: HTMLButtonElement;

  private categoryColors: Map<string, string> = new Map([
    ['софт-скил', '#83FA9D'],
    ['другое', '#FAD883'],
    ['дополнительное', '#B783FA'],
    ['кнопка', '#83DDFA'],
    ['хард-скил', '#FAA083'],
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

    if (this._category) {
      const colorCategory = this.categoryColors.get(value.toLowerCase());

      if (colorCategory) {
        this._category.style.backgroundColor = colorCategory;
      }
    }
  }

  set description(value: string) {
    this.setText(this._description, value);
  }
}