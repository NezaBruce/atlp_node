import express from 'express';
import cors from 'cors';
import mongoose from "mongoose"
import contact from "../controllers/contact.js"
import Blog from "../routes/blog.js";
// import auth from "../routes/user.js";
const app=express();
  mongoose
  .connect("mongodb+srv://bruce:bruce@cluster0.exmgv.mongodb.net/acmedb-test?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(express.static(path.join(__dirname, 'public')))
        app.set('views', path.join(__dirname, 'views'))
        app.set('view engine', 'ejs');
        app.get('/', (req, res) => res.render('pages/index'))
        app.use("/", Blog);
        app.use("/cont", contact);

		app.listen(port, () => {
			console.log(`Server has started on: http://localhost:${port} `);
		})
	})
  export default app;