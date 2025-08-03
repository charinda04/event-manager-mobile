import React, { memo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '@/constants/Colors';

export interface ConversationBubble {
  id: string;
  avatar: string;
  avatarBg: string;
  position: {
    top: number;
    left?: number;
    right?: number;
  };
  size: 'small' | 'medium' | 'large';
  hasMessage?: boolean;
  messageText?: string;
}

interface ConversationPreviewProps {
  conversations: ConversationBubble[];
  containerHeight?: number;
  style?: ViewStyle;
}

export const ConversationPreview = memo(function ConversationPreview({
  conversations,
  containerHeight = 400,
  style,
}: ConversationPreviewProps) {
  const getSizeValue = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small': return 40;
      case 'medium': return 50;
      case 'large': return 60;
      default: return 40;
    }
  };

  return (
    <ThemedView style={[
      styles.container,
      { height: containerHeight },
      style
    ]}>
      {conversations.map((conversation) => {
        const sizeValue = getSizeValue(conversation.size);
        
        return (
          <ThemedView 
            key={conversation.id}
            style={[
              styles.conversationBubble,
              {
                position: 'absolute',
                top: conversation.position.top,
                left: conversation.position.left,
                right: conversation.position.right,
                width: sizeValue,
                height: sizeValue,
              }
            ]}
          >
            {/* Avatar */}
            <ThemedView style={[
              styles.conversationAvatar,
              { 
                backgroundColor: conversation.avatarBg,
                width: sizeValue,
                height: sizeValue,
                borderRadius: sizeValue / 2,
              }
            ]}>
              <ThemedText style={[
                styles.conversationEmoji,
                { fontSize: sizeValue * 0.4 }
              ]}>
                {conversation.avatar}
              </ThemedText>
            </ThemedView>
            
            {/* Message Preview */}
            {conversation.hasMessage && conversation.messageText && (
              <MessageBubble 
                text={conversation.messageText}
                avatarSize={sizeValue}
              />
            )}
          </ThemedView>
        );
      })}
    </ThemedView>
  );
});

interface MessageBubbleProps {
  text: string;
  avatarSize: number;
}

const MessageBubble = memo(function MessageBubble({
  text,
  avatarSize,
}: MessageBubbleProps) {
  return (
    <ThemedView style={[
      styles.messagePreview,
      {
        top: -10,
        left: avatarSize + 10,
      }
    ]}>
      <ThemedText style={styles.messageText} numberOfLines={2}>
        {text}
      </ThemedText>
      <ThemedView style={styles.messageArrow} />
    </ThemedView>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginHorizontal: Spacing.lg,
  },
  conversationBubble: {
    position: 'relative',
  },
  conversationAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.md,
  },
  conversationEmoji: {
    fontWeight: '500',
  },
  messagePreview: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm + 4, // 12px
    minWidth: 200,
    maxWidth: 250,
    ...Shadow.md,
  },
  messageText: {
    fontSize: FontSize.sm,
    color: Colors.light.text,
    lineHeight: 18,
  },
  messageArrow: {
    position: 'absolute',
    left: -6,
    top: 15,
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderTopColor: 'transparent',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent',
    borderRightWidth: 6,
    borderRightColor: 'white',
  },
});