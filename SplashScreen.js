import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const rainDrops = useRef(Array.from({ length: 20 }, () => new Animated.Value(-100))).current;
  const letterAnimations = useRef(Array.from({ length: 9 }, () => new Animated.Value(0))).current;

  useEffect(() => {
    // Rain drop animation
    const rainAnimation = Animated.stagger(100, 
      rainDrops.map(drop => 
        Animated.loop(
          Animated.timing(drop, {
            toValue: height + 100,
            duration: 2000,
            useNativeDriver: true,
          })
        )
      )
    );

    // Logo animation
    const logoAnimation = Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    ]);

    // Letter by letter text animation
    const textAnimation = Animated.stagger(150,
      letterAnimations.map(anim => 
        Animated.timing(anim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        })
      )
    );

    // Run all animations together
    Animated.parallel([rainAnimation, logoAnimation, textAnimation]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rainContainer}>
        {rainDrops.map((drop, index) => (
          <Animated.View
            key={index}
            style={[
              styles.raindrop,
              {
                left: Math.random() * width,
                transform: [{ translateY: drop }],
              },
            ]}
          />
        ))}
      </View>

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <MaterialIcons name="psychology" size={120} color="#f6ad19" />
      </Animated.View>

      <View style={styles.textContainer}>
        {'MindGuard'.split('').map((letter, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.text,
              {
                opacity: letterAnimations[index],
                transform: [
                  {
                    translateY: letterAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#613824',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rainContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  raindrop: {
    position: 'absolute',
    width: 2,
    height: 20,
    backgroundColor: 'rgba(246, 173, 25, 0.3)',
    borderRadius: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f6ad19',
    letterSpacing: 2,
  },
});

export default SplashScreen;