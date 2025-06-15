import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const colors = {
  primary: '#613824',
  accent: '#f6ad19',
  background: '#FFFFFF',
  cardBackground: '#FFF8F3',
  cardBorder: '#EADBC8',
  textPrimary: '#613824',
  textSecondary: '#A98E7D',
  sleepQualityGood: '#4CAF50',
  sleepQualityMedium: '#FFC107',
  sleepQualityPoor: '#FF5722',
};

const formatTime = (hours) => {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return minutes > 0 ? `${wholeHours}h ${minutes}m` : `${wholeHours}h`;
};

const getSleepQualityColor = (quality) => {
  switch (quality) {
    case 'good':
      return colors.sleepQualityGood;
    case 'medium':
      return colors.sleepQualityMedium;
    case 'poor':
      return colors.sleepQualityPoor;
    default:
      return colors.textSecondary;
  }
};

const SleepCard = ({ sleepData }) => {
  const { duration, quality, bedTime, wakeTime } = sleepData;
  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialIcons name="nightlight" size={24} color={colors.primary} />
        <Text style={styles.title}>Sleep Analysis</Text>
        <View style={[styles.qualityIndicator, { backgroundColor: getSleepQualityColor(quality) }]}>
          <Text style={styles.qualityText}>{quality.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.timeInfo}>
          <View style={styles.timeBlock}>
            <MaterialIcons name="bedtime" size={20} color={colors.textSecondary} />
            <Text style={styles.timeLabel}>Bed Time</Text>
            <Text style={styles.timeValue}>{bedTime}</Text>
          </View>
          
          <View style={styles.durationBlock}>
            <Text style={styles.durationValue}>{formatTime(duration)}</Text>
            <Text style={styles.durationLabel}>Total Sleep</Text>
          </View>
          
          <View style={styles.timeBlock}>
            <MaterialIcons name="wb-sunny" size={20} color={colors.textSecondary} />
            <Text style={styles.timeLabel}>Wake Time</Text>
            <Text style={styles.timeValue}>{wakeTime}</Text>
          </View>
        </View>

        <View style={styles.separator} />
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <MaterialIcons name="speed" size={20} color={colors.textSecondary} />
            <Text style={styles.statLabel}>Sleep Efficiency</Text>
            <Text style={styles.statValue}>85%</Text>
          </View>
          
          <View style={styles.statItem}>
            <MaterialIcons name="timeline" size={20} color={colors.textSecondary} />
            <Text style={styles.statLabel}>Deep Sleep</Text>
            <Text style={styles.statValue}>{formatTime(duration * 0.35)}</Text>
          </View>
          
          <View style={styles.statItem}>
            <MaterialIcons name="waves" size={20} color={colors.textSecondary} />
            <Text style={styles.statLabel}>REM Sleep</Text>
            <Text style={styles.statValue}>{formatTime(duration * 0.25)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 10,
    flex: 1,
  },
  qualityIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  qualityText: {
    color: colors.buttonText,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    gap: 15,
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeBlock: {
    alignItems: 'center',
    flex: 1,
  },
  durationBlock: {
    alignItems: 'center',
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  timeValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
    marginTop: 2,
  },
  durationValue: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: '600',
  },
  durationLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: colors.cardBorder,
    marginVertical: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
    marginTop: 2,
  },
});

export default SleepCard;
