const express = require ('express')
const cors = require ('cors')
const mongoose= require ("mongoose")
const contact = require ("./controllers/contact.js")
const Blog = require ("./routes/blog.js")
// import auth from "./routes/user.js";
const path = require ('path');
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const port = process.env.PORT ||  7000;
const app = express()
// import swaggerUIExpress from "swagger-ui-express"
//   import fs from 'fs';

// const swaggerFile = JSON.parse(fs.readFileSync('./swagger_output.json'));
  mongoose
  .connect("mongodb+srv://bruce:bruce@cluster0.exmgv.mongodb.net/acmedb-test?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
	  // heroku git:remote -a
    

    
	  // app.use("/api-docs", swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerFile));
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        // app.use(express.static(path.join(__dirname, 'public')))
        // app.set('views', path.join(__dirname, 'views'))
        // app.set('view engine', 'ejs');
        // app.get('/', (req, res) => res.render('pages/index'))
        app.use("/", Blog);
        // app.use("/auth", auth);
        app.use("/cont", contact);

		app.listen(port, () => {
			console.log(`Server has started on: http://localhost:${port} `);
		})
	})
  module.exports =  app;
  
  // "host": "my-branda.herokuapp.com",
  // "testa": "mocha --timeout 10000",
  // "dev-test": "--exec \"npm run testa\"",
  // "test-watch": "nodemon --exec \"npm test\"",
