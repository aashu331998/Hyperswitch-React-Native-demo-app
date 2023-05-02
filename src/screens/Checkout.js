import React, {useEffect, useState} from 'react';
import {Alert, Platform, Text, TouchableOpacity, View} from 'react-native';

import {useHyper} from '@juspay-tech/react-native-hyperswitch';
import Counter from '../component/Counter';

const pricePerItem = 5;

const Checkout = () => {
  const [price, setPrice] = useState(pricePerItem);
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
    const {clientSecret} = await fetchPaymentParams(amount);
    console.log('clientSecret fetched => ', clientSecret);
    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example',
      paymentIntentClientSecret: clientSecret,
    });
    if (!error) {
      setLoading(false);
    } else {
      console.log('initPaymentSheet error =>', await error);
    }
  };

  useEffect(() => {
    initializePaymentSheet(price);
  }, [price]);

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();
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
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      <Counter
        setPrice={val => {
          setPrice(_ => val);
        }}
        price={pricePerItem}
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          width: 100 + '%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 13,
          borderRadius: 8,
        }}
        onPress={openPaymentSheet}
        title="Pay Now"
        disabled={loading}>
        <Text
          style={{
            color: 'black',
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
