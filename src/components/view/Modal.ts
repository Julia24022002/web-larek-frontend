import { ensureElement } from '../../utils/utils';
import { Component } from '../base/component';
import { IEvents } from '../base/events';

export interface IModal {
    content: HTMLElement;
}

export class Modal extends Component<IModal> {
    protected _content: HTMLElement;
    protected _closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._content = ensureElement<HTMLElement>('.modal__content', container);
        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._closeButton.addEventListener('click', () => this.close());
        this.container.addEventListener('mousedown', (evt) => {
			if (evt.target === evt.currentTarget) {
				this.close();
			}
		});
    }

    set content(value: HTMLElement) {
        this._content.innerHTML = '';
        this._content.appendChild(value);
    }

    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close() {
        this.container.classList.remove('modal_active');
        this.events.emit('modal:close');
    }
}
