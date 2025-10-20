import express from "express";
import path from "path";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";
import routerAdmin from "./router-admin";
const app = express();

// enteres
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); //traditional api support
app.use(express.json()); // rest api support
app.use(morgan(MORGAN_FORMAT));

// session
// views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// routing
app.use("/", routerAdmin);

export default app;
