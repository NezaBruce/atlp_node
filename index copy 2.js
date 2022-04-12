import express from "express";
import nodeMailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// const port = 3000;

// FIXME in production!
app.use(cors({
  origin: '*',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/send-email', function (req, res) {
  let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'nezabruce@gmail.com',
          pass: 'GODisGOOD4$'
      }
  });
  let mailOptions = {
      from: '"YOU" nezabruce@gmail.com', // sender address
      to: req.body.to, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.body, // plain text body
      html: req.body.html // html body
  };


  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.sendStatus(500);
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      res.sendStatus(200);
      });

  });

app.listen(3000, function () {
  console.log(`🚀 Server ready at http://localhost:3000`);

});





















// const Joi = require('joi')
  
// //User-defined function to validate the user
// function validateUser(user)
// {
//     const JoiSchema = Joi.object({
      
//         username: Joi.string()
//                   .min(5)
//                   .max(30)
//                   .required(),
                    
//         email: Joi.string()
//                .email()
//                .min(5)
//                .max(50)
//                .optional(), 
                 
//         date_of_birth: Joi.date()
//                        .optional(),
                         
//         account_status: Joi.string()
//                         .valid('activated')
//                         .valid('unactivated')
//                         .optional(),
//     }).options({ abortEarly: false });
  
//     return JoiSchema.validate(user)
// }
  
// const user = {
//     username: 'Pritish',
//     email: 'pritish@gmail.com',
//     date_of_birth: '2020-8-11',
//     account_status: 'activated'
// }
  
// response = validateUser(user)
  
// if(response.error)
// {  
//     console.log(response.error.details)
// }
// else
// {
//     console.log("Validated Data")
// }