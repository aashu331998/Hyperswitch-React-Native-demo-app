import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

function App() {
  const [flow, setFlow] = React.useState('SplashScreen');
  React.useEffect(() => {
    let timer1 = setTimeout(() => setFlow('Login'), 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        {(() => {
          switch (flow) {
            case 'SplashScreen':
              return (
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
              );
            case 'Login':
              return <Stack.Screen name="Home" component={Home} />;
            default:
              return (
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
              );
          }
        })()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
