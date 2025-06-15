import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SignInScreen = ({ navigation, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  // Theme colors from OnboardingFlow / App.js theme
  const colors = {
    primary: '#613824', // Brown
    accent: '#f6ad19', // Orange
    background: '#FFFFFF',
    cardBackground: '#FFF8F3', // Light beige, similar to onboarding cardContent
    cardBorder: '#EADBC8', // Light brown border
    textPrimary: '#613824',
    textSecondary: '#A98E7D', // Lighter brown for placeholders/secondary text
    buttonText: '#FFFFFF',
  };

  const handleSignIn = () => {
    // For now, just trigger the success callback which will be handled by AuthFlow
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <View style={[styles.logoContainer, { backgroundColor: colors.cardBackground, borderColor: colors.accent }]}>
          <MaterialIcons name="psychology" size={40} color={colors.accent} />
        </View>
        <Text style={[styles.welcomeText, { color: colors.primary }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { color: colors.primary, opacity: 0.8 }]}>Sign in to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={[
          styles.inputCard,
          { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder },
          focusedField === 'email' && { borderColor: colors.accent, shadowColor: colors.accent }
        ]}>
          <View style={styles.inputHeader}>
            <Text style={[styles.inputLabel, { color: colors.primary }]}>Email Address</Text>
            <MaterialIcons name="email" size={22} color={colors.primary} style={styles.inputIcon} />
          </View>
          <TextInput
            style={[styles.input, { color: colors.textPrimary }]}
            placeholder="Enter your email"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={[
          styles.inputCard,
          { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder },
          focusedField === 'password' && { borderColor: colors.accent, shadowColor: colors.accent }
        ]}>
          <View style={styles.inputHeader}>
            <Text style={[styles.inputLabel, { color: colors.primary }]}>Password</Text>
            <MaterialIcons name="lock" size={22} color={colors.primary} style={styles.inputIcon} />
          </View>
          <TextInput
            style={[styles.input, { color: colors.textPrimary }]}
            placeholder="Enter your password"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.accent }]} onPress={handleSignIn}>
          <Text style={[styles.primaryButtonText, { color: colors.buttonText }]}>Sign In</Text>
          <MaterialIcons name="login" size={22} color={colors.buttonText} />
        </TouchableOpacity>

        {/* Optional: Biometric button can be styled similarly if kept */}
        {/* <TouchableOpacity style={styles.biometricButton}>
          <Text style={styles.biometricIcon}>👁️</Text>
          <Text style={styles.biometricText}>Biometric Access</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.primary, opacity: 0.7 }]}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.linkText, { color: colors.accent }]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40, // Adjust top padding for status bar
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    shadowColor: '#000', // Softer shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoIcon: {
    // fontSize: 40, // Size is now controlled by MaterialIcons size prop
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  inputCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: '#613824', // Brown shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // To push icon to the right if label is short
    marginBottom: 10,
  },
  inputIcon: {
    // fontSize: 18, // Size is now controlled by MaterialIcons size prop
    marginLeft: 10, // If icon is after the label
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
  },
  primaryButton: {
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  buttonIcon: {
    // fontSize: 16, // Size is now controlled by MaterialIcons size prop
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 30 : 20, // Adjust for home indicator etc.
    paddingTop: 20,
    flexWrap: 'wrap',
  },
  footerText: {
    fontSize: 14,
    marginRight: 5,
  },
  linkText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignInScreen;