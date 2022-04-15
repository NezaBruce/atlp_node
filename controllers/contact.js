import express from 'express';
import contactModel from '../models/contact.js';
const contact = express.Router();

contact.get("/contact",  (req, res) => {
  const query = contactModel.find({});
  query.exec((err, contacts) => {
    if(err) res.send(err);
    res.json(contacts);
});
});

contact.post("/contact", (req, res) => {
  const post = new contactModel({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
post.save((err,contact) => {
    if(err) {
        res.send(err);
    }
    else { 
       res.json({message: "Contact successfully added!", contact });
    }
});
});
export default contact;