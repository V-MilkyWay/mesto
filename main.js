(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o,i,a,u){var c=e.name,s=e.link,l=e.likes,f=void 0===l?[]:l,p=e._id,_=e.owner;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=c,this._link=s,this._likes=f,this._number=f.length,this._owner=_._id,this._id=p,this._cardSelector=n,this._handleCardClick=r,this._dislikeCards=o,this._likeCards=i,this._buttonDeleteCard=a,this._myId=u._id}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(!0)}},{key:"_setLikeCardListener",value:function(){this._checkLikes(this._likes)?this._dislikeCards(this,this._id):this._likeCards(this,this._id)}},{key:"_checkLikes",value:function(e){var t=this;return null==e?void 0:e.some((function(e){return e._id===t._myId}))}},{key:"_numLikesElement",value:function(){return this._numLikes=this._element.querySelector(".element-like__number"),this._numLikes}},{key:"showLikes",value:function(e){this._checkLikes(e)?(this._likCard.classList.add("element-like__like_active"),this._likes=e,this._numLikesElement().textContent=Number(this._numLikesElement().textContent)+Number(1)):(this._likCard.classList.remove("element-like__like_active"),this._likes=e,this._numLikesElement().textContent=Number(this._numLikesElement().textContent)-Number(1))}},{key:"deleteСard",value:function(){this._element.remove()}},{key:"generateCard",value:function(){var e=this;return this._element=this._getTemplate(),this._setEventListeners(),this._likCard=this._element.querySelector(".element-like__like"),this._likes.forEach((function(t){t._id===e._myId&&e._likCard.classList.add("element-like__like_active")})),this._element.querySelector(".element__image").src=this._link,this._element.querySelector(".element__text").textContent=this._name,this._element.querySelector(".element__image").alt=this._name,this._element.querySelector(".element-like__number").textContent=this._number,this._owner===this._myId||(this._element.querySelector(".element__button-trash").style.display="none"),this._element}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".element-like__like").addEventListener("click",(function(){e._setLikeCardListener()})),this._element.querySelector(".element__button-trash").addEventListener("click",(function(){e._buttonDeleteCard(e,e._id)})),this._element.querySelector(".element__image").addEventListener("click",(function(){e._handleCardClick(e._element)}))}}])&&e(n.prototype,r),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var o=function(){function e(t,n){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r(this,"_showInputError",(function(e,t){var n=o._element.querySelector(".".concat(e.id,"-error"));e.classList.add(o._selectors.inputErrorClass),n.textContent=t,n.classList.add(o._selectors.errorClass)})),r(this,"_hideInputError",(function(e){var t=o._element.querySelector(".".concat(e.id,"-error"));e.classList.remove(o._selectors.inputErrorClass),t.classList.remove(o._selectors.errorClass),t.textContent=""})),r(this,"_checkInputValidity",(function(e){e.validity.valid?o._hideInputError(e):o._showInputError(e,e.validationMessage)})),this._selectors=t,this._element=n}var t,o;return t=e,(o=[{key:"_setEventListeners",value:function(){var e=this;this._inputList=Array.from(this._element.querySelectorAll(this._selectors.inputSelector)),this._buttonElement=this._element.querySelector(this._selectors.submitButtonSelector),this.toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e.toggleButtonState()}))}))}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.classList.add(this._selectors.inactiveButtonClass),this._buttonElement.disabled=!0):(this._buttonElement.classList.remove(this._selectors.inactiveButtonClass),this._buttonElement.disabled=!1)}},{key:"enableValidation",value:function(){this._selectors,this._element,this._element.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}])&&n(t.prototype,o),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e,t){var n=this;e.forEach((function(e){n._renderer(e,t)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&i(t.prototype,n),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t){var n,r,o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(e){"Escape"===e.key&&o.closePopup()},(n="_handleEscClose")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r,this._popup=document.querySelector(t)}var t,n;return t=e,(n=[{key:"popupName",value:function(){return this._popup}},{key:"openPopup",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"closePopup",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._popup.querySelector(".popup__close-button").addEventListener("click",(function(){e.closePopup()})),this._popup.addEventListener("click",(function(t){t.target===e._popup&&e.closePopup()}))}}])&&u(t.prototype,n),e}();function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t,n){return(f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=h(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=h(r);if(o){var n=h(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return _(this,e)});function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),i.call(this,e)}return t=a,(n=[{key:"openPopup",value:function(e){var t=this._popup.querySelector(".form-image__image"),n=this._popup.querySelector(".form-image__text"),r=e.querySelector(".element__image"),o=e.querySelector(".element__text");t.src=r.src,t.textContent=o.alt,n.textContent=o.textContent,f(h(a.prototype),"openPopup",this).call(this)}}])&&l(t.prototype,n),a}(c);function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t,n){return(v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=g(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function k(e,t){return!t||"object"!==d(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=g(r);if(o){var n=g(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return k(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._submitForm=t,n}return t=a,(n=[{key:"_getInputValues",value:function(){for(var e=this._popup.querySelectorAll(".form__input"),t={},n=0;n<e.length;n++){var r=e.item(n);t[r.name]=r.value}return t}},{key:"setEventListeners",value:function(){var e=this;this._data=this._getInputValues,this._popup.querySelector(".form").addEventListener("submit",(function(t){e._submitForm(t,e._data())})),v(g(a.prototype),"setEventListeners",this).call(this)}},{key:"closePopup",value:function(){this._popup.querySelector(".form").reset(),v(g(a.prototype),"closePopup",this).call(this)}}])&&m(t.prototype,n),a}(c);function w(e){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function E(e,t,n){return(E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function L(e,t){return(L=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function O(e,t){return!t||"object"!==w(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function P(e){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var q=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&L(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=P(r);if(o){var n=P(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return O(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._deleteCardFromServer=t,n}return t=a,(n=[{key:"openPopup",value:function(e,t){E(P(a.prototype),"openPopup",this).call(this),this._card=e,this._cardId=t}},{key:"deleteEventListener",value:function(){var e=this;this._popup.querySelector(".form").addEventListener("submit",(function(t){e._deleteCardFromServer(t,e._card,e._cardId)}))}},{key:"closePopup",value:function(){this._popup.querySelector(".form").reset(),E(P(a.prototype),"closePopup",this).call(this)}}])&&C(t.prototype,n),a}(c);function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var R=function(){function e(t){var n=t.infoName,r=t.infoJob,o=t.infoAvatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(n),this._about=document.querySelector(r),this._avatar=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,about:this._about.textContent,avatar:this._avatar.src}}},{key:"setUserInfo",value:function(e){this._name.textContent=e.name,this._about.textContent=e.about}},{key:"setAvatarLink",value:function(e){this._avatar.src=e.avatar}}])&&j(t.prototype,n),e}();function I(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var T=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._authorization=t.headers.authorization,this._contentType=t.headers["Content-Type"]}var t,n;return t=e,(n=[{key:"_getResponseData",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"initialUsers",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/users/me"),{headers:{authorization:this._authorization}}).then((function(t){return e._getResponseData(t)}))}},{key:"initCardsFromServer",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/cards"),{headers:{authorization:this._authorization}}).then((function(t){return e._getResponseData(t)}))}},{key:"loadingUserInfoOnServer",value:function(e){var t=this,n=e.name,r=e.about;return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:{authorization:this._authorization,"Content-Type":this._contentType},body:JSON.stringify({name:n,about:r})}).then((function(e){return t._getResponseData(e)}))}},{key:"loadingNewCardOnServer",value:function(e){var t=this,n=e.name,r=e.link;return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:{authorization:this._authorization,"Content-Type":this._contentType},body:JSON.stringify({name:n,link:r})}).then((function(e){return t._getResponseData(e)}))}},{key:"deleteCardFromServer",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:{authorization:this._authorization}}).then((function(e){return t._getResponseData(e)}))}},{key:"likeCards",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:{authorization:this._authorization}}).then((function(e){return t._getResponseData(e)}))}},{key:"dislikeCards",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:{authorization:this._authorization}}).then((function(e){return t._getResponseData(e)}))}},{key:"loadingNewAvatarOnServer",value:function(e){var t=this,n=e.avatar;return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:{authorization:this._authorization,"Content-Type":this._contentType},body:JSON.stringify({avatar:n})}).then((function(e){return t._getResponseData(e)}))}}])&&I(t.prototype,n),e}(),x=document.querySelector("#profile"),B=document.querySelector("#addCard"),D=document.querySelector("#redactAvatar"),U=document.querySelector(".profile-info__edit-button"),z=document.querySelector(".profile__add-button"),N=document.querySelector(".profile-avatar__redact-button"),A=document.querySelector(".popup_type_redact"),F=document.querySelector(".popup_type_redact-avatar"),V=document.querySelector(".popup_type_add-card"),J=document.querySelector(".form__input_type_name"),H=document.querySelector(".form__input_type_job"),M={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__save-button",inactiveButtonClass:"form__save-button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_type_active",infoRedactName:".form__input_type_name",infoName:".profile-info__name",infoRedactJob:".form__input_type_job",infoJob:".profile-info__job",infoAvatar:".profile-avatar__image",infoNewAvatar:".form__input_type_avatar",elements:".elements",infoTitle:".form__input_type_title",infoLink:".form__input_type_link",formloading:".form__loading"},G=new o(M,x),K=new o(M,B),Q=new o(M,D);G.enableValidation(),Q.enableValidation(),K.enableValidation(),K.toggleButtonState();var W=new S(".popup_type_redact",(function(e,t){e.preventDefault(),se(!0,A),function(e){ae.loadingUserInfoOnServer({name:e.name,about:e.about}).then((function(e){ee.setUserInfo(e),W.closePopup()})).catch((function(e){ie("Ошибка: ".concat(e))})).finally((function(){se(!1,A)}))}(t)})),X=new S(".popup_type_add-card",(function(e,t){e.preventDefault(),se(!0,V),function(e){ae.loadingNewCardOnServer({name:e.title,link:e.link}).then((function(e){te.addItem(re(e,e.owner)),X.closePopup()})).catch((function(e){ie("Ошибка: ".concat(e))})).finally((function(){se(!1,V)}))}(t),G.toggleButtonState(),K.toggleButtonState()})),Y=new S(".popup_type_redact-avatar",(function(e,t){e.preventDefault(),se(!0,F),function(e){ae.loadingNewAvatarOnServer({avatar:e.avatar}).then((function(e){ee.setAvatarLink(e),Y.closePopup()})).catch((function(e){ie("Ошибка: ".concat(e))})).finally((function(){se(!1,F)}))}(t),Q.toggleButtonState()})),Z=new q(".popup_type_deletion",(function(e,t,n){e.preventDefault(),function(e,t){ae.deleteCardFromServer(t).then((function(){e.deleteСard(),Z.closePopup(e,t)})).catch((function(e){ie("Ошибка: ".concat(e))}))}(t,n)})),$=new y(".popup_type_image"),ee=new R(M),te=new a({renderer:function(e,t){te.addItem(re(e,t))}},M.elements);function ne(e,t){Z.openPopup(e,t),Z.deleteEventListener()}function re(e,n){return new t(e,"#card-template",oe,ce,ue,ne,n).generateCard()}function oe(e){$.openPopup(e)}function ie(e){result.textContent="",error.textContent=e}U.addEventListener("click",(function(){var e=ee.getUserInfo();J.value=e.name,H.value=e.about,G.toggleButtonState(),W.openPopup()})),z.addEventListener("click",(function(){K.toggleButtonState(),X.openPopup()})),N.addEventListener("click",(function(){Q.toggleButtonState(),Y.openPopup()})),Y.setEventListeners(),W.setEventListeners(),Z.setEventListeners(),X.setEventListeners(),$.setEventListeners();var ae=new T({baseUrl:"https://nomoreparties.co/v1/cohort-25",headers:{authorization:"3f7400de-4faa-456b-995e-bfe48f676c49","Content-Type":"application/json"}});function ue(e,t){ae.likeCards(t).then((function(t){e.showLikes(t.likes)})).catch((function(e){ie("Ошибка: ".concat(e))}))}function ce(e,t){ae.dislikeCards(t).then((function(t){e.showLikes(t.likes)})).catch((function(e){ie("Ошибка: ".concat(e))}))}function se(e,t){e?(t.querySelector(M.formloading).classList.add("form__loading_visible"),t.querySelector(M.submitButtonSelector).classList.add("form__save-button_hidden")):(t.querySelector(M.formloading).classList.remove("form__loading_visible"),t.querySelector(M.submitButtonSelector).classList.remove("form__save-button_hidden"))}Promise.all([ae.initialUsers(),ae.initCardsFromServer()]).then((function(e){ee.setUserInfo(e[0]),ee.setAvatarLink(e[0]),te.renderItems(e[1].reverse(),e[0])})).catch((function(e){ie("Ошибка: ".concat(e))}))})();