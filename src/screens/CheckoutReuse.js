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
      customerId: ephemeral_key.customer_id,
      customerEphemeralKeySecret: ephemeral_key.secret,
      merchantDisplayName: 'Example',
      paymentIntentClientSecret: client_secret,
      googlePay: googlePay,
      style: 'AlwaysDark',
    });
    if (!error) {
    } else {
      console.log('initPaymentSheet error =>', await error);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
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
