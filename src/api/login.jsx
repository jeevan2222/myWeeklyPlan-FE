const axios = require("axios");
// const url = "http://localhost:6969";

async function createUser(userObject) {
  try {
    axios
      .post("http://localhost:6969/user/create", {
        name: "jevan",
        email: "jeevankumar@gmail.com",
        password: "Jeevan@123",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
}

module.exports = createUser;
