const express = require("express");
const { Server } = require("http");
const mongoose = require("mongoose") // new
const routes=require("./controllers/contact")
const routes1=require("./routes/blog");
const comment=require("./controllers/comment")
const auth=require("./routes/user")
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken")
let book = require('./routes/book');
const path = require('path')
const swaggerFile = require("./swagger_output.json");
const port = process.env.PORT ||  7000;
const app = express()
const swaggerUi = require("swagger-ui-express")
  // swaggerDoc = require("./swagger.json");
  mongoose
  .connect("mongodb+srv://bruce:bruce@cluster0.exmgv.mongodb.net/acmedb?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
	  // Server.listen
	  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
        app.use(express.json());
        app.use(express.static(path.join(__dirname, 'public')))
        app.set('views', path.join(__dirname, 'views'))
        app.set('view engine', 'ejs');
        // app.get('/', (req, res) => res.render('pages/index'))
        // app.use("/blog", routes1);
        app.use("/", auth);
        // app.route("/").get("hello");
        // app.get("/",(req,res)=>res.send("hello"))
    //     app.use("/comment", comment);
    //     app.use("/contact", routes);
    //     app.route("/blog").get(book.getBooks);
    //     app.route("/blogs").post(book.postBook);
    // app.route("/blog/:id")
    //     .get(book.getBook)
    //     .delete(book.deleteBook)
    //     .put(book.updateBook);
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
			console.log("Server has started on:{http://localhost:7000} " + port);
		})
	})
  // app.route('/bo')

module.exports=app;