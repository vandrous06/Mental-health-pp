import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import UserProfileSection from '../components/UserProfileSection';
import { LinearGradient } from 'expo-linear-gradient';
import Sidebar from '../components/Sidebar';

const PermissionItem = ({ icon, title, status, onPress }) => (
  <TouchableOpacity 
    style={styles.permissionItem}
    onPress={onPress}
  >
    <LinearGradient
      colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
      style={styles.permissionGradient}
    >
      <MaterialIcons name={icon} size={24} color="#fff" />
      <View style={styles.permissionInfo}>
        <Text style={styles.permissionTitle}>{title}</Text>
        <Text style={[
          styles.permissionStatus,
          { color: status === 'granted' ? '#4CAF50' : '#FF9800' }
        ]}>
          {status === 'granted' ? 'Enabled' : 'Disabled'}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#fff" />
    </LinearGradient>
  </TouchableOpacity>
);

const SettingsScreen = ({ navigation }) => {
  const [permissions, setPermissions] = React.useState({
    notifications: 'denied',
    camera: 'denied',
    location: 'denied',
    storage: 'denied',
  });
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);

  React.useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const { status: notificationStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    const { status: cameraStatus } = await Permissions.getAsync(Permissions.CAMERA);
    const { status: locationStatus } = await Permissions.getAsync(Permissions.LOCATION);
    const { status: storageStatus } = await Permissions.getAsync(Permissions.MEDIA_LIBRARY);

    setPermissions({
      notifications: notificationStatus,
      camera: cameraStatus,
      location: locationStatus,
      storage: storageStatus,
    });
  };

  const requestPermission = async (permission) => {
    let permissionType;
    switch (permission) {
      case 'notifications':
        permissionType = Permissions.NOTIFICATIONS;
        break;
      case 'camera':
        permissionType = Permissions.CAMERA;
        break;
      case 'location':
        permissionType = Permissions.LOCATION;
        break;
      case 'storage':
        permissionType = Permissions.MEDIA_LIBRARY;
        break;
    }

    const { status } = await Permissions.askAsync(permissionType);
    setPermissions(prev => ({
      ...prev,
      [permission]: status
    }));
  };

  return (
    <View style={styles.container}>
      {isSidebarVisible && (
        <Sidebar
          currentScreen="Settings"
          isVisible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
        />
      )}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsSidebarVisible(true)}
        >
          <MaterialIcons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>
      <ScrollView style={styles.content}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <UserProfileSection />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Permissions</Text>
          <PermissionItem
            icon="notifications"
            title="Notifications"
            status={permissions.notifications}
            onPress={() => requestPermission('notifications')}
          />
          <PermissionItem
            icon="camera-alt"
            title="Camera"
            status={permissions.camera}
            onPress={() => requestPermission('camera')}
          />
          <PermissionItem
            icon="location-on"
            title="Location"
            status={permissions.location}
            onPress={() => requestPermission('location')}
          />
          <PermissionItem
            icon="sd-storage"
            title="Storage"
            status={permissions.storage}
            onPress={() => requestPermission('storage')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#111',
  },
  menuButton: {
    padding: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  permissionItem: {
    marginBottom: 10,
  },
  permissionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
  },
  permissionInfo: {
    flex: 1,
    marginLeft: 15,
  },
  permissionTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  permissionStatus: {
    fontSize: 14,
    marginTop: 2,
  },
});

export default SettingsScreen;
