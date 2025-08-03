import { StyleSheet, Pressable, ScrollView, Image, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AuthGuard, SectionHeader, SearchBar } from '@/components/common';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useExploreStore } from '@/stores/exploreStore';
import { usePopularEvents, useFeaturedEvents, useSearchEvents } from '@/hooks/useExploreData';

export default function ExploreScreen() {
  const {
    selectedLocation,
    searchQuery,
    selectedCategories,
    categories,
    cities,
    setSelectedLocation,
    setSearchQuery,
    toggleCategory
  } = useExploreStore();

  const { data: popularEvents, isLoading: isLoadingPopular } = usePopularEvents();
  const { data: featuredEvents, isLoading: isLoadingFeatured } = useFeaturedEvents(selectedCategories);
  const { data: searchResults, isLoading: isSearching } = useSearchEvents(searchQuery);

  const displayEvents = searchQuery 
    ? searchResults?.events || []
    : popularEvents?.events || [];
    
  const isLoading = isLoadingPopular || isLoadingFeatured || isSearching;

  return (
    <AuthGuard>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedView style={styles.headerLeft}>
            <ThemedView style={styles.avatar}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/40x40/333/fff?text=U' }}
                style={styles.avatarImage}
              />
            </ThemedView>
            <ThemedView>
              <ThemedText style={styles.discoverText}>Discover</ThemedText>
            </ThemedView>
          </ThemedView>
          <Pressable style={styles.mapButton} onPress={() => setSearchQuery(searchQuery ? '' : 'search')}>
            <IconSymbol size={24} name="map" color="#000" />
          </Pressable>
        </ThemedView>

        {/* Search Bar */}
        {searchQuery && (
          <ThemedView style={styles.searchSection}>
            <SearchBar
              placeholder="Search events..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </ThemedView>
        )}

        {/* Location */}
        <ThemedView style={styles.locationSection}>
          <ThemedText style={styles.locationTitle}>{selectedLocation}</ThemedText>
        </ThemedView>

        {/* Popular Events */}
        <ThemedView style={styles.section}>
          <SectionHeader 
            title={searchQuery ? "Search Results" : "Popular Events"} 
            showViewAll={!searchQuery}
            viewAllText="View All ›"
          />
          
          {isLoading ? (
            <ThemedView style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <ThemedText style={styles.loadingText}>Loading events...</ThemedText>
            </ThemedView>
          ) : (
            <ThemedView style={styles.eventsContainer}>
              {displayEvents.length === 0 ? (
                <ThemedView style={styles.emptyContainer}>
                  <ThemedText style={styles.emptyText}>
                    {searchQuery ? 'No events found' : 'No events available'}
                  </ThemedText>
                </ThemedView>
              ) : (
                displayEvents.slice(0, 3).map((event, index) => (
                  <ThemedView key={event.id} style={styles.eventWrapper}>
                    <ThemedView style={styles.eventImageContainer}>
                      <ThemedView style={[
                        styles.eventImage,
                        { backgroundColor: index === 0 ? '#87CEEB' : index === 1 ? '#333' : '#FF6B35' }
                      ]}>
                        {index === 0 && (
                          <ThemedView style={styles.eventImageContent}>
                            <ThemedText style={styles.eventImageText}>alo</ThemedText>
                          </ThemedView>
                        )}
                        {index === 1 && (
                          <ThemedView style={styles.eventImageContent}>
                            <ThemedText style={styles.eventImageLabel}>S</ThemedText>
                          </ThemedView>
                        )}
                        {index === 2 && (
                          <ThemedView style={styles.eventImageContent}>
                            <ThemedView style={styles.fintechLogo} />
                          </ThemedView>
                        )}
                      </ThemedView>
                      
                      {/* Waitlist button for first event */}
                      {index === 0 && (
                        <Pressable style={styles.waitlistButton}>
                          <IconSymbol size={12} name="clock" color="#007AFF" />
                          <ThemedText style={styles.waitlistText}>Waitlist</ThemedText>
                        </Pressable>
                      )}
                    </ThemedView>
                    
                    <ThemedView style={styles.eventDetails}>
                      <ThemedView style={styles.eventHeader}>
                        <ThemedText style={styles.eventOrganizer}>
                          {index === 0 ? 'alo' : index === 1 ? 'S' : ''} {event.title.split(' ')[0]}
                        </ThemedText>
                      </ThemedView>
                      
                      <ThemedText style={styles.eventTitle} numberOfLines={2}>
                        {event.title}
                      </ThemedText>
                      
                      <ThemedView style={styles.eventMeta}>
                        <IconSymbol size={12} name="clock" color="#8E8E93" />
                        <ThemedText style={styles.eventTime}>
                          {event.startDate.toLocaleDateString('en-US', { weekday: 'long' })}, {event.startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                        </ThemedText>
                      </ThemedView>
                    </ThemedView>
                  </ThemedView>
                ))
              )}
            </ThemedView>
          )}
        </ThemedView>

        {/* Categories */}
        {!searchQuery && (
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
            
            <ThemedView style={styles.categoriesContainer}>
              {categories.slice(0, 3).map((category) => (
                <Pressable 
                  key={category.id} 
                  style={[
                    styles.categoryCard,
                    selectedCategories.includes(category.id) && styles.categoryCardSelected
                  ]}
                  onPress={() => toggleCategory(category.id)}
                >
                  <ThemedView style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                    <ThemedText style={styles.categoryEmoji}>{category.icon}</ThemedText>
                  </ThemedView>
                  <ThemedText style={[
                    styles.categoryName,
                    selectedCategories.includes(category.id) && styles.categoryNameSelected
                  ]}>
                    {category.name}
                  </ThemedText>
                </Pressable>
              ))}
            </ThemedView>
          </ThemedView>
        )}

        {/* Cities */}
        {!searchQuery && (
          <ThemedView style={styles.section}>
            <SectionHeader 
              title="Cities" 
              showViewAll={true}
              viewAllText="View All ›"
            />
            
            <ThemedView style={styles.citiesContainer}>
              {cities.slice(0, 2).map((city) => (
                <Pressable 
                  key={city.id} 
                  style={styles.cityCard}
                  onPress={() => setSelectedLocation(city.name)}
                >
                  <ThemedView style={[styles.cityImage, { backgroundColor: city.image }]} />
                  <ThemedText style={styles.cityName}>{city.name}</ThemedText>
                </Pressable>
              ))}
            </ThemedView>
          </ThemedView>
        )}
        
        <ThemedView style={styles.bottomPadding} />
      </ScrollView>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#F8F9FA',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  discoverText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  mapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  locationSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  locationTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#8E8E93',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  eventsContainer: {
    gap: 16,
  },
  eventWrapper: {
    flexDirection: 'row',
    gap: 12,
  },
  eventImageContainer: {
    position: 'relative',
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImageContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImageText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  eventImageLabel: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  fintechLogo: {
    width: 40,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 4,
  },
  waitlistButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  waitlistText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  eventHeader: {
    marginBottom: 4,
  },
  eventOrganizer: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    lineHeight: 20,
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  eventTime: {
    fontSize: 12,
    color: '#8E8E93',
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  categoryCard: {
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 12,
  },
  categoryCardSelected: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  categoryNameSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
  citiesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cityCard: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  cityImage: {
    height: 120,
    borderRadius: 12,
    width: '100%',
  },
  cityName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 100,
  },
});