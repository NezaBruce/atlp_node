const express = require("express")
const mongoose = require("mongoose") // new
const routes=require("./controllers/contact")
const routes1=require("./routes/blog");
const comment=require("./controllers/comment")
const auth=require("./routes/user")
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken")
let book = require('./routes/book');
// Connect to MongoDB database
// const passport = require("passport");
// require("./passport/passportConfig")(passport);
const port = 7000;
const app = express()
const swaggerUi = require("swagger-ui-express"),
  swaggerDoc = require("./swagger.json");
  mongoose
  .connect("mongodb+srv://bruce:bruce@cluster0.exmgv.mongodb.net/acmedb?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
	  
	  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
        app.use(express.json());
        app.use("/blog", routes1);
        // app.use("/", auth);
        // app.route("/").get("hello");
        app.get("/",(req,res)=>res.send("hello"))
        app.use("/comment", comment);
        app.use("/contact", routes);
        app.route("/blog").get(book.getBooks);
        app.route("/blogs").post(book.postBook);
    app.route("/blog/:id")
        .get(book.getBook)
        .delete(book.deleteBook)
        .put(book.updateBook);
        // app.get(
        //   "/auth/google/callback",
        //   passport.authenticate("google", { session: false }),
        //   (req, res) => {
        //   jwt.sign(
        //   { user: req.user },
        //   "secretKey",
        //   { expiresIn: "1h" },
        //   (err, token) => {
        //   if (err) {
        //   return res.json({
        //   token: null,
        //   });
        //   }
        //   res.json({
        //   token,
        //   });
        //   }
        //   );
        //   }
        //  );
        //  app.get("/profile", (req, res) => {
        //   console.log(req);
        //   res.send("Welcome");
        //  });
		app.listen(port, () => {
			console.log("Server has started on: " + port);
		})
	})
  // app.route('/bo')

module.exports=app;