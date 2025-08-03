import { ScreenContainer, ScreenHeader, EmptyState, AuthGuard } from '@/components/common';

export default function MessagesScreen() {
  return (
    <AuthGuard>
      <ScreenContainer>
        <ScreenHeader title="Messages" />
        <EmptyState
          icon="message"
          title="No Messages"
          description="Connect with event organizers and attendees. Messages will appear here when you start conversations."
        />
      </ScreenContainer>
    </AuthGuard>
  );
}

