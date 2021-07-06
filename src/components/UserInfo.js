export class UserInfo {
    constructor({ infoName, infoJob, infoAvatar }) {
        this._name = document.querySelector(infoName);
        this._job = document.querySelector(infoJob);
        this._avatar = document.querySelector(infoAvatar);
    }
    getUserInfo() {
        const name = this._name.textContent;
        const job = this._job.textContent;
        const link = this._avatar.src
        const data = { name: name, job: job, link: link };
        return data;
    }
    setUserInfo(data) {
        const nameInput = data.name;
        const jobInput = data.job;
        this._name.textContent = nameInput;
        this._job.textContent = jobInput;
    }

    setAvatarLink(data) {
        const avatarInput = data.link;
        this._avatar.src = avatarInput;
    }
}