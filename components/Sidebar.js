import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colors = {
  primary: '#613824',
  accent: '#f6ad19',
  background: '#FFFFFF',
  cardBackground: '#FFF8F3',
  cardBorder: '#EADBC8',
  textPrimary: '#613824',
  textSecondary: '#A98E7D',
  buttonText: '#FFFFFF',
  activeItem: '#FFF0E1',
};

const MenuItem = ({ icon, label, onPress, isActive }) => (
  <TouchableOpacity 
    style={[
      styles.menuItem, 
      isActive && styles.menuItemActive
    ]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <MaterialIcons 
      name={icon} 
      size={24} 
      color={isActive ? colors.accent : colors.textPrimary} 
    />
    <Text style={[
      styles.menuItemText,
      isActive && styles.menuItemTextActive
    ]}>
      {label}
    </Text>
    {isActive && (
      <View style={styles.activeIndicator} />
    )}
  </TouchableOpacity>
);

const LogoutButton = ({ onPress }) => (
  <TouchableOpacity 
    style={styles.logoutButton} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <MaterialIcons 
      name="logout" 
      size={24} 
      color={colors.textPrimary} 
    />
    <Text style={styles.logoutText}>Logout</Text>
  </TouchableOpacity>
);

const Sidebar = ({ currentScreen, isVisible, onClose }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const menuItems = [
    { icon: 'dashboard', label: 'Dashboard', screen: 'Home' },
    { icon: 'chat', label: 'Chat', screen: 'Chat' },
    { icon: 'source', label: 'Resources', screen: 'Resources' },
    { icon: 'settings', label: 'Settings', screen: 'Settings' }
  ];

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -300,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.overlay,
          { opacity: fadeAnim }
        ]}
      >
        <TouchableOpacity style={styles.closeArea} onPress={onClose} />
      </Animated.View>

      <Animated.View 
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
          }
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <MaterialIcons name="psychology" size={40} color={colors.accent} />
            <Text style={styles.title}>MindGuard</Text>
          </View>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
          >
            <MaterialIcons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>        <View style={styles.menuItems}>
          {menuItems.map((item) => (
            <MenuItem
              key={item.screen}
              icon={item.icon}
              label={item.label}
              onPress={() => {
                onClose();
                navigation.navigate(item.screen);
              }}
              isActive={currentScreen === item.screen}
            />
          ))}
        </View>
        <LogoutButton onPress={handleLogout} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  closeArea: {
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  menuItems: {
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: 2,
    position: 'relative',
  },
  menuItemActive: {
    backgroundColor: colors.activeItem,
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: colors.textPrimary,
  },
  menuItemTextActive: {
    color: colors.accent,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 8,
    bottom: 8,
    width: 3,
    backgroundColor: colors.accent,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  logoutText: {
    marginLeft: 15,
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
});

export default Sidebar;
