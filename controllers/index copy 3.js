import express from "express";
import nodeMailer from 'nodemailer';
import bodyParser from 'body-parser';

const app = express();

const port = 3000;

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
      from: 'nezabruce@gmail.com', // sender address
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
app.listen(port, function () {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});