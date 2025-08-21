
import { Event, MenuItem } from '../types';

export const RESTAURANT_NAME = "The Gourmet Place";

export enum ROUTES {
  HOME = "/",
  LOGIN = "/login",
  RESERVATIONS = "/reservations",
  EVENTS = "/events",
  PROFILE = "/profile",
  MENU = "/menu",
}

export const MOCK_EVENTS: Event[] = [
  {
    id: 'event1',
    title: 'Wine Tasting Evening',
    date: '2024-08-15',
    time: '19:00',
    description: 'Explore a curated selection of fine wines from around the world, paired with artisanal cheeses and hors d\'oeuvres. Our sommelier will guide you through each tasting.',
    imageUrl: 'https://picsum.photos/seed/event1/600/400',
    location: 'The Cellar Room',
  },
  {
    id: 'event2',
    title: 'Jazz Night Special',
    date: '2024-08-22',
    time: '20:00',
    description: 'Enjoy an enchanting evening of live jazz music. Our special prix-fixe menu for the night features seasonal delights. Reservations highly recommended.',
    imageUrl: 'https://picsum.photos/seed/event2/600/400',
    location: 'Main Dining Hall',
  },
  {
    id: 'event3',
    title: 'Seasonal Chef\'s Table',
    date: '2024-09-05',
    time: '18:30',
    description: 'An exclusive dining experience where our head chef prepares a unique multi-course tasting menu right before your eyes, highlighting the best of seasonal ingredients.',
    imageUrl: 'https://picsum.photos/seed/event3/600/400',
    location: 'Private Dining Area',
  }
];

export const MOCK_MENU_ITEMS: MenuItem[] = [
  { id: 'm1', name: 'Crispy Calamari', description: 'Lightly battered and fried calamari served with a zesty marinara sauce.', price: 14.99, category: 'Appetizer', imageUrl: 'https://picsum.photos/seed/calamari/300/200' },
  { id: 'm2', name: 'Caprese Salad', description: 'Fresh mozzarella, ripe tomatoes, and basil drizzled with balsamic glaze.', price: 12.50, category: 'Appetizer', imageUrl: 'https://picsum.photos/seed/caprese/300/200' },
  { id: 'm3', name: 'Filet Mignon', description: '8oz center-cut filet mignon, cooked to perfection, served with asparagus and mashed potatoes.', price: 38.00, category: 'Main Course', imageUrl: 'https://picsum.photos/seed/filet/300/200' },
  { id: 'm4', name: 'Salmon en Croute', description: 'Atlantic salmon wrapped in puff pastry with spinach and dill, served with a lemon butter sauce.', price: 29.50, category: 'Main Course', imageUrl: 'https://picsum.photos/seed/salmon/300/200' },
  { id: 'm5', name: 'Tiramisu', description: 'Classic Italian dessert with ladyfingers, espresso, mascarpone cream, and cocoa powder.', price: 9.00, category: 'Dessert', imageUrl: 'https://picsum.photos/seed/tiramisu/300/200' },
  { id: 'm6', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.', price: 9.50, category: 'Dessert', imageUrl: 'https://picsum.photos/seed/lava/300/200' },
  { id: 'm7', name: 'Old Fashioned', description: 'Classic cocktail with bourbon, bitters, sugar, and an orange peel.', price: 12.00, category: 'Beverage' },
  { id: 'm8', name: 'Sparkling Cranberry Mocktail', description: 'A refreshing non-alcoholic blend of cranberry, lime, and soda.', price: 7.00, category: 'Beverage' },
];

export const AVAILABLE_TIMES: string[] = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
