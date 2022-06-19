let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Contacts = require('../models/contacts');

module.exports.displayContactList = (req, res, next) => {
    Contacts.find((err, contactsList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);

            res.render('contact/contacts', {title: 'Contacts List',
            ContactsList: contactsList,
            displayName: req.user ? req.user.displayName :''})   
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contact/add', {title: 'Add Contact',
    displayName: req.user ? req.user.displayName :''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contacts({
        "name" : req.body.name,
        "number": req.body.number,
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
            res.redirect('/contacts-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contacts.findById(id, (err, contactToedit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('contact/edit', {title: 'Edit Contact', contact: contactToedit,
            displayName: req.user ? req.user.displayName :''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updateContact = Contacts({
        "_id": id,
        "name" : req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Contacts.updateOne({_id: id}, updateContact, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/contacts-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contacts.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/contacts-list');
        }
    });
}