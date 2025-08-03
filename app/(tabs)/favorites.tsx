import { ScreenContainer, ScreenHeader, EmptyState, AuthGuard } from '@/components/common';

export default function FavoritesScreen() {
  return (
    <AuthGuard>
      <ScreenContainer>
        <ScreenHeader title="Favorites" />
        <EmptyState
          icon="heart"
          title="No Favorite Events"
          description="Events you like will appear here. Tap the heart icon on any event to add it to your favorites."
        />
      </ScreenContainer>
    </AuthGuard>
  );
}

