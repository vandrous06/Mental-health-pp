import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const Stack = createStackNavigator();

const AuthFlow = ({ navigation, onFinish }) => {
  const handleAuthSuccess = () => {
    // For development, directly navigate to HomeScreen
    navigation.navigate('HomeScreen');
    
    // When you implement proper auth later, you can uncomment this:
    // if (onFinish) {
    //   onFinish();
    // }
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="SignIn" 
        children={(props) => (
          <SignInScreen {...props} onSuccess={handleAuthSuccess} />
        )}
      />
      <Stack.Screen 
        name="SignUp" 
        children={(props) => (
          <SignUpScreen {...props} onSuccess={handleAuthSuccess} />
        )}
      />
    </Stack.Navigator>
  );
};

export default AuthFlow;