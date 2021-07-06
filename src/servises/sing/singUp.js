function singUp(user, callback) {
  console.log("USER IN FETCH ", user);
  fetch("http://localhost:3030/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(user),
  }).then((res, req) => res.json())
  .then(data => callback(data))
}

export default singUp;
