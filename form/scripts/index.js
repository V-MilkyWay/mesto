let page = document.querySelector('.page');
let main = document.querySelector('.main');
let formSender = main.querySelector('.form-sender');
let formInput = formSender.querySelectorAll('.form-sender__input');

let formButton = formSender.querySelector('.form-sender__button');


function saveButton(evt) {
    evt.preventDefault();
    let out = formInput[0];
    out2 = formInput[1];
    out3 = formInput[2];
    out4 = formInput[3];
    out5 = formInput[4];
    out6 = formInput[5];

    alert(`
    Заказ: ${out.value}
    Контактный телефон: ${out2.value}
    Название фирмы: ${out3.value}

    ---Информация о заказе---
    Объект: ${out4.value}
    Ширина: ${out5.value}
    Глубина:${out6.value}`);
}


formSender.addEventListener('submit', saveButton);