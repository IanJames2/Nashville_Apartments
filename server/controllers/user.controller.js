const {User} = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.Register = (req, res) => {
    User.create(req.body)
        .then(user => {
            res
                .cookie( //Sets up cookie
                    "usertoken", // Name of cookie
                    jwt.sign({ _id: user._id }, process.env.SECRET_KEY), //jwt defined. Includes payload and secret key
                    {
                        httpOnly: true, //Only the browser is using your webtoken
                    }
                )
                .json({ msg: "success!", user: { 
                    firstName: user.firstName,
                    lastName: user.lastName
                }});
        })
        .catch(err => res.json(err));
}

module.exports.Login = (req, res) =>{
    User.findOne({email: req.body.email})
    .then(user => {
        if(user === null){
            res.status(400).json({ msg:"Invalid login attempt!" })
            res.cookie()
        } else {
            bcrypt.compare(req.body.password, user.password)
                .then(isValid => {
                    if(isValid === true){
                        res
                            .cookie(
                                "usertoken",
                                jwt.sign({ _id: user._id }, process.env.SECRET_KEY),
                                {
                                    httpOnly: true,
                                }
                            )
                            .json({ msg: "success!" });
                    } else {
                        console.log('ERRORERRORERRORERRORERRORERRERRERRERR')
                        res.status(400).json({ msg: "Invalid login attempt" })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json({msg:"Invalid login attempt!"})})
        }
    })
    .catch(err => res.status(400).json(err));
}


module.exports.Logout = (req, res) =>{
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.FindUser = (req, res) => {
    User.find()
        .then(data => res.json({results:data}))
        .catch(data => res.json(err))
}