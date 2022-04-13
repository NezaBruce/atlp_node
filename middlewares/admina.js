const express=require('express');

const isAdmin =  (req, res, next) => {     
  // const { error } = Joi.validate(req.body, schema); 
  const idmin = req.user.isadmin; 
  // console.log(req.user);
  if (idmin) { 
    next(); 
  } else { 
   res.status(404).json({ error: "Access denied" }) 
  } 
  } 
module.exports = isAdmin;