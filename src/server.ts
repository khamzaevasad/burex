import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("MongoDb connection succed");
    const PORT = process.env.PORT ?? 3005;
    app.listen(PORT, () => {
      console.log(
        `The is server is running successfuly on port: http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("Error connection MongoDb", err);
  });
