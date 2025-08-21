
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Reservation {
  id: string;
  userId: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  status: 'confirmed' | 'cancelled';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  imageUrl: string;
  location: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage';
  imageUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  reservations: Reservation[];
  login: (email: string, name: string) => void;
  logout: () => void;
  addReservation: (reservation: Omit<Reservation, 'id' | 'userId' | 'status'>) => void;
  cancelReservation: (reservationId: string) => void;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
