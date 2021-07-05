export class Card {
    constructor({ name, link, likes = [], _id, owner },
        cardSelector,
        handleCardClick,
        openPopupDeletion,
        buttonDeleteCard,
        dislikeCards,
        likeCards) {
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._number = likes.length;
        this._owner = owner._id;
        this._id = _id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._openPopupDeletion = openPopupDeletion;
        this._buttonDeleteCard = buttonDeleteCard;
        this._dislikeCards = dislikeCards;
        this._likeCards = likeCards;
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
            this._likeCards(this._id);
        } else {
            this.numLikes.textContent = Number(this.numLikes.textContent) - Number(1);
            this._dislikeCards(this._id);
        }
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._likCard = this._element.querySelector('.element-like__like');
        this._likes.forEach(likes => {
            if (likes._id === '3763323d9d807db6f0706222') {
                this._likCard.classList.add('element-like__like_active')
            }
        });

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__text').textContent = this._name;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element-like__number').textContent = this._number;

        if (this._owner === '3763323d9d807db6f0706222') {
            return this._element;
        } else {
            this._element.querySelector('.element__button-trash').style.display = "none";
            return this._element;
        }
    }
    _setEventListeners() {
        this._element.querySelector('.element-like__like').addEventListener('click', (evt) => {
            this._setLikeCardListener(evt);
        });

        this._element.querySelector('.element__button-trash').addEventListener('click', () => {
            this._buttonDeleteCard(this._element, this._id);
            this._openPopupDeletion()
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._element);
        });
    }
}