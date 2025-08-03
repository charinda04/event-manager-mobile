import { Event, User, EventCategory, EventLocation, EventAttendee, PaginatedResponse } from '@/types';

// Dummy users
const dummyUsers: User[] = [
  {
    id: 'user-1',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'user-2',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'user-3',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: 'user-4',
    email: 'mike.wilson@example.com',
    firstName: 'Mike',
    lastName: 'Wilson',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: 'user-5',
    email: 'art.boutique@example.com',
    firstName: 'Art Boutique',
    lastName: '@M...',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: 'user-6',
    email: 'jason.smith@example.com',
    firstName: 'Jason',
    lastName: 'Smith',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    id: 'user-7',
    email: 'alex.smith@example.com',
    firstName: 'Alex',
    lastName: 'Smith',
    createdAt: new Date('2024-02-25'),
    updatedAt: new Date('2024-02-25'),
  },
  {
    id: 'user-8',
    email: 'moss@example.com',
    firstName: 'moss',
    lastName: '',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: 'user-9',
    email: 'artskool@example.com',
    firstName: 'Artskool',
    lastName: 'Schedule',
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05'),
  },
  {
    id: 'user-10',
    email: 'micah@example.com',
    firstName: 'Micah',
    lastName: 'Clasper-Torch',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
  },
];

// Dummy categories
const dummyCategories: EventCategory[] = [
  {
    id: 'cat-1',
    name: 'Technology',
    color: '#007AFF',
    icon: 'laptop',
  },
  {
    id: 'cat-2',
    name: 'Music',
    color: '#FF6B6B',
    icon: 'music.note',
  },
  {
    id: 'cat-3',
    name: 'Sports',
    color: '#4ECDC4',
    icon: 'sportscourt',
  },
  {
    id: 'cat-4',
    name: 'Food & Drink',
    color: '#45B7D1',
    icon: 'fork.knife',
  },
  {
    id: 'cat-5',
    name: 'Business',
    color: '#96CEB4',
    icon: 'briefcase',
  },
];

// Dummy locations
const dummyLocations: EventLocation[] = [
  {
    id: 'loc-1',
    name: 'Tech Convention Center',
    address: '123 Innovation Blvd',
    city: 'San Francisco',
    state: 'CA',
    country: 'US',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: 'loc-2',
    name: 'Central Park',
    address: 'Central Park',
    city: 'New York',
    state: 'NY',
    country: 'US',
    latitude: 40.7829,
    longitude: -73.9654,
  },
  {
    id: 'loc-3',
    name: 'Music Hall',
    address: '456 Symphony St',
    city: 'Los Angeles',
    state: 'CA',
    country: 'US',
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    id: 'loc-4',
    name: 'Community Center',
    address: '789 Main St',
    city: 'Austin',
    state: 'TX',
    country: 'US',
    latitude: 30.2672,
    longitude: -97.7431,
  },
  {
    id: 'loc-5',
    name: 'Rooftop Venue',
    address: '321 Sky Tower',
    city: 'Seattle',
    state: 'WA',
    country: 'US',
    latitude: 47.6062,
    longitude: -122.3321,
  },
  {
    id: 'loc-6',
    name: 'LUME Studios',
    address: '633 Rose Ave',
    city: 'Mulberry Row',
    state: 'CA',
    country: 'US',
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    id: 'loc-7',
    name: 'HER HOUSE OF HORRORS',
    address: '1234 Horror St',
    city: 'Los Angeles',
    state: 'CA',
    country: 'US',
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    id: 'loc-8',
    name: 'moss',
    address: '5678 Wellness Ave',
    city: 'moss',
    state: 'CA',
    country: 'US',
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    id: 'loc-9',
    name: 'Art Studio',
    address: '1286 W Sunset Blvd',
    city: 'West Hollywood',
    state: 'CA',
    country: 'US',
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    id: 'loc-10',
    name: 'Fashion District',
    address: '999 Fashion Way',
    city: 'Downtown LA',
    state: 'CA',
    country: 'US',
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    id: 'loc-11',
    name: 'Brooklyn Art Center',
    address: '456 Creative Blvd',
    city: 'Brooklyn',
    state: 'NY',
    country: 'US',
    latitude: 40.6782,
    longitude: -73.9442,
  },
  {
    id: 'loc-12',
    name: 'Blue Note Jazz Club',
    address: '131 W 3rd St',
    city: 'Greenwich Village',
    state: 'NY',
    country: 'US',
    latitude: 40.7282,
    longitude: -74.0021,
  },
];

