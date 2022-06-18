//require modules for the last user model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema
(
    {
        username:
        {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        /*
        password:
        {
            type: String,
            dfault: '';
            trim: true,
            required: 'password is required'
        }
        */
       email:
       {
            type: String,
            dfault: '',
            trim: true,
            required: 'email address is required'
       },
       displayName:
       {
            type: String,
            dfault: '',
            trim: true,
            required: 'Display Name is required'
       },
       created:
       {
            type: Date,
            dfault: Date.now
       },
       update:
       {
            type: Date,
            dfault: Date.now
       }

    },
    {
        collection: "users"
    }
);

//Configure options for user model

let options = ({ missingPasswordError: 'Wrong / Missing Password'});
User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User', User);