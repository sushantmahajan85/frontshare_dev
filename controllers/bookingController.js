const stripe = require("stripe")(
  "sk_test_51MSoOzSG8corGcy58svY6CNZYC8vqX9NFVJYV9tRqg7YfBpyCNN6YUCGKgpFDRZz4oZIRe18OUZb5MO5hX0sYIBc00tUxdYaGG"
);
// const Tour = require("../models/tourModel");
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const { price } = req.params;
  // 1) Get the currently booked tour
  //   const tour = await Tour.findById(req.params.tourId);
  // console.log(stripe);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/?user=${
      req.user.id
    }&price=${price}`,
    cancel_url: `${req.protocol}://${req.get("host")}/login`,
    customer_email: req.user.email,
    mode: "payment",
    // client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          product_data: {
            name: "Pro Plan Membership",
            description:
              "Please do not press the back button while making a payment...",
            images: [
              `${req.protocol}://${req.get("host")}/public/img/users/${
                req.user.photo
              }`,
            ],
          },

          unit_amount: price * 100,
          currency: "usd",
        },

        quantity: 1,
      },
    ],
  });

  // 3) Create session as response
  res.status(200).json({
    status: "success",
    session,
  });
});

// const createBookingCheckout = async (session) => {
// const tour = session.client_reference_id;
// const user = (await User.findOne({ email: session.customer_email })).id;
// console.log(user);
// const price = session.display_items[0].amount / 100;
// await Booking.create({ user, price });
// };

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { user, price } = req.query;

  if (!user && !price) return next();
  await Booking.create({ user, price });
  await User.findByIdAndUpdate(user, { plan: "pro" });
  res.redirect(req.originalUrl.split("?")[0]);
});

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed")
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
