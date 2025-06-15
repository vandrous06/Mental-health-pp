import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  // Theme colors from OnboardingFlow / App.js theme
  const colors = {
    primary: '#613824', // Brown
    accent: '#f6ad19', // Orange
    background: '#FFFFFF',
    cardBackground: '#FFF8F3', // Light beige
    cardBorder: '#EADBC8', // Light brown border
    textPrimary: '#613824',
    textSecondary: '#A98E7D', // Lighter brown for placeholders
    buttonText: '#FFFFFF',
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <View style={[styles.logoContainer, { backgroundColor: colors.cardBackground, borderColor: colors.accent }]}>
          <MaterialIcons name="person-add" size={40} color={colors.accent} />
        </View>
        <Text style={[styles.welcomeText, { color: colors.primary }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: colors.primary, opacity: 0.8 }]}>Join MindGuard today</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={[
          styles.inputCard,
          { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder },
          focusedField === 'name' && { borderColor: colors.accent, shadowColor: colors.accent }
        ]}>
          <View style={styles.inputHeader}>
            <Text style={[styles.inputLabel, { color: colors.primary }]}>Full Name</Text>
            <MaterialIcons name="person" size={22} color={colors.primary} style={styles.inputIcon} />
          </View>
          <TextInput
            style={[styles.input, { color: colors.textPrimary }]}
            placeholder="Enter your full name"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

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
            <MaterialIcons name="vpn-key" size={22} color={colors.primary} style={styles.inputIcon} />
          </View>
          <TextInput
            style={[styles.input, { color: colors.textPrimary }]}
            placeholder="Create a strong password"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.accent }]}>
          <Text style={[styles.primaryButtonText, { color: colors.buttonText }]}>Sign Up</Text>
          <MaterialIcons name="app-registration" size={22} color={colors.buttonText} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.primary, opacity: 0.7 }]}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={[styles.linkText, { color: colors.accent }]}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
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
    shadowColor: '#000',
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
  inputCard: { // Copied from SignInScreen styles, ensure consistency
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: '#613824',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // To push icon to the right
    marginBottom: 10
  },
  inputIcon: {
    // fontSize: 18, // Size is now controlled by MaterialIcons size prop
    marginLeft: 10, // If icon is after the label
  },
  inputLabel: { fontSize: 14, fontWeight: '600' },
  input: { fontSize: 16, paddingVertical: 8 },
  primaryButton: { borderRadius: 16, paddingVertical: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
  primaryButtonText: { fontSize: 16, fontWeight: 'bold', marginRight: 10 },
  buttonIcon: { /* fontSize: 16, fontWeight: 'bold' // Style for Text, MaterialIcons uses size prop */ },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: Platform.OS === 'ios' ? 30 : 20, paddingTop: 20, flexWrap: 'wrap' },
  footerText: { fontSize: 14, marginRight: 5 },
  linkText: { fontSize: 14, fontWeight: 'bold' },
});

export default SignUpScreen;