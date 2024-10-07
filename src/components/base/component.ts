import { IEvents } from './events';

export abstract class Component<T> {
    protected container: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    // Переключает класс для переданного элемента.
    toggleClass(element: HTMLElement, className: string): void {
        element.classList.toggle(className);
    }
    
    // Устанавливает текстовое содержимое для переданного элемента.
    setText(element: HTMLElement, text: string): void {
        element.textContent = text;
    }

    // Устанавливает изображения и альтернативный текст
    setImage(element: HTMLImageElement, src: string, alt: string): void {
        element.src = src;
        element.alt = alt;
    }

    // Изменяет статус блокировки для переданного элемента.
    setDisabled(element: HTMLElement, disabled: boolean): void {
        (element as HTMLButtonElement).disabled = disabled;
    }

    // Скрывает переданный элемент.
    setHidden(element: HTMLElement): void {
        element.style.display = 'none';
    }

    // Отображает переданный элемент.
    setVisible(element: HTMLElement): void {
        element.style.display = 'block';
    }

    // Абстрактный метод для рендеринга компонентаА
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
      }
    }




// - `toggleClass` - переключает класс для переданного элемента.
// - `setText` - устанавливает текстовое содержимое для переданного элемента.
// - `setImage` - устанавливает изображения и альтернативный текст для изоображения для переданного элемента типа HTMLImageElement
// - `setDisabled` - изменяет статус блокировки для переданного элемента.
// - `setHidden` - скрывает переданный элемент.
// - `setVisible` - отоброжает переданный элемент.
// - `render` - рендерит компонент, используя переданные данные. Метод должен быть переназначен в дочерних классах.