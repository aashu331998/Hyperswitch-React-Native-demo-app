import React, {useEffect} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';

import {useHyper} from '@juspay-tech/react-native-hyperswitch';

const CheckoutReuse = ({client_secret, ephemeral_key, price}) => {
  const {initPaymentSheet, presentPaymentSheet} = useHyper();

  const initializePaymentSheet = async () => {
    const googlePay = {
      environment: 'test',
      countryCode: 'US',
      currencyCode: 'USD',
    };
    console.log('reusable => ', client_secret, ephemeral_key);
    const {error} = await initPaymentSheet({
      // customerId: ephemeral_key.customer_id,
      // customerEphemeralKeySecret: ephemeral_key.secret,
      merchantDisplayName: 'Example',
      paymentIntentClientSecret: client_secret,
      googlePay: googlePay,
      // style: 'AlwaysDark',
      // appearance: {locale: 'he'},
    });
    if (!error) {
    } else {
      console.log('initPaymentSheet error =>', await error);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  // presentPaymentSheet() response
  // {"error": {"code": "cancelled", "message": "cancelled"}}
  // {"paymentOption": {"image": "succeeded", "label": "succeeded"}}
  // {"error": {"code": "failed", "message": "failed"}}
  // {"paymentOption": {"image": "requires_capture", "label": "requires_capture"}}

  const openPaymentSheet = async () => {
    const res = await presentPaymentSheet();
    console.log('presentPaymentSheet response: ', res);
    const {error, paymentOption} = res;
    if (error) {
      switch (error.code) {
        case 'cancelled':
          Alert.alert('cancelled', `PaymentSheet was closed`);
          break;
        case 'failed':
          Alert.alert('failed', `Payment failed`);
          break;
        default:
          Alert.alert('Something went wrong', 'Please check the integration');
          break;
      }
    } else if (paymentOption) {
      switch (paymentOption.label) {
        case 'succeeded':
          Alert.alert('succeeded', `Your order is succeeded`);
          break;
        case 'requires_capture':
          Alert.alert('requires_capture', `Your order is requires_capture`);
          break;
        default:
          Alert.alert('succeeded', 'Please check the integration');
          break;
      }
    } else {
      Alert.alert('Something went wrong', 'Please check the integration');
    }
    //to reFetch clientSecret
    //initializePaymentSheet(price);
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
        title="Pay Now">
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          {`Pay Now ${price}$`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default CheckoutReuse;
