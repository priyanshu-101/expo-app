import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BankDetails from './BankDetails';
import Contact from './Contact';
import Service from './Service';

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Contact" component={Contact} />
    <Stack.Screen name="BankDetails" component={BankDetails} />
    <Stack.Screen name="Service" component={Service} />
  </Stack.Navigator>
);

export default MainStack; 