const db = require("../models");

const users = () => {
    db.User.bulkCreate([
        {
            userName: "Joe",
            password: "password"
        },
        {
            userName: "Denis",
            password: "passwordz"
        },
    ]).then(data=>{
        console.log("users done")
    });

}
module.exports = users;