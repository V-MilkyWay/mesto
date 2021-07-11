export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    renderItems(items, id) {
        items.forEach((item) => {
            this._renderer(item, id);
        });
    }
    addItem(card) {
        this._container.prepend(card);
    };
}