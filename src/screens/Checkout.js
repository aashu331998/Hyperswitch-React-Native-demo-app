import React, {useEffect, useState} from 'react';
import {Platform, View} from 'react-native';

import CheckoutReuse from './CheckoutReuse';

const Checkout = () => {
  const price = 5;
  const [loading, setLoading] = useState(true);
  const [apicall, setApicall] = useState('');

  const fetchPaymentParams = async amount => {
    const response = await fetch(
      Platform.OS == 'ios'
        ? `http://localhost:4242/create-payment-intent`
        : `http://10.0.2.2:4242/create-payment-intent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({amount: amount}),
      },
    );
    const val = await response.json();
    return val;
  };

  const initializePaymentSheet = async amount => {
    setLoading(true);
    let {client_secret, ephemeral_key} = await fetchPaymentParams(amount);
    setApicall({client_secret: client_secret, ephemeral_key: ephemeral_key});
    console.log(
      'clientSecret and ephemeral_key fetched => ',
      client_secret,
      ephemeral_key,
    );
    setLoading(false);
  };

  useEffect(() => {
    initializePaymentSheet(price);
  }, []);

  return (
    <View
      style={{
        width: '100%',
      }}>
      {loading ? (
        <></>
      ) : (
        <CheckoutReuse
          client_secret={apicall && apicall.client_secret}
          ephemeral_key={apicall && apicall.ephemeral_key}
          price={price}
        />
      )}
    </View>
  );
};
export default Checkout;
