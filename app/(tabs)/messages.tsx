import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { 
  AuthGuard, 
  ScreenHeader, 
  ChatList,
  ConversationPreview,
  EmptyState,
  type ChatItem,
  type ConversationBubble
} from '@/components/common';
import { Colors, Spacing, BorderRadius } from '@/constants/Colors';

export default function MessagesScreen() {
  const [hasChats, setHasChats] = useState(true); // Toggle this to show/hide chats
  
  const chatList: ChatItem[] = [
    {
      id: '1',
      type: 'group',
      title: 'Beach Day!',
      message: 'Alex Smith started a group chat.',
      time: '5:50 PM',
      avatar: '🤩',
      avatarBg: Colors.light.blue,
      unread: false
    },
    {
      id: '2',
      type: 'individual',
      title: 'Jason Smith',
      message: 'Hey!',
      time: '5:50 PM',
      avatar: '😊',
      avatarBg: Colors.light.purple,
      unread: false
    }
  ];

  const conversationPreviews: ConversationBubble[] = useMemo(() => [
    {
      id: '1',
      avatar: '👤',
      avatarBg: Colors.light.pink,
      position: { top: 100, left: 50 },
      size: 'small'
    },
    {
      id: '2', 
      avatar: '🎯',
      avatarBg: Colors.light.purple,
      position: { top: 140, left: 20 },
      size: 'medium',
      hasMessage: true,
      messageText: '@everyone here\'s our event recap video! 📹'
    },
    {
      id: '3',
      avatar: '🏃',
      avatarBg: Colors.light.pink,
      position: { top: 180, right: 40 },
      size: 'large'
    },
    {
      id: '4',
      avatar: '🌟',
      avatarBg: Colors.light.green,
      position: { top: 220, left: 80 },
      size: 'small'
    },
    {
      id: '5',
      avatar: '💼',
      avatarBg: Colors.light.blue,
      position: { top: 260, right: 60 },
      size: 'medium'
    },
    {
      id: '6',
      avatar: '🎨',
      avatarBg: Colors.light.orange,
      position: { top: 300, left: 40 },
      size: 'small'
    }
  ], []);

  const handleChatPress = (chat: ChatItem) => {
    console.log('Chat pressed:', chat.title);
  };

  const handleArchivedPress = () => {
    console.log('Archived pressed');
  };

  const handleStartChat = () => {
    console.log('Start chat pressed');
  };

  return (
    <AuthGuard>
      <ThemedView style={{ flex: 1, backgroundColor: Colors.light.background }}>
        {/* Header */}
        <ScreenHeader
          title="Chat"
          avatar={{
            fallbackIcon: "person.circle",
          }}
          rightAction={{
            icon: "plus",
            onPress: () => setHasChats(!hasChats),
            accessibilityLabel: "Toggle chat view"
          }}
        />

        {/* Search Bar */}
        <ThemedView style={styles.searchSection}>
          <ThemedView style={styles.searchContainer}>
            <IconSymbol size={16} name="magnifyingglass" color={Colors.light.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Conversations..."
              placeholderTextColor={Colors.light.textSecondary}
            />
          </ThemedView>
        </ThemedView>

        <ScrollView showsVerticalScrollIndicator={false}>
          {hasChats ? (
            /* Chat List */
            <ChatList
              chats={chatList}
              onChatPress={handleChatPress}
              onArchivedPress={handleArchivedPress}
            />
          ) : (
            <>
              {/* Conversation Previews */}
              <ConversationPreview
                conversations={conversationPreviews}
                containerHeight={400}
              />

              {/* Empty State */}
              <EmptyState
                title="It's Quiet Here"
                description="Start a chat with your friends or others in your event."
                action={{
                  label: "Start Chat",
                  onPress: handleStartChat
                }}
                layout="vertical"
                style={{ marginTop: Spacing.xxxl + 10 }}
              />
            </>
          )}

          <ThemedView style={{ height: 100 }} />
        </ScrollView>
      </ThemedView>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.border,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.sm + 4, // 12px
    paddingVertical: Spacing.sm + 4, // 12px
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: '400',
  },
});

