const express = require("express");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_TOKEN);

const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.post("/stripe-checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "checkk",
          },
          unit_amount: 200 * 100,
        },
        quantity: 2,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:8080/about",
    cancel_url: "http://localhost:8080/",
  });
  res.json({ url: session.url });
  // try {
  //   const { stripeToken } = req.body;
  //   const charges = await stripe.charge.create({
  //     amount: 2000,
  //     source: stripeToken,
  //     automatic_payment_methods: { enabled: true },
  //     currency: "inr",

  //     description:
  //       "This is the custom payment implementd using vue node and stripe",
  //   });
  //   console.log("charges", charges);
  //   res.json(charges);
  // } catch (error) {
  //   console.log(error);
  // }
});

app.post("/custom-payment", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      automatic_payment_methods: { enabled: true },
      currency: "inr",

      description:
        "This is the custom payment implementd using vue node and stripe",
    });
    console.log("paymentIntent", paymentIntent);
    res.json(paymentIntent);
  } catch (error) {
    console.log(error);
  }
});

app.listen(9999, () => {
  console.log("listening on 9999");
});
