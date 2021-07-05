export class Card {
    constructor({ name, link, likes }, cardSelector, handleCardClick, openPopupDeletion, buttonDeleteCard) {
        this._name = name;
        this._link = link;
        this._number = likes.length
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._openPopupDeletion = openPopupDeletion;
        this._buttonDeleteCard = buttonDeleteCard;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }
    _setLikeCardListener(evt) {
        this.numLikes = this._element.querySelector('.element-like__number');
        if (
            evt.target.classList.toggle('element-like__like_active')) {
            this.numLikes.textContent = Number(this.numLikes.textContent) + Number(1);
        } else {
            this.numLikes.textContent = Number(this.numLikes.textContent) - Number(1);
        }
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element-like__number').textContent = this._number;
        return this._element;
    }
    _setEventListeners() {
        this._element.querySelector('.element-like__like').addEventListener('click', (evt) => {
            this._setLikeCardListener(evt);
        });

        this._element.querySelector('.element__button-trash').addEventListener('click', () => {
            this._buttonDeleteCard(this._element);
            this._openPopupDeletion()
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._element);
        });
    }
}