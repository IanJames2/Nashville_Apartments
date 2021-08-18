const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required. Please enter your first name!"],
        minLength: [2, "First Name need not be less than 2 characters."]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required. Please enter your last name!"],
        minLength: [2, "Last Name shall not be less than 2 characters"]
    },
    suffix: {
        type: String,
        required: [false, "Please enter a suffix"]
    },
    ageCount: {
        type: Number,
        required: [true, "Please enter an age."]
    },
    emailAddress: {
        type: String,
        required: [true, "Email is required. Please enter a valid email address!"],
        minLength: [2, "Email need not be less than 2 characters."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
          }
    },
    password: {
        type: String,
        required: [true, "Password is required. Please enter a valid password!"],
        minLength: [8, "Password need not be less than 8 characters."],
    }
}, {timestamps: true})

UserSchema.virtual('confirmPassword')
        .get( () => this._confirmPassword )
        .set( value => this._confirmPassword = value ),

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
    });

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
        this.password = hash;
        next();
        });
    });

const User = mongoose.model("User", UserSchema);

module.exports.User = User;