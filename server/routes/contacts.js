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

            res.render('contact/list', {title: 'Contacts List', ContactsList: contactsList})
        }

    });

});

module.exports = router;

router.get('/add', (req, res, next) => {
    res.render('contact/add', {title: 'Add Contact'})
});

router.post('/add', (req, res, next) => {
    let newContact = Contacts({
        "name" : req.body.name,
        "number": req.body.author,
        "email": req.body.email
    });

    Contacts.create(newContact, (err, Contacts)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/contact');
        }
    });

});

router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    Contacts.findById(id, (err, contactToedit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('contact/edit', {title: 'Edit Contact', contact: contactToedit})
        }
    });
});

router.post('/edit/:id', (req, res, next) => {
    let id= req.params.id
    let updateContact = Contacts({
        "_id": id,
        "name" : req.body.name,
        "number": req.body.author,
        "email": req.body.email
    });

    Contacts.updateOne({_id: id}, updateContact, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/contact');
        }
    });
});

router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    Contacts.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/contact');
        }
    });
});