let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to our contact model
let Contacts = require('../models/contacts');

/*GET route for the contact list page - READ operation*/
router.get('/', (req, res, next) => {
    Contacts.find((err, contactsList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(ContactsList);

            res.render('contacts', {title: 'Contacts List', ContactsList: contactsList})
        }

    });

});

module.exports = router;