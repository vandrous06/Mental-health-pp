import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import TypingIndicator from '../components/TypingIndicator';
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
  chatBotBubble: '#F0E6E0',
  userBubble: '#613824',
  inputBackground: '#FFF8F3',
};

// Mock responses for the chatbot
const mockResponses = {
  "tired": [
    "I hear that you're feeling tired. That must be difficult. Would you like to talk more about what might be causing this fatigue?",
    "Being tired can affect many aspects of our life. Have you noticed any changes in your sleep patterns or daily routine?",
    "It's important to listen to our body when we feel tired. Would you like to explore some gentle energy-boosting techniques together?"
  ],
  "default": [
    "I'm here to listen and support you. Could you tell me more about that?",
    "Thank you for sharing. How long have you been feeling this way?",
    "Your feelings are valid. Would you like to explore this further?"
  ]
};

const ChatBubble = ({ message, isUser }) => (
  <View style={[styles.bubbleContainer, isUser ? styles.userBubbleContainer : styles.botBubbleContainer]}>
    {!isUser && (
      <View style={styles.botAvatar}>
        <MaterialIcons name="psychology" size={20} color={colors.accent} />
      </View>
    )}
    <View style={[
      styles.bubble,
      isUser ? styles.userBubble : styles.botBubble,
    ]}>
      <Text style={[
        styles.messageText,
        isUser ? styles.userMessageText : styles.botMessageText,
      ]}>
        {message}
      </Text>
    </View>
  </View>
);

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your mental wellness companion. How are you feeling today?", isUser: false },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const scrollViewRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0)
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const getBotResponse = (userMessage) => {
    const lowercaseMessage = userMessage.toLowerCase();
    if (lowercaseMessage.includes('tired')) {
      return mockResponses.tired[Math.floor(Math.random() * mockResponses.tired.length)];
    }
    return mockResponses.default[Math.floor(Math.random() * mockResponses.default.length)];
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        isUser: false,
      };
      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
    }, 2000);
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isTyping]);

  return (
    <SafeAreaView style={styles.container}>
      {isSidebarVisible && (
        <Sidebar
          currentScreen="Chat"
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
            <Text style={styles.headerTitle}>Wellness Chat</Text>
            <Text style={styles.headerSubtitle}>Your mental health companion</Text>
          </View>
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.chatContainer}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesList}
            contentContainerStyle={[
              styles.messagesContent,
              { paddingBottom: keyboardHeight > 0 ? keyboardHeight : 20 }
            ]}
            showsVerticalScrollIndicator={false}
          >
            {messages.map(message => (
              <ChatBubble
                key={message.id}
                message={message.text}
                isUser={message.isUser}
              />
            ))}
            {isTyping && <TypingIndicator />}
          </ScrollView>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                ref={inputRef}
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type your message..."
                placeholderTextColor={colors.textSecondary}
                multiline
                maxHeight={100}
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity
                style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                onPress={handleSend}
                disabled={!inputText.trim()}
              >
                <MaterialIcons 
                  name="send" 
                  size={24} 
                  color={inputText.trim() ? colors.buttonText : colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
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
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 15,
  },
  bubbleContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    maxWidth: '80%',
  },
  userBubbleContainer: {
    alignSelf: 'flex-end',
  },
  botBubbleContainer: {
    alignSelf: 'flex-start',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  bubble: {
    borderRadius: 20,
    padding: 12,
    paddingHorizontal: 16,
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: colors.chatBotBubble,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: colors.buttonText,
  },
  botMessageText: {
    color: colors.textPrimary,
  },
  inputContainer: {
    padding: 15,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingRight: 45,
    fontSize: 16,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    maxHeight: 100,
  },
  sendButton: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.cardBackground,
  },
});

export default ChatScreen;