// Generate dummy events
const generateDummyEvents = (): Event[] => {
  const events: Event[] = [];
  const now = new Date();

  for (let i = 1; i <= 40; i++) {
    const startDate = new Date(now);
    startDate.setDate(now.getDate() + Math.floor(Math.random() * 30) + 1); // 1-30 days from now
    startDate.setHours(9 + Math.floor(Math.random() * 12), 0, 0, 0); // Random hour between 9 AM and 9 PM

    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1 + Math.floor(Math.random() * 4)); // 1-5 hours duration

    const organizer = dummyUsers[Math.floor(Math.random() * dummyUsers.length)];
    const category = dummyCategories[Math.floor(Math.random() * dummyCategories.length)];
    const location = dummyLocations[Math.floor(Math.random() * dummyLocations.length)];

    // Generate attendees
    const attendeeCount = Math.floor(Math.random() * 8) + 2; // 2-10 attendees
    const attendees: EventAttendee[] = [];
    
    for (let j = 0; j < attendeeCount; j++) {
      const attendeeUser = dummyUsers[Math.floor(Math.random() * dummyUsers.length)];
      attendees.push({
        id: `attendee-${i}-${j}`,
        user: attendeeUser,
        event: {} as Event, // Will be filled by reference
        status: ['confirmed', 'pending', 'checked_in'][Math.floor(Math.random() * 3)] as any,
        registeredAt: new Date(startDate.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Registered up to 7 days ago
      });
    }

    const eventTitles = [
      'React Native Workshop',
      'Summer Music Festival',
      'Basketball Tournament',
      'Wine Tasting Evening',
      'Startup Pitch Competition',
      'Photography Meetup',
      'Cooking Class',
      'Book Club Meeting',
      'Yoga in the Park',
      'Tech Talk: AI Trends',
      'Art Exhibition Opening',
      'Hiking Adventure',
      'Coffee & Networking',
      'Game Night',
      'Dance Workshop',
      'Film Screening',
      'Farmers Market',
      'Charity Run',
      'Language Exchange',
      'Meditation Session',
      // New nearby-style events
      'Sip + Paint Fridays',
      'DOLLHOUSE OF HORROR FILM FESTIVAL',
      'reiki + sound bath',
      'Oil Painting Class - Florals',
      'Punch Needle Fashion: LA Book Launch Party',
      'Pottery Workshop: Beginner Friendly',
      'Jazz Night at Blue Note',
      'Ceramic Making & Wine',
      'Brooklyn Art Walk',
      'Comedy Show Open Mic',
      'Vintage Market Pop-up',
      'Rooftop Yoga Session',
      'DIY Candle Making',
      'Wine & Paint Social',
      'Underground Dance Party',
      'Food Truck Festival',
      'Tarot Reading Circle',
      'Skateboard Workshop',
      'Plant Care 101',
      'Horror Movie Marathon',
    ];

    const eventDescriptions = [
      'Join us for an exciting hands-on workshop where you\'ll learn the latest techniques and best practices.',
      'Come together with fellow enthusiasts for an unforgettable experience filled with fun and learning.',
      'An amazing opportunity to meet like-minded people and expand your horizons in a welcoming environment.',
      'Discover new skills and connect with passionate individuals who share your interests.',
      'Experience the best of what our community has to offer in this carefully curated event.',
      'Whether you\'re a beginner or expert, this event offers something valuable for everyone.',
      'Step out of your comfort zone and join us for an adventure you won\'t forget.',
      'Learn from industry experts and gain insights that will help you grow personally and professionally.',
    ];

    const event: Event = {
      id: `event-${i}`,
      title: eventTitles[i - 1] || `Amazing Event ${i}`,
      description: eventDescriptions[Math.floor(Math.random() * eventDescriptions.length)],
      startDate,
      endDate,
      location,
      organizer,
      attendees,
      maxCapacity: Math.random() > 0.3 ? 10 + Math.floor(Math.random() * 40) : undefined, // 70% have capacity
      isPublic: Math.random() > 0.2, // 80% public
      category,
      status: ['published', 'draft'][Math.floor(Math.random() * 2)] as any,
      createdAt: new Date(now.getTime() - Math.random() * 14 * 24 * 60 * 60 * 1000), // Created up to 14 days ago
      updatedAt: new Date(),
    };

    // Set event reference in attendees
    attendees.forEach(attendee => {
      attendee.event = event;
    });

    events.push(event);
  }

  return events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

const dummyEvents = generateDummyEvents();

// Get current user (demo user)
export const getCurrentDummyUser = (): User => dummyUsers[0];

// Get all events
export const getDummyEvents = (page = 1, limit = 10): PaginatedResponse<Event> => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedEvents = dummyEvents.slice(startIndex, endIndex);

  return {
    data: paginatedEvents,
    total: dummyEvents.length,
    page,
    limit,
    hasMore: endIndex < dummyEvents.length,
  };
};

// Get user's events (events they organized)
export const getDummyMyEvents = (page = 1, limit = 10): PaginatedResponse<Event> => {
  const currentUser = getCurrentDummyUser();
  const myEvents = dummyEvents.filter(event => event.organizer.id === currentUser.id);
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedEvents = myEvents.slice(startIndex, endIndex);

  return {
    data: paginatedEvents,
    total: myEvents.length,
    page,
    limit,
    hasMore: endIndex < myEvents.length,
  };
};

// Create a new event (simulate)
export const createDummyEvent = (eventData: any): Event => {
  const currentUser = getCurrentDummyUser();
  const newEvent: Event = {
    id: `event-${Date.now()}`,
    title: eventData.title,
    description: eventData.description,
    startDate: new Date(eventData.startDate),
    endDate: new Date(eventData.endDate),
    location: {
      id: `loc-${Date.now()}`,
      name: eventData.location.name,
      address: eventData.location.address || '',
      city: eventData.location.city || '',
      state: eventData.location.state || '',
      country: eventData.location.country || 'US',
    },
    organizer: currentUser,
    attendees: [],
    maxCapacity: eventData.maxCapacity,
    isPublic: eventData.isPublic,
    category: dummyCategories.find(cat => cat.id === eventData.categoryId) || dummyCategories[0],
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Add to dummy events array
  dummyEvents.push(newEvent);
  dummyEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  return newEvent;
};

// Get event by ID
export const getDummyEventById = (id: string): Event | null => {
  return dummyEvents.find(event => event.id === id) || null;
};