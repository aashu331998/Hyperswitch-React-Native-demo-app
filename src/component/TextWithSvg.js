import {SvgUri} from 'react-native-svg';
import React from 'react';
import {View, Text} from 'react-native';

const TextWithSvg = ({text, uri}) => {
  return (
    <View
      style={{
        width: 100 + '%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
      }}>
      <SvgUri width="17" height="17" uri={uri} />
      <Text
        style={{
          paddingLeft: 5,
          color: 'white',
          fontWeight: 'bold',
          fontSize: 15,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default TextWithSvg;
