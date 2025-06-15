import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
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

const ResourceCard = ({ title, description, type, duration, thumbnail, onPress }) => {
  const getIcon = () => {
    switch (type) {
      case 'video':
        return 'play-circle-filled';
      case 'pdf':
        return 'picture-as-pdf';
      case 'audio':
        return 'headset';
      default:
        return 'article';
    }
  };

  const getDurationText = () => {
    if (type === 'pdf') {
      return `${duration} pages`;
    }
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.thumbnailContainer}>
        {thumbnail ? (
          <Image source={thumbnail} style={styles.thumbnail} />
        ) : (
          <View style={styles.placeholderThumbnail}>
            <MaterialIcons name={getIcon()} size={40} color={colors.accent} />
          </View>
        )}
        {type === 'video' && (
          <View style={styles.playButton}>
            <MaterialIcons name="play-arrow" size={30} color={colors.buttonText} />
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <MaterialIcons name={getIcon()} size={20} color={colors.accent} />
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <View style={styles.footer}>
          <Text style={styles.duration}>{getDurationText()}</Text>          {type === 'pdf' && (
            <View style={styles.pdfActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => onPress('read')}
              >
                <MaterialIcons name="menu-book" size={16} color={colors.accent} />
                <Text style={styles.actionButtonText}>Read</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => onPress('audio')}
              >
                <MaterialIcons name="volume-up" size={16} color={colors.accent} />
                <Text style={styles.actionButtonText}>Listen</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  thumbnailContainer: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderThumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: colors.textSecondary,
  },  pdfActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  actionButtonText: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '500',
  },
});

export default ResourceCard;
