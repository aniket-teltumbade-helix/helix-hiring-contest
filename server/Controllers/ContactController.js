const Contact = require("../Models/ContactModel");

exports.addContact = (req, res) => {
    Contact.create(req.body, (docerr, doc) => {
        if (docerr) {
            return res.status(400).send({ "Err": docerr })
        }
        return res.send({ msg: doc })
    })
}

exports.viewContact = (req, res) => {
    Contact.find({}, (docerr, doc) => {
        if (docerr) {
            return res.status(400).send({ "Err": docerr })
        }
        return res.send({ msg: doc })
    })
}