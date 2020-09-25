var express = require('express');
const cors = require("cors");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
var allRoutes = require('./controllers');

// Requiring our models for syncing
var db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));
app.use(cors())


app.use('/', allRoutes);

app.get('/',(req,res)=>{
    res.send("turtls")
})
app.get('/seed', (req, res) => {
    db.User.findAll().then(users => {
        if (!users) {
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
                ]).then(data2=>{
                    console.log("turtle power")
                    res.send("seeded")
                })
            });
        } else {
            res.send("not empty")
        }
    })
})

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log('App listening on PORT ' + PORT);
    });
});