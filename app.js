import express from "express";
import bodyParser from "body-parser";
import router from "./routes/routes.js";

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);

app.listen(port, (err, res) => {
  if (err) {
      console.log("Couldn't start server");
  } else {
      console.log(`Server is running at http://localhost:${port}`);
  }
});
