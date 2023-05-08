import React, {useEffect, useState} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import {HyperProvider} from '@juspay-tech/react-native-hyperswitch';
import Checkout from './Checkout';
import TextWithSvg from '../component/TextWithSvg';

function Home({navigation}) {
  const [loading, setLoading] = useState(true);

  let [publishableKey, setPublishableKey] = useState('');
  const fetchPaymentParams = async () => {
    try {
      const response = await fetch(
        'https://u4kkpaenwc.execute-api.ap-south-1.amazonaws.com/default/create-payment-intent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: 500,
            currency: 'USD',
            confirm: false,
            authentication_type: 'no_three_ds',
            customer_id: 'SaveCard',
            capture_method: 'manual',
          }),
        },
      );
      const clpk = await response.json();

      setPublishableKey(clpk.publishableKey);
      setLoading(false);
    } catch (val) {
      Alert.alert('error: cant fetch publishable key, ' + val);
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
        backgroundColor: '#080416',
        padding: 10,
      }}>
      <Image
        style={{
          width: 100 + '%',
          height: 50 + '%',
          borderRadius: 10,
        }}
        source={{
          uri: 'https://static.get-in.com/gallery/tablet_cover_20230419_193027_251081.png',
        }}
      />
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 24,
          width: 100 + '%',
          paddingTop: 20,
        }}>
        NLE Choppa In Israel
      </Text>
      <TextWithSvg
        text="Abarbanel St 88, Tel Aviv-Yafo, Israel"
        uri="https://get-in.com/en/assets/images/svg-icons/pointonmap.svg"
      />
      <TextWithSvg
        text="May 3, 2023 20:00"
        uri="https://get-in.com/en/assets/images/svg-icons/calendar.svg"
      />
      {!loading && publishableKey ? (
        <HyperProvider
          publishableKey={publishableKey}
          merchantIdentifier="merchant.identifier" // required for Apple Pay
          urlScheme="https://www.google.com/" // required for 3D Secure and bank redirects
        >
          <Checkout />
        </HyperProvider>
      ) : (
        <View
          style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
          <Text style={{color: 'white'}}>{'loading... publishable key'}</Text>
        </View>
      )}
    </View>
  );
}
export default Home;
