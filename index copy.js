const express = require("express")
const mongoose = require("mongoose") // new
const routes=require("./routes.js")
const nodemailer = require('nodemailer');
// Connect to MongoDB database
const port = 5000;
mongoose
	.connect("mongodb+srv://bruce:bruce@cluster0.exmgv.mongodb.net/acmedb?retryWrites=true&w=majority", { useNewUrlParser: true })
	.then(() => {
		const app = express()
        app.use(express.json());
        app.use("/api", routes);
		app.listen(port, () => {
			console.log("Server has started on: " + port);
		})
	})
   
    // const nodemailer = require("nodemailer");
    
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
    // Christa Gaylord
    //christa.gaylord78@ethereal.email\
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "nezabruce@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(console.error);
