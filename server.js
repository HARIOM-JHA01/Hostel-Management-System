import dotenv from "dotenv";

if (process.env.NODE_ENV != "production") {
  dotenv.config();
}
import express from "express";
const app = express();
import expressEjsLayouts from "express-ejs-layouts";
import mongoose, { mongo } from "mongoose";
const dbURL = process.env.DATABASE_URI;
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.error("Error connecting to DB: " + error);
  });

// Listen for the 'error' and 'open' events
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("Connection error: " + err);
});
db.once("open", () => {
  console.log("Connection to DB established successfully");
});

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import indexRouter from "./routes/index.js";

app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.set("layout engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "./layouts/layout");
app.use(express.static("public"));
app.use("/", indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("server is up...");
});
