import express, { Express } from "express"
import dotenv from "dotenv";
import * as database from "./config/database";
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/config";
import path from "path";

dotenv.config();

database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End TinyMCE

// App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes 
clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});