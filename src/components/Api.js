export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._authorization = options.headers.authorization;
        this._contentType = options.headers['Content-Type']
    }
    _getResponseData(res) {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        }
        //initial users
    initialUsers() {
            return fetch(`${this._baseUrl}/users/me`, {
                    headers: {
                        authorization: this._authorization
                    }
                })
                .then(res => this._getResponseData(res))
        }
        //initial card from server
    initCardsFromServer() {
            return fetch(`${this._baseUrl}/cards`, {
                    headers: {
                        authorization: this._authorization
                    }
                })
                .then(res => this._getResponseData(res));
        }
        //loading info about user on server
    loadingUserInfoOnServer({ name, about }) {
            return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': this._contentType
                },
                body: JSON.stringify({
                    name,
                    about
                })
            }).then(res => this._getResponseData(res))
        }
        //loading new cards on server 
    loadingNewCardOnServer({ name, link }) {
            return fetch(`${this._baseUrl}/cards`, {
                    method: 'POST',
                    headers: {
                        authorization: this._authorization,
                        'Content-Type': this._contentType
                    },
                    body: JSON.stringify({
                        name,
                        link
                    })
                })
                .then(res => this._getResponseData(res));
        }
        //delete cards from server
    deleteCardFromServer(cardId) {
            return fetch(`${this._baseUrl}/cards/${cardId}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: this._authorization,
                    }
                })
                .then(res => this._getResponseData(res))
        }
        //like cards
    likeCards(likeId) {
            return fetch(`${this._baseUrl}/cards/likes/${likeId}`, {
                    method: 'PUT',
                    headers: {
                        authorization: this._authorization
                    }
                })
                .then(res => this._getResponseData(res))
        }
        //dislike cards
    dislikeCards(likeId) {
            return fetch(`${this._baseUrl}/cards/likes/${likeId}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: this._authorization
                    }
                })
                .then(res => this._getResponseData(res))
        }
        //loading new avatar on server
    loadingNewAvatarOnServer({ avatar }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': this._contentType
                },
                body: JSON.stringify({
                    avatar
                })
            })
            .then(res => this._getResponseData(res))
    }
}