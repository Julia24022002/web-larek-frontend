import { Card } from './Card';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export interface ICardCatalog {
	image: string;
	category: string;
}

type TCategoryClassNames =
	| 'card__category_soft'
	| 'card__category_other'
	| 'card__category_additional'
	| 'card__category_button'
	| 'card__category_hard';
type TCategoryClasses = Record<string, TCategoryClassNames>;

export class CardCatalog<T> extends Card<T> implements ICardCatalog {
	protected _image: HTMLImageElement;
	protected _category: HTMLSpanElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
		this._category = ensureElement<HTMLSpanElement>(
			'.card__category',
			container
		);
		this.container.addEventListener('click', () =>
			this.events.emit('modal-card:open', { id: this.id })
		);
	}

	protected addCSSClassCategory(value: string) {
		const categoryCSSClassData: TCategoryClasses = {
			'софт-скил': 'card__category_soft',
			дополнительное: 'card__category_additional',
			'хард-скил': 'card__category_hard',
			кнопка: 'card__category_button',
			другое: 'card__category_other',
		};
		if (value in categoryCSSClassData) {
			this._category.classList.add(categoryCSSClassData[value]);
		}
	}

	set image(src: string) {
		this._image.src = src;
		this._image.alt = this.title;
	}

	set category(value: string) {
		this._category.textContent = value;
		this.addCSSClassCategory(value);
	}

	// get category() {
	// 	return this._category.textContent ?? '';
	// }
}
