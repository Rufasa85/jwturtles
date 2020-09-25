const db = require("../models");

const turtles = ()=>{
    db.Turtle.bulkCreate([
        {
            name:'Leonardo',
            UserId:1
        },
        {
            name:"Donatello",
            UserId:1
        },{
            name:"Raphael",
            UserId:2
        }
    ]).then(data=>{
        console.log("turtle power")
    })
}

module.exports = turtles;