const express = require('express');
const app = express();
const env = require('dotenv').config({path: './.env'});

const hyper = require('@juspay-tech/hyperswitch-node')(
  process.env.HYPERSWITCH_SECRET_KEY,
);

app.use(express.static('.'));
app.use(express.json());

// An endpoint for your checkout
app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await hyper.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: 'USD',
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    return res.status(400).send({
      error: {
        message: err.message,
      },
    });
  }
});

// An endpoint to fetch HYPERSWITCH_PUBLISHABLE_KEY
app.get('/config', (req, res) => {
  try {
    res.send({
      publishableKey: process.env.HYPERSWITCH_PUBLISHABLE_KEY,
    });
  } catch (err) {
    return res.status(400).send({
      error: {
        message: err.message,
      },
    });
  }
});

app.listen(4242, () => console.log(`Node server listening on port !`));
