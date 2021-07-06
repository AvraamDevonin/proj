function singUpConfirm(user, callback) {
    fetch("http://localhost:3030/register/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(user),
    })
      .then((res, req) => res.json())
      .then(data => callback(data.isSend))
  }
  
  export default singUpConfirm;
  