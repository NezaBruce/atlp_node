import express from 'express';
import cors from 'cors';
import mongoose from "mongoose"
import contact from "./controllers/contact.js"
import Blog from "./routes/blog.js";
import auth from "./routes/user.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT ||  7000;
const app = express()
import swaggerUIExpress from "swagger-ui-express"
  import fs from 'fs';

const swaggerFile = JSON.parse(fs.readFileSync('./swagger_output.json'));
  mongoose
  .connect("mongodb+srv://bruce:bruce@cluster0.exmgv.mongodb.net/acmedb?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
	  // Server.listen
	  // heroku git:remote -a
    
	  app.use("/api-docs", swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerFile));
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(express.static(path.join(__dirname, 'public')))
        app.set('views', path.join(__dirname, 'views'))
        app.set('view engine', 'ejs');
        app.get('/', (req, res) => res.render('pages/index'))
        app.use("/", Blog);
        app.use("/auth", auth);
        app.use("/cont", contact);

		app.listen(port, () => {
			console.log(`Server has started on: http://localhost:${port} `);
		})
	})
  export default app;
  
  // "host": "my-branda.herokuapp.com",
  