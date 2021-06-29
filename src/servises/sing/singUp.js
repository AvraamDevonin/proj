

function singUp(user, callback) {
    fetch('http://localhost:3030/register', {
        method: "POST",
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(user)
    })
    .then(isValidate => {
        callback(isValidate);
    })
}

export default singUp;