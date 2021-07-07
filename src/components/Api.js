export class Api {
    constructor(options) {
            this._baseUrl = options.baseUrl;
            this._authorization = options.headers.authorization;
            this._contentType = options.headers['Content-Type']
        }
        //initial users
    initialUsers() {
            return fetch(`${this._baseUrl}/users/me`, {
                    headers: {
                        authorization: this._authorization
                    }
                })
                .then(res => res.json())
                .then((result) => {
                    document.getElementById('name').textContent = result.name;
                    document.getElementById('about').textContent = result.about;
                    document.getElementById('avatar').src = result.avatar;
                });
        }
        //initial card from server
    initCardsFromServer() {
            return fetch(`${this._baseUrl}/cards`, {
                    headers: {
                        authorization: this._authorization
                    }
                })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.status}`);
                });
        }
        //loading info about user on server
    loadingUserInfoOnServer(infoName, infoJob) {
            return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': this._contentType
                },
                body: JSON.stringify({
                    name: document.querySelector(infoName).textContent,
                    about: document.querySelector(infoJob).textContent
                })
            })
        }
        //loading new cards on server 
    loadingNewCardOnServer(infoTitle, infoLink) {
            return fetch(`${this._baseUrl}/cards`, {
                    method: 'POST',
                    headers: {
                        authorization: this._authorization,
                        'Content-Type': this._contentType
                    },
                    body: JSON.stringify({
                        name: document.querySelector(infoTitle).value,
                        link: document.querySelector(infoLink).value,
                    })
                })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.status}`);
                });
        }
        //delete cards from server
    deleteCardFromServer(cardId) {
            return fetch(`${this._baseUrl}/cards/${cardId}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: this._authorization,
                    }
                })
                .catch((err) => {
                    renderError(`Ошибка: ${err}`);
                });
        }
        //like cards
    likeCards(likeId) {
            return fetch(`${this._baseUrl}/cards/likes/${likeId}`, {
                    method: 'PUT',
                    headers: {
                        authorization: this._authorization
                    }
                })
                .catch((err) => {
                    renderError(`Ошибка: ${err}`);
                });
        }
        //dislike cards
    dislikeCards(likeId) {
            return fetch(`${this._baseUrl}/cards/likes/${likeId}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: this._authorization
                    }
                })
                .catch((err) => {
                    renderError(`Ошибка: ${err}`);
                });
        }
        //loading new avatar on server
    loadingNewAvatarOnServer(infoAvatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: this._authorization,
                    'Content-Type': this._contentType
                },
                body: JSON.stringify({
                    avatar: document.querySelector(infoAvatar).src
                })
            })
            .catch((err) => {
                renderError(`Ошибка: ${err}`);
            })
    }
}