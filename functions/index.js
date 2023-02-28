const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51MeGOxSC6dNQSG02ZJTqMB7N4V8KCNz2JXTSQAqfwvux7seb89xSog1jOLwgtpkLj2eSDgwxWlPj4NTWF7QqsxAn00ww3lNDvB",
);

// API

// // App config
const app =express();
// Middle ware
app.use(cors({origin: true}));
app.use(express.json());

// API routs
app.get("/", (request, response) => response.status(200).send("Hello world"));
// app.get('/husni', (request, response) => response.status(200).send
// ('Whatsup husni'));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // submit of the currency
    currency: "usd",
    description: "for almasila-kart3 project",
    shipping: {
      name: "Random singh",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    },
  });
    // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://127.0.0.1:5001/almasila-kart/us-central1/api
