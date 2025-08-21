
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ReservationsPage from './pages/ReservationsPage';
import EventsPage from './pages/EventsPage';
import ProfilePage from './pages/ProfilePage';
import MenuPage from './pages/MenuPage';
import { useAuth } from './hooks/useAuth';
import { ROUTES } from './constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.MENU} element={<MenuPage />} />
            <Route 
              path={ROUTES.RESERVATIONS} 
              element={
                <ProtectedRoute>
                  <ReservationsPage />
                </ProtectedRoute>
              } 
            />
            <Route path={ROUTES.EVENTS} element={<EventsPage />} />
            <Route 
              path={ROUTES.PROFILE} 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
