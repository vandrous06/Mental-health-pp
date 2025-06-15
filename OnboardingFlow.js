import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Welcome to MindGuard',
    description: 'Your companion for mental wellness and self-care.',
    cards: [
      { iconName: 'mood', text: 'Mood Tracking' },
      { iconName: 'edit', text: 'Daily Journal' },
      { iconName: 'self-improvement', text: 'Mindfulness' },
      { iconName: 'bar-chart', text: 'Progress' },
    ],
  },
  {
    title: 'Personalized Tools',
    description: 'Access resources tailored to your needs.',
    cards: [
      { iconName: 'notifications', text: 'Reminders' },
      { iconName: 'menu-book', text: 'Resources' },
      { iconName: 'group', text: 'Community' },
      { iconName: 'settings', text: 'Settings' },
    ],
  },
  {
    title: 'Get Started',
    description: 'Begin your journey to better mental health.',
    cards: [
      { iconName: 'privacy-tip', text: 'Privacy' },
      { iconName: 'favorite-border', text: 'Support' },
      { iconName: 'emoji-events', text: 'Goals' },
      { iconName: 'rocket-launch', text: 'Get Started' },
    ],
  },
];

const OnboardingFlow = ({ navigation, onFinish }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      const nextIndex = currentSlide + 1;
      scrollViewRef.current?.scrollTo({ x: width * nextIndex, animated: true });
      setCurrentSlide(nextIndex);
    } else {
      onFinish();
      navigation.navigate('AuthFlow');
    }
  };

  const renderCard = (card, index) => (
    <View key={index} style={styles.card}>
      <View style={styles.cardContent}>
        <MaterialIcons name={card.iconName} size={36} color="#613824" style={styles.cardIcon} />
        <Text style={styles.cardText}>{card.text}</Text>
      </View>
      <View style={styles.cardGlass} />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newSlide = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentSlide(newSlide);
        }}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.header}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
            <View style={styles.grid}>
              {slide.cards.map(renderCard)}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.paginationDot,
                i === currentSlide && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
          <Text style={styles.buttonText}>
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  slide: {
    width,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#613824',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#613824',
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 16,
    borderRadius: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  cardContent: {
    backgroundColor: 'rgba(255, 248, 243, 0.8)',
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(97, 56, 36, 0.1)',
  },
  cardGlass: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardIcon: {
    // fontSize: 32, // Size is now controlled by MaterialIcons size prop
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#613824',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0D5CC',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#f6ad19',
    width: 16,
  },
  nextButton: {
    backgroundColor: '#f6ad19',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#613824',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OnboardingFlow;