const express = require("express")
const mongoose = require("mongoose") // new
const routes=require("./routes.js")
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