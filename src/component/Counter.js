import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
const Counter = ({setPrice, price}) => {
  const [counter, setCounter] = useState(1);
  useEffect(() => {
    setPrice(price * counter);
  }, [counter, price]);
  return (
    <View
      style={{
        width: 100 + '%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 20,
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: 'white',
        }}>
        Meet & Greet{'  '}
        <Text style={{color: 'white', fontSize: 23}}>{price}$</Text>
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            counter > 1 ? setCounter(pre => pre - 1) : null;
          }}
          style={{
            backgroundColor: 'white',
            width: 35,
            height: 35,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            -
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            paddingHorizontal: 15,
          }}>
          {counter}
        </Text>
        <TouchableOpacity
          onPress={() => {
            counter < 5 ? setCounter(pre => pre + 1) : null;
          }}
          style={{
            backgroundColor: 'white',
            width: 35,
            height: 35,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Counter;
