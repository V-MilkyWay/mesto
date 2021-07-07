export class Api {
    constructor(options) {
            this._options = options
        }
        /*
        {
          baseUrl: 'https://nomoreparties.co/v1/cohort-25',
          headers: {
            authorization: '3f7400de-4faa-456b-995e-bfe48f676c49',
            'Content-Type': 'application/json'
          }
        }); 
        */
        //initial users
    initialUsers() {
        return fetch(`${this._options.baseUrl}/users/me`, {
                headers: {
                    authorization: this._options.headers.authorization
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
        return fetch(`${this._options.baseUrl}/cards`, {
                headers: {
                    authorization: this._options.headers.authorization
                }
            })
            .then(res => res.json())
    }

    //loading info about user on server
    loadingUserInfoOnServer(infoName, infoJob) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._options.headers.authorization,
                'Content-Type': this._options.headers['Content-Type']
            },
            body: JSON.stringify({
                name: document.querySelector(infoName).textContent,
                about: document.querySelector(infoJob).textContent
            })
        })
    }

    //loading new cards on server 
    loadingNewCardOnServer(infoTitle, infoLink) {
        return fetch(`${this._options.baseUrl}/cards`, {
                method: 'POST',
                headers: {
                    authorization: this._options.headers.authorization,
                    'Content-Type': this._options.headers['Content-Type']
                },
                body: JSON.stringify({
                    name: document.querySelector(infoTitle).value,
                    link: document.querySelector(infoLink).value,
                })
            })
            .then(res => res.json())
    }

    //delete cards from server
    deleteCardFromServer(cardId) {
        return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._options.headers.authorization,
                }
            })
            .catch((err) => {
                renderError(`Ошибка: ${err}`);
            });
    }

    //like cards
    likeCards(likeId) {
        return fetch(`${this._options.baseUrl}/cards/likes/${likeId}`, {
                method: 'PUT',
                headers: {
                    authorization: this._options.headers.authorization
                }
            })
            .catch((err) => {
                renderError(`Ошибка: ${err}`);
            });
    }

    //dislike cards
    dislikeCards(likeId) {
        return fetch(`${this._options.baseUrl}/cards/likes/${likeId}`, {
                method: 'DELETE',
                headers: {
                    authorization: this._options.headers.authorization
                }
            })
            .catch((err) => {
                renderError(`Ошибка: ${err}`);
            });
    }

    //loading new avatar on server
    loadingNewAvatarOnServer(infoAvatar) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: {
                    authorization: this._options.headers.authorization,
                    'Content-Type': this._options.headers['Content-Type']
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