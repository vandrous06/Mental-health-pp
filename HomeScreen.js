import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoodCheckInModal from './components/MoodCheckInModal';
import MoodTrackerCard from './components/MoodTrackerCard';
import AppUsageCard from './components/AppUsageCard';
import SleepCard from './components/SleepCard';
import RecentActivitiesCard from './components/RecentActivitiesCard';
import Sidebar from './components/Sidebar';

const colors = {
  primary: '#613824',
  accent: '#f6ad19',
  background: '#FFFFFF',
  cardBackground: '#FFF8F3',
  cardBorder: '#EADBC8',
  textPrimary: '#613824',
  textSecondary: '#A98E7D',
  buttonText: '#FFFFFF',
};

// Mock data for app usage
const mockAppUsage = [
  { name: 'Instagram', icon: 'photo-camera', minutes: 120 },
  { name: 'Twitter', icon: 'chat', minutes: 45 },
  { name: 'YouTube', icon: 'play-circle-filled', minutes: 90 },
  { name: 'WhatsApp', icon: 'message', minutes: 30 },
  { name: 'Chrome', icon: 'public', minutes: 60 },
];

// Mock data for sleep statistics
const mockSleepData = {
  duration: 7.5,
  quality: 'good',
  bedTime: '10:30 PM',
  wakeTime: '6:00 AM',
};

// Mock data for recent activities
const mockActivities = [
  {
    icon: 'self-improvement',
    title: 'Meditation Session',
    time: '2h ago',
    description: 'Completed a 15-minute mindfulness meditation',
  },
  {
    icon: 'mood',
    title: 'Mood Check-in',
    time: '5h ago',
    description: 'Feeling energetic and positive today',
  },
  {
    icon: 'nightlight',
    title: 'Sleep Analysis',
    time: '8h ago',
    description: 'Had a good night\'s sleep with 7.5 hours',
  },
  {
    icon: 'psychology',
    title: 'Journal Entry',
    time: '1d ago',
    description: 'Wrote about today\'s experiences and reflections',
  },
];

const HomeScreen = () => {
  const [isMoodModalVisible, setIsMoodModalVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { width } = useWindowDimensions();

  const handleMoodSubmit = (data) => {
    console.log('Mood data:', data);
    setIsMoodModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isSidebarVisible && (
        <Sidebar
          currentScreen="Home"
          isVisible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
        />
      )}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setIsSidebarVisible(true)}
        >
          <MaterialIcons name="menu" size={28} color={colors.primary} />
        </TouchableOpacity>
        
        <Text style={styles.greeting}>Welcome back! 👋</Text>
        
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <MoodTrackerCard onPress={() => setIsMoodModalVisible(true)} />
        <RecentActivitiesCard activities={mockActivities} />
        <AppUsageCard usageData={mockAppUsage} />
        <SleepCard sleepData={mockSleepData} />
      </ScrollView>

      <MoodCheckInModal
        visible={isMoodModalVisible}
        onClose={() => setIsMoodModalVisible(false)}
        onSubmit={handleMoodSubmit}
      />

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.cardBackground,
  },
  greeting: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 15,
  },
  profileButton: {
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 15,
  },
});

export default HomeScreen;