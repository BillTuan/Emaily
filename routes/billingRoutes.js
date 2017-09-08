const key = require("../config/key");

const stripe = require("stripe")(key.stripeSecretKey);
module.exports = app => {
  app.post("/api/stripe", async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id
    });
    console.log("====================================");
    console.log(charge);
    console.log("====================================");
  });
};
