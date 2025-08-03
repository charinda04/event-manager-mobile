import { create } from 'zustand';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface City {
  id: string;
  name: string;
  image: string;
}

interface ExploreState {
  selectedLocation: string;
  selectedCategories: string[];
  searchQuery: string;
  categories: Category[];
  cities: City[];
  isLoading: boolean;
  
  // Actions
  setSelectedLocation: (location: string) => void;
  setSearchQuery: (query: string) => void;
  toggleCategory: (categoryId: string) => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
}

export const useExploreStore = create<ExploreState>((set, get) => ({
  selectedLocation: 'Los Angeles',
  selectedCategories: [],
  searchQuery: '',
  isLoading: false,
  
  categories: [
    { id: '1', name: 'Climate', icon: '🌱', color: '#4CAF50' },
    { id: '2', name: 'Fitness', icon: '🏃', color: '#FF5722' },
    { id: '3', name: 'Wellness', icon: '🧘', color: '#9C27B0' },
    { id: '4', name: 'Technology', icon: '💻', color: '#2196F3' },
    { id: '5', name: 'Music', icon: '🎵', color: '#FF9800' },
    { id: '6', name: 'Food & Drink', icon: '🍽️', color: '#795548' },
  ],
  
  cities: [
    { id: '1', name: 'Los Angeles', image: '#2196F3' },
    { id: '2', name: 'San Francisco', image: '#FF9800' },
    { id: '3', name: 'New York', image: '#9C27B0' },
    { id: '4', name: 'Chicago', image: '#4CAF50' },
  ],
  
  setSelectedLocation: (location) => 
    set({ selectedLocation: location }),
  
  setSearchQuery: (query) => 
    set({ searchQuery: query }),
  
  toggleCategory: (categoryId) => 
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(categoryId)
        ? state.selectedCategories.filter(id => id !== categoryId)
        : [...state.selectedCategories, categoryId]
    })),
  
  clearFilters: () => 
    set({ selectedCategories: [], searchQuery: '' }),
  
  setLoading: (loading) => 
    set({ isLoading: loading }),
}));