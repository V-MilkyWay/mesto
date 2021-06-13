export class UserInfo {
    constructor({ name, job }) {
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
    }
    getUserInfo() {
        const name = this._name.textContent;
        const job = this._job.textContent;
        const data = { name: name, job: job };
        return data;
    }
    setUserInfo() {
        const nameInput = document.querySelector('.form__input_type_name').value;
        const jobInput = document.querySelector('.form__input_type_job').value;
        this._name.textContent = nameInput;
        this._job.textContent = jobInput;
    }
}