import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const colors = {
  primary: '#613824',
  accent: '#f6ad19',
  background: '#FFFFFF',
  cardBackground: '#FFF8F3',
  cardBorder: '#EADBC8',
  textPrimary: '#613824',
  textSecondary: '#A98E7D',
  progressBar: '#E0D5CC',
  progressFill: '#f6ad19',
};

const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

const AppUsageCard = ({ usageData }) => {
  // Calculate total usage
  const totalMinutes = usageData.reduce((sum, app) => sum + app.minutes, 0);
  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialIcons name="apps" size={24} color={colors.primary} />
        <Text style={styles.title}>App Usage</Text>
        <Text style={styles.totalTime}>Total: {formatDuration(totalMinutes)}</Text>
      </View>
      
      <View style={styles.content}>
        {usageData.map((app, index) => {
          const percentage = (app.minutes / totalMinutes) * 100;
          return (
            <View key={index} style={styles.appItem}>
              <View style={styles.appInfo}>
                <MaterialIcons name={app.icon} size={20} color={colors.textPrimary} />
                <Text style={styles.appName}>{app.name}</Text>
                <Text style={styles.duration}>{formatDuration(app.minutes)}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar,
                    { width: `${percentage}%` }
                  ]} 
                />
              </View>
            </View>
          );
        })}
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
  totalTime: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  content: {
    gap: 12,
  },
  appItem: {
    gap: 8,
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appName: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  duration: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: colors.progressBar,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.progressFill,
    borderRadius: 3,
  },
});

export default AppUsageCard;
