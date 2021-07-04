fetch('https://mesto.nomoreparties.co/v1/cohort-25/cards', {
        headers: {
            authorization: '3f7400de-4faa-456b-995e-bfe48f676c49'
        }
    })
    .then(res => res.json())
    .then((result) => {
        console.log(result);
    });