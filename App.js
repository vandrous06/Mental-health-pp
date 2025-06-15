import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingFlow from './OnboardingFlow';
import AuthFlow from './AuthFlow';
import PermissionsScreen from './PermissionsScreen';
import HomeScreen from './HomeScreen';
import SplashScreen from './SplashScreen';
import ChatScreen from './screens/ChatScreen';
import ResourcesScreen from './screens/ResourcesScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

const theme = {
  dark: false,
  colors: {
    primary: '#613824', // Brown
    accent: '#f6ad19', // Orange
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#613824',
    border: '#E0E0E0',
    notification: '#f6ad19',
  },
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    checkInitialState();
  }, []);

  const checkInitialState = async () => {
    try {
      const onboardedStatus = await AsyncStorage.getItem('isOnboarded');
      setIsOnboarded(onboardedStatus === 'true');
    } catch (error) {
      console.error('Error checking initial state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem('isOnboarded', 'true');
    setIsOnboarded(true);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
        initialRouteName={!isOnboarded ? 'OnboardingFlow' : 'AuthFlow'}
      >
        <Stack.Screen
          name="OnboardingFlow"
          children={(props) => (
            <OnboardingFlow {...props} onFinish={handleOnboardingComplete} />
          )}
        />
        <Stack.Screen name="AuthFlow" component={AuthFlow} />
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ResourcesScreen" component={ResourcesScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
