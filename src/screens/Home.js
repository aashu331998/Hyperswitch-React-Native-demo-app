import React, {useEffect, useState} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import {HyperProvider} from '@juspay-tech/react-native-hyperswitch';
import Checkout from './Checkout';

function Home() {
  const [loading, setLoading] = useState(true);

  let [publishableKey, setPublishableKey] = useState('');
  const fetchPaymentParams = async () => {
    try {
      const response = await fetch(
        Platform.OS == 'ios'
          ? `http://localhost:4242/config`
          : `http://10.0.2.2:4242/config`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const {publishableKey} = await response.json();

      setPublishableKey(publishableKey);
      setLoading(false);
    } catch (val) {
      Alert.alert(
        `error: \n publishable key not found, \nplease check server.js`,
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPaymentParams();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        padding: 10,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 24,
          width: 100 + '%',
          paddingTop: 20,
        }}>
        Pay using Payment Sheet
      </Text>
      {!loading && publishableKey ? (
        <HyperProvider
          publishableKey={publishableKey}
          merchantIdentifier="merchant.identifier" // required for Apple Pay
          urlScheme="https://www.google.com/" // required for 3D Secure and bank redirects
        >
          <Checkout />
        </HyperProvider>
      ) : (
        <Text style={{color: 'black', paddingTop: 20}}>
          {'loading... publishable key'}
        </Text>
      )}
    </View>
  );
}
export default Home;
