import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {HyperProvider} from '@juspay-tech/react-native-hyperswitch';
import Checkout from './Checkout';
import TextWithSvg from '../component/TextWithSvg';

function Home({navigation}) {
  const [loading, setLoading] = useState(true);
  const fetchPaymentParams = async () => {
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
    setLoading(false);
    return publishableKey;
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
      {!loading ? (
        <HyperProvider
          publishableKey="pk_snd_1e5425f5dea94ee793cf34ea326294d8"
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
