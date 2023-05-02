import * as React from 'react';
import {View, Text} from 'react-native';
import {SvgUri} from 'react-native-svg';

function SplashScreen() {
  let uri = 'https://get-in.com/en/assets/images/svg-icons/new-get-in-logo.svg';
  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#080416',
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SvgUri
          width="300"
          height="75"
          uri="https://get-in.com/en/assets/images/svg-icons/new-get-in-logo.svg"
        />
      </View>
      <View
        style={{
          flex: 1,
          width: 100 + '%',
          height: 100 + '%',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <SvgUri
          width="200"
          height="100"
          uri="https://maven.hyperswitch.io/release/production/android/maven/public/icons/hyperswitchdark.svg"
        />
      </View>
    </View>
  );
}
export default SplashScreen;
