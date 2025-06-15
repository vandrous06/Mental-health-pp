import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import ResourceCard from '../components/ResourceCard';
import Sidebar from '../components/Sidebar';

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

// Mock data for resources
const mockResources = {
  featured: [
    {
      id: 1,
      title: "Understanding Anxiety: A Comprehensive Guide",
      description: "Learn about the different types of anxiety and effective coping strategies.",
      type: "video",
      duration: 485, // in seconds
      thumbnail: require('../assets/anxiety-guide.png'),
    },
  ],
  videos: [
    {
      id: 2,
      title: "5-Minute Mindfulness Meditation",
      description: "A quick guided meditation for stress relief and mental clarity.",
      type: "video",
      duration: 300,
      thumbnail: require('../assets/meditation.png'),
    },
    {
      id: 3,
      title: "Sleep Hygiene Tips",
      description: "Expert advice on improving your sleep quality and routine.",
      type: "video",
      duration: 420,
      thumbnail: require('../assets/sleep.png'),
    },
  ],
  pdfs: [
    {
      id: 4,
      title: "Stress Management Workbook",
      description: "Interactive exercises and techniques for managing stress.",
      type: "pdf",
      duration: 24, // pages
    },
    {
      id: 5,
      title: "Mental Health Self-Care Guide",
      description: "Daily practices and tips for maintaining mental wellness.",
      type: "pdf",
      duration: 18,
    },
  ],
};

const AudioPlayerModal = ({ visible, onClose, resource }) => {
  const slideAnim = useRef(new Animated.Value(-300)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View 
          style={[
            styles.audioPlayer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.audioHeader}>
            <MaterialIcons name="picture-as-pdf" size={24} color={colors.accent} />
            <Text style={styles.audioTitle} numberOfLines={1}>{resource?.title}</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <View style={styles.audioControls}>
            <TouchableOpacity style={styles.controlButton}>
              <MaterialIcons name="replay-10" size={32} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, styles.playButton]}>
              <MaterialIcons name="play-arrow" size={48} color={colors.buttonText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <MaterialIcons name="forward-10" size={32} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const ResourcesScreen = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [isAudioPlayerVisible, setIsAudioPlayerVisible] = useState(false);
  const handleResourcePress = (resource, mode = 'view') => {
    setSelectedResource(resource);
    switch (mode) {
      case 'audio':
        setIsAudioPlayerVisible(true);
        break;
      case 'read':
        // Handle PDF reading mode
        console.log('Opening PDF reader for:', resource.title);
        // You can implement PDF viewer here
        break;
      default:
        // Handle opening different resource types
        console.log('Opening resource:', resource.title);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isSidebarVisible && (
        <Sidebar
          currentScreen="Resources"
          isVisible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
        />
      )}
      <LinearGradient
        colors={['#FFF8F3', '#FFFFFF']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => setIsSidebarVisible(true)}
          >
            <MaterialIcons name="menu" size={28} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Resources</Text>
            <Text style={styles.headerSubtitle}>Tools for your mental wellness</Text>
          </View>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured</Text>
            {mockResources.featured.map(resource => (
              <ResourceCard
                key={resource.id}
                {...resource}
                onPress={() => handleResourcePress(resource)}
              />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Videos</Text>
            {mockResources.videos.map(resource => (
              <ResourceCard
                key={resource.id}
                {...resource}
                onPress={() => handleResourcePress(resource)}
              />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reading Materials</Text>
            {mockResources.pdfs.map(resource => (
              <ResourceCard
                key={resource.id}
                {...resource}
                onPress={(mode) => handleResourcePress(resource, mode)}
              />
            ))}
          </View>
        </ScrollView>

        <AudioPlayerModal
          visible={isAudioPlayerVisible}
          onClose={() => setIsAudioPlayerVisible(false)}
          resource={selectedResource}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
    backgroundColor: colors.background,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.cardBackground,
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 15,
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  audioPlayer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  audioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  audioTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accent,
  },
});

export default ResourcesScreen;
