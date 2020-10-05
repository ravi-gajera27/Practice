require("dotenv").config();
let app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const contactRoute = require("./routes/contact");
const cors = require("cors");
const jwt = require("jsonwebtoken");

/* port initialization */
let port = process.env.Port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.all("/contact/*", (req, res, next) => {
  let header = req.headers["authorization"];
  if (header) {
    let token = header.split(" ")[1];
    tokenVerification(token)
      .then((verify) => {
        if (verify) {
          next();
        }
      })
      .catch((err) => {
        res.json({ statusCode: 401, message: "invalid token" });
      });
  } else {
    res.json({ statusCode: 401, message: "Unauthorized" });
  }
});

tokenVerification = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

/* to process the user request,  request is redirected to the userRoute */
app.use("/contact", contactRoute);
app.use("/user", authRoute);

/* connection to mongodb */
const url = process.env.MONGO_CONNECTION_URL;
mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected!!!");
    app.listen(port, () => {
      console.log(`Server has started on ${port}...`);
    });
  })
  .catch((err) => console.log(err));
