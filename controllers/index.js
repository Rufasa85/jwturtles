const express = require("express");
const router = express.Router();
const db = require("../models");
const jwt = require("jsonwebtoken");


const checkAuthStatus = (request) => {
    if (!request.headers.authorization) {
        return false
    }
    token = request.headers.authorization.split(" ")[1]
    console.log(token);
    const loggedInUser = jwt.verify(token, 'secrets', (err, data) => {
        if (err) {
            return false
        }
        else {
            return data
        }
    });
    console.log(loggedInUser)
    return loggedInUser
}


router.get("/turtles", (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    db.Turtle.findAll().then(turtles => {
        res.json(turtles);
    })
})
router.get("/users", (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    if (loggedInUser) {
        db.User.findAll().then(users => {
            res.json(users);
        })
    } else {
        res.status(401).send('nope')
    }
})
router.get("/users/:id/turtles", (req, res) => {
    console.log(req.headers);
    const loggedInUser = checkAuthStatus(req)
    console.log('in turtle req')
    if (loggedInUser) {
        db.Turtle.findAll({
            where: {
                UserId: req.params.id
            }
        }).then(turtles => {
            res.json(turtles)
        }).catch(err=>{
            console.log(err)
        })
    }else {
        res.status(401).send('not logged in')
    }
})

router.post("/login", (req, res) => {
    db.User.findOne({
        where: {
            userName: req.body.userName
        }
    }).then(user => {
        if (!user) {
            res.status(404).send('no user found')
        }
        else if (user.password === req.body.password) {
            const userJson = user.toJSON();
            const userTokenInfo = {
                userName: userJson.userName,
                id: userJson.id
            }
            const token = jwt.sign(userTokenInfo, "secrets", { expiresIn: "2h" })
            res.status(200).json({ ...userTokenInfo, token })
        } else {
            res.status(401).send("unauthorized")
        }
    })
})

router.post("/userFromToken",(req,res)=>{
    const loggedInUser = jwt.verify(req.body.token, 'secrets', (err, data) => {
        if (err) {
            return false
        }
        else {
            return data
        }
    })
    res.json(loggedInUser)
})

module.exports = router;