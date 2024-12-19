import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ValidateCodeScreen from '../screens/ValidateCodeScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import CreateEarningScreen from '../screens/CreateEarningScreen';
import EarningsListScreen from '../screens/EarningListScreen';
import EarningDetailsScreen from '../screens/EarningDetailsScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ValidateCode" component={ValidateCodeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="CreateEarning" component={CreateEarningScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="EarningList" component={EarningsListScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="EarningDetails" component={EarningDetailsScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;
