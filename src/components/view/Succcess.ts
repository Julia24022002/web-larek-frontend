import { ensureElement } from '../../utils/utils';
import { Component } from '../base/component';
import { IOrderResult } from '../../types/index'

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<IOrderResult> {
    protected _total: HTMLElement;
    protected button: HTMLButtonElement;

    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);

        this._total = ensureElement<HTMLElement>(
            '.order-success__description',
            this.container
        );

        this.button = ensureElement<HTMLButtonElement>(
            '.order-success__close',
            this.container
        );

        if (actions?.onClick) {
            this.button.addEventListener('click', actions.onClick);
        }
    }

    set total(total: number) {
        this._total.textContent = `Списано ${total} синапсов`
    }
}
