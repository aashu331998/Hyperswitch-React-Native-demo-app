import React, {useEffect, useState} from 'react';
import {Alert, Platform, Text, TouchableOpacity, View} from 'react-native';

import {useHyper} from '@juspay-tech/react-native-hyperswitch';

const Checkout = () => {
  const price = 5;
  const [loading, setLoading] = useState(true);
  const {initPaymentSheet, presentPaymentSheet} = useHyper();

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
    const googlePay = {
      environment: 'test',
      countryCode: 'US',
      currencyCode: 'USD',
    };
    let {client_secret, ephemeral_key} = await fetchPaymentParams(amount);
    console.log(
      'clientSecret and ephemeral_key fetched => ',
      client_secret,
      ephemeral_key,
    );
    const {error} = await initPaymentSheet({
      customerId: ephemeral_key.customer_id,
      customerEphemeralKeySecret: ephemeral_key.secret,
      merchantDisplayName: 'Example',
      paymentIntentClientSecret: client_secret,
      googlePay: googlePay,
      style: 'AlwaysDark',
    });
    if (!error) {
      setLoading(false);
    } else {
      console.log('initPaymentSheet error =>', await error);
    }
  };

  useEffect(() => {
    initializePaymentSheet(price);
  }, []);

  const openPaymentSheet = async () => {
    const res = await presentPaymentSheet();
    console.log('presentPaymentSheet response: ', res);
    const {error} = res;
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
    //to reFetch clientSecret
    initializePaymentSheet(price);
  };

  return (
    <View
      style={{
        width: '100%',
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: 'rgba(0, 153, 255, 1)',
          width: 100 + '%',
          alignItems: 'center',
          paddingVertical: 13,
          borderRadius: 8,
          marginTop: 20,
        }}
        onPress={openPaymentSheet}
        title="Pay Now"
        disabled={loading}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          {!loading ? `Pay Now ${price}$` : 'loading...'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Checkout;
