import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const colors = {
  primary: '#613824',
  accent: '#f6ad19',
  background: '#FFFFFF',
  cardBackground: '#FFF8F3',
  cardBorder: '#EADBC8',
  textPrimary: '#613824',
  textSecondary: '#A98E7D',
  buttonText: '#FFFFFF',
  granted: '#4CAF50',
  denied: '#F44336',
};

const PermissionItem = ({ icon, title, description }) => (
  <View style={styles.permissionItem}>
    <MaterialIcons name={icon} size={24} color={colors.primary} />
    <View style={styles.permissionText}>
      <Text style={styles.permissionTitle}>{title}</Text>
      <Text style={styles.permissionDescription}>{description}</Text>
    </View>
  </View>
);

const PermissionsScreen = ({ onFinish }) => {
  const handleContinue = () => {
    if (onFinish) {
      onFinish();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>App Permissions</Text>
        <Text style={styles.subtitle}>The following permissions will be requested when needed:</Text>

        <View style={styles.permissionsList}>
          <PermissionItem
            icon="smartphone"
            title="App Usage"
            description="To track your screen time and app usage"
          />
          <PermissionItem
            icon="favorite"
            title="Health Data"
            description="To track your wellness metrics"
          />
          <PermissionItem
            icon="notifications"
            title="Notifications"
            description="To send you important reminders"
          />
          <PermissionItem
            icon="storage"
            title="Storage"
            description="To save your journal entries and preferences"
          />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.continueButton}
        onPress={handleContinue}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
        <MaterialIcons name="arrow-forward" size={24} color={colors.buttonText} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 30,
  },
  permissionsList: {
    gap: 20,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  permissionText: {
    marginLeft: 15,
    flex: 1,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    margin: 20,
    gap: 10,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.buttonText,
  },
});

export default PermissionsScreen;