import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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

const MoodTrackerCard = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>How Are You Feeling?</Text>
            <View style={styles.iconContainer}>
              <MaterialIcons name="mood" size={24} color={colors.buttonText} />
            </View>
          </View>
          <Text style={styles.subtitle}>Track your mood and mental wellbeing</Text>
          <View style={styles.moodRow}>
            {['😔', '😐', '🙂', '😊', '😁'].map((emoji, index) => (
              <View key={index} style={styles.emojiContainer}>
                <Text style={styles.emoji}>{emoji}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Check In Now</Text>
            <MaterialIcons name="arrow-forward" size={20} color={colors.buttonText} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
  },
  content: {
    padding: 15,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 15,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  emojiContainer: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  emoji: {
    fontSize: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MoodTrackerCard;
