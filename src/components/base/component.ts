export abstract class Component<T> {
    protected container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    // Переключает класс для переданного элемента.
    toggleClass(element: HTMLElement, className: string): void {
        element.classList.toggle(className);
    }

    // Устанавливает текстовое содержимое для переданного элемента.
    setText(element: HTMLElement, value: unknown) {
        if (element) {
            element.textContent = String(value);
        }
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

    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}
