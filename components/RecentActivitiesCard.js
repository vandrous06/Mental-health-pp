import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
};

const ActivityItem = ({ icon, title, time, description }) => (
  <View style={styles.activityItem}>
    <View style={styles.activityIcon}>
      <MaterialIcons name={icon} size={20} color={colors.accent} />
    </View>
    <View style={styles.activityContent}>
      <View style={styles.activityHeader}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
      <Text style={styles.activityDescription}>{description}</Text>
    </View>
  </View>
);

const RecentActivitiesCard = ({ activities }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialIcons name="history" size={24} color={colors.primary} />
        <Text style={styles.title}>Recent Activities</Text>
      </View>

      <ScrollView style={styles.activitiesList}>
        {activities.map((activity, index) => (
          <React.Fragment key={index}>
            <ActivityItem {...activity} />
            {index < activities.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))}
      </ScrollView>
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
  },
  activitiesList: {
    maxHeight: 300,
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  activityTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  activityDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.cardBorder,
    marginVertical: 5,
  },
});

export default RecentActivitiesCard;
