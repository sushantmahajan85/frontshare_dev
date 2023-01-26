const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const viewRoutes = require("./routes/view_routes");
const userRoutes = require("./routes/user_routes");
const blockRoutes = require("./routes/block_routes");
const bookingRoutes = require("./routes/booking_routes");
//   (methodOverride = require("method-override")),
//   (bodyParser = require("body-parser")),
//   ({ check, validationResult } = require("express-validator")),

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Including Routes!
// app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
// app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
//Connection To Database
mongoose.connect(
  "mongodb+srv://admin:HNZPkLHNuzuIzze2@snipfeedclone.zndhjtv.mongodb.net/test",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (!error) {
      console.log("Connection to db successful");
    } else {
      console.log(error);
    }
  }
);

app.use(cookieParser());

app.use(compression());

dotenv.config({ path: "./config.env" });

// Including Model
// var Team = require("./models/team.js");
// var Recruit = require("./models/recruit.js");
app.use("/", viewRoutes);
// app.use("/api/v1/deals", dealRoute);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blocks", blockRoutes);
app.use("/api/v1/bookings", bookingRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Listening on port", port);
});
