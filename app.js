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
const paypal = require("paypal-rest-sdk");

//   (methodOverride = require("method-override")),
//   (bodyParser = require("body-parser")),
//   ({ check, validationResult } = require("express-validator")),

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AYOkgdbnHFjMi-IEJmMtpk_FiYCXQB62yhQBV2JIitYf2ZQNSeAapqEdggMaQh2p54IM-dQsstOTnD5C",
  client_secret:
    "EFOQyBkNPIUnwzPqKu4a6r4mok_UyzA2o8AeMJH_2AaMzfkgbIrRTXTeiy1AmHT9N_Muzyxde0m4iiKT",
});
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

app.post("/pay", (req, res) => {
  const pricetogg = req.query.pricetogg;
  // console.log(pricetogg);
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Red Sox Hat",
              sku: "001",
              price: pricetogg,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: pricetogg,
        },
        description: "Hat for the best team ever",
      },
    ],
  };
  app.get("/success", (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: pricetogg,
          },
        },
      ],
    };

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          console.log(JSON.stringify(payment));
          res.send("Success");
        }
      }
    );
  });
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});
app.get("/cancel", (req, res) => res.send("Cancelled"));
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
