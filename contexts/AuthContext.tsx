
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Reservation, AuthContextType } from '../types';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('gourmetUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const storedReservations = localStorage.getItem('gourmetReservations');
    return storedReservations ? JSON.parse(storedReservations) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('gourmetUser', JSON.stringify(user));
      // Filter reservations for the current user if user changes
      const userReservations = reservations.filter(r => r.userId === user.id);
      setReservations(userReservations); // This might clear other users' reservations if not handled carefully
                                       // For a real app, reservations would be fetched from a backend based on user ID.
                                       // Here, we simplify by assuming local storage is per-user context effectively.
    } else {
      localStorage.removeItem('gourmetUser');
    }
  }, [user]); // Removed reservations from dependency to avoid loop, manage reservations separately.

  useEffect(() => {
    localStorage.setItem('gourmetReservations', JSON.stringify(reservations));
  }, [reservations]);

  const login = (email: string, name: string) => {
    const newUser: User = { id: uuidv4(), email, name };
    setUser(newUser);
    // On login, load reservations that might belong to this user if they existed from a previous session.
    // For this demo, we assume new login might re-load their reservations if any were stored with matching user ID.
    // In a real app, you'd fetch this from backend.
    const storedReservations = localStorage.getItem('gourmetReservations');
    if (storedReservations) {
        const allReservations: Reservation[] = JSON.parse(storedReservations);
        setReservations(allReservations.filter(r => r.userId === newUser.id));
    } else {
        setReservations([]);
    }
  };

  const logout = () => {
    setUser(null);
    setReservations([]); // Clear reservations on logout for the current user
  };

  const addReservation = (reservationData: Omit<Reservation, 'id' | 'userId' | 'status'>) => {
    if (!user) return; // Should not happen if called from a protected context
    const newReservation: Reservation = {
      ...reservationData,
      id: uuidv4(),
      userId: user.id,
      status: 'confirmed',
    };
    setReservations(prev => [...prev, newReservation]);
  };

  const cancelReservation = (reservationId: string) => {
    setReservations(prev => 
      prev.map(r => r.id === reservationId ? { ...r, status: 'cancelled' } : r)
    );
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, reservations, addReservation, cancelReservation }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
