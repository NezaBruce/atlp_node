const express = require("express")
const mongoose = require("mongoose") // new
const routes=require("./controllers/contact")
const routes1=require("./routes/blog");
const comment=require("./controllers/comment")
const auth=require("./routes/user")
const nodemailer = require('nodemailer');
// Connect to MongoDB database
const port = 5000;
const swaggerUi = require("swagger-ui-express"),
  swaggerDoc = require("./swagger.json");
  mongoose
  .connect("mongodb+srv://bruce:bruce@cluster0.exmgv.mongodb.net/acmedb?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
	  const app = express()
	  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
        app.use(express.json());
        app.use("/blog", routes1);
        app.use("/", auth);
        app.use("/comment", comment);
        app.use("/contact", routes);
		app.listen(port, () => {
			console.log("Server has started on: " + port);
		})
	})