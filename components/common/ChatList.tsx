import React, { memo } from 'react';
import { StyleSheet, Pressable, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface ChatItem {
  id: string;
  type: 'group' | 'individual';
  title: string;
  message: string;
  time: string;
  avatar: string;
  avatarBg: string;
  unread?: boolean;
  unreadCount?: number;
}

interface ChatListProps {
  chats: ChatItem[];
  onChatPress?: (chat: ChatItem) => void;
  style?: ViewStyle;
  showArchived?: boolean;
  onArchivedPress?: () => void;
}

export const ChatList = memo(function ChatList({
  chats,
  onChatPress,
  style,
  showArchived = true,
  onArchivedPress,
}: ChatListProps) {
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  const textSecondary = useThemeColor({ light: Colors.light.textSecondary, dark: Colors.dark.textSecondary }, 'text');
  const borderColor = useThemeColor({ light: Colors.light.border, dark: Colors.dark.border }, 'text');

  return (
    <ThemedView style={[styles.container, style]}>
      {/* Chat Items */}
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          onPress={() => onChatPress?.(chat)}
          textColor={textColor}
          textSecondary={textSecondary}
        />
      ))}
      
      {/* Archived Section */}
      {showArchived && (
        <Pressable 
          style={styles.archivedSection}
          onPress={onArchivedPress}
        >
          <ThemedView style={[
            styles.archivedIcon,
            { backgroundColor: borderColor }
          ]}>
            <IconSymbol size={20} name="archivebox" color={textSecondary} />
          </ThemedView>
          <ThemedText style={[styles.archivedText, { color: textColor }]}>
            Archived
          </ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
});

interface ChatListItemProps {
  chat: ChatItem;
  onPress: () => void;
  textColor: string;
  textSecondary: string;
}

const ChatListItem = memo(function ChatListItem({
  chat,
  onPress,
  textColor,
  textSecondary,
}: ChatListItemProps) {
  return (
    <Pressable 
      style={styles.chatItem}
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Chat with ${chat.title}`}
    >
      {/* Avatar */}
      <ThemedView style={[
        styles.chatAvatar,
        { backgroundColor: chat.avatarBg }
      ]}>
        <ThemedText style={styles.chatEmoji}>{chat.avatar}</ThemedText>
      </ThemedView>
      
      {/* Content */}
      <ThemedView style={styles.chatContent}>
        <ThemedView style={styles.chatHeader}>
          <ThemedText style={[
            styles.chatTitle,
            { color: textColor },
            chat.unread && styles.unreadTitle
          ]}>
            {chat.title}
          </ThemedText>
          <ThemedText style={[styles.chatTime, { color: textSecondary }]}>
            {chat.time}
          </ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.messageRow}>
          <ThemedText 
            style={[
              styles.chatMessage,
              { color: textSecondary },
              chat.unread && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {chat.message}
          </ThemedText>
          
          {chat.unread && chat.unreadCount && (
            <ThemedView style={styles.unreadBadge}>
              <ThemedText style={styles.unreadCount}>
                {chat.unreadCount}
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm + 2, // 10px
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm + 4, // 12px
    gap: Spacing.sm + 4, // 12px
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatEmoji: {
    fontSize: 20,
  },
  chatContent: {
    flex: 1,
    paddingVertical: Spacing.xs,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  chatTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  unreadTitle: {
    fontWeight: FontWeight.bold,
  },
  chatTime: {
    fontSize: FontSize.sm,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatMessage: {
    fontSize: FontSize.sm,
    lineHeight: 18,
    flex: 1,
  },
  unreadMessage: {
    fontWeight: FontWeight.medium,
  },
  unreadBadge: {
    backgroundColor: Colors.light.error,
    borderRadius: BorderRadius.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
  },
  unreadCount: {
    color: 'white',
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
  archivedSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.sm + 4, // 12px
    marginTop: Spacing.sm,
  },
  archivedIcon: {
    width: 32,
    height: 32,
    borderRadius: Spacing.xs + 2, // 6px
    justifyContent: 'center',
    alignItems: 'center',
  },
  archivedText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
});