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
      confirm: false,
      capture_method: 'automatic',
      authentication_type: 'no_three_ds',
      customer_id: 'StripeCustomer',
      shipping: {
        address: {
          line1: '1467',
          line2: 'Harrison Street',
          line3: 'Harrison Street',
          city: 'San Fransico',
          state: 'California',
          zip: '94122',
          country: 'US',
          first_name: 'joseph',
          last_name: 'Doe',
        },
        phone: {
          number: '8056594427',
          country_code: '+91',
        },
      },
      billing: {
        address: {
          line1: '1467',
          line2: 'Harrison Street',
          line3: 'Harrison Street',
          city: 'San Fransico',
          state: 'California',
          zip: '94122',
          country: 'US',
          first_name: 'joseph',
          last_name: 'Doe',
        },
        phone: {
          number: '8056594427',
          country_code: '+91',
        },
      },
      metadata: {
        order_details: {
          product_name: 'Apple iphone 15',
          quantity: 1,
        },
      },
      // authentication_type: 'no_three_ds',
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
