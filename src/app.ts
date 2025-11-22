import express from "express";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { MORGAN_FORMAT } from "./libs/config";
import routerAdmin from "./router-admin";
import router from "./router";
import ConnectMongoDBSession from "connect-mongodb-session";
import session from "express-session";
import { T } from "./libs/types/common";
const app = express();

// entrees
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); //traditional api support
app.use(express.json()); // rest api support
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

const MongoDBStore = ConnectMongoDBSession(session);

const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions",
});

// session
app.use(
  session({
    secret: String(process.env.SECRET_KEY),
    cookie: {
      maxAge: 1000 * 3600 * 3,
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});

// views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// routing
app.use("/admin", routerAdmin); // SSR
app.use("/", router); // React

export default app;
