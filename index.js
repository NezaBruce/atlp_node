import express from 'express';
import mongoose from "mongoose" // new
import contact from "./controllers/contact.js"
import Blog from "./routes/blog.js";
import auth from "./routes/user.js";
// import book from './routes/book.js';
// import path from 'path'
import path from 'path';
// import * as swaggerFile from "./swagger_output.json" assert { type: 'json' };
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT ||  7000;
const app = express()
// const swaggerUi = import("swagger-ui-express")
import swaggerUIExpress from "swagger-ui-express"
  // swaggerDoc = import("./swagger.json");
  mongoose
  .connect("mongodb+srv://bruce:bruce@cluster0.exmgv.mongodb.net/acmedb?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
	  // Server.listen
    
	  // app.use("/api-docs", swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerFile));
        app.use(express.json());
        app.use(express.static(path.join(__dirname, 'public')))
        app.set('views', path.join(__dirname, 'views'))
        app.set('view engine', 'ejs');
        app.get('/', (req, res) => res.render('pages/index'))
        // app.use("/blog", routes1);
        app.use("/", Blog);
        app.use("/contact", contact);
        // app.route("/").get("hello");
        // app.get("/",(req,res)=>res.send("hello"))
    //     app.use("/comment", comment);
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

  export default app;