
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Reservation } from '../types';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import { UserCircleIcon, CalendarDaysIcon, ClockIcon, UserGroupIcon, XCircleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const ReservationItem: React.FC<{ reservation: Reservation; onCancel: (id: string) => void }> = ({ reservation, onCancel }) => {
  const isCancelled = reservation.status === 'cancelled';
  return (
    <li className={`p-4 border rounded-lg ${isCancelled ? 'bg-gray-100 opacity-70' : 'bg-white hover:shadow-md transition-shadow'}`}>
      <div className="flex justify-between items-center mb-2">
        <h4 className={`font-semibold ${isCancelled ? 'text-gray-500' : 'text-primary-dark'}`}>
          Reservation on {new Date(reservation.date).toLocaleDateString()}
        </h4>
        <span className={`px-2 py-0.5 text-xs rounded-full ${
          isCancelled ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
        }`}>
          {reservation.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 flex items-center mb-1"><ClockIcon className="h-4 w-4 mr-2 text-gray-500"/>Time: {reservation.time}</p>
      <p className="text-sm text-gray-600 flex items-center mb-1"><UserGroupIcon className="h-4 w-4 mr-2 text-gray-500"/>Guests: {reservation.guests}</p>
      {reservation.occasion && <p className="text-sm text-gray-600">Occasion: {reservation.occasion}</p>}
      {!isCancelled && (
        <Button onClick={() => onCancel(reservation.id)} variant="danger" size="sm" className="mt-3 w-full md:w-auto">
          <XCircleIcon className="h-4 w-4 mr-1"/> Cancel Reservation
        </Button>
      )}
    </li>
  );
};

const ProfilePage: React.FC = () => {
  const { user, reservations, cancelReservation, logout } = useAuth();

  if (!user) {
    // This should ideally be handled by ProtectedRoute, but as a fallback:
    return <p>Loading user profile...</p>; 
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-xl rounded-xl p-6 md:p-10 mb-10">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <UserCircleIcon className="h-24 w-24 md:h-32 md:w-32 text-primary-DEFAULT mb-6 md:mb-0 md:mr-8" />
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-dark">{user.name}</h1>
            <p className="text-lg text-gray-600">{user.email}</p>
            <div className="mt-6 space-y-3 md:space-y-0 md:space-x-3 flex flex-col md:flex-row">
                <Button variant="outline" size="md" onClick={() => alert('Edit profile feature coming soon!')}>
                    <PencilSquareIcon className="h-5 w-5 mr-2"/> Edit Profile
                </Button>
                <Button onClick={logout} variant="danger" size="md">
                    Logout
                </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-6 md:p-10">
        <h2 className="text-2xl font-semibold text-secondary-dark mb-6 flex items-center">
            <CalendarDaysIcon className="h-7 w-7 mr-3 text-primary-DEFAULT"/> Your Reservations
        </h2>
        {reservations.length > 0 ? (
          <ul className="space-y-4">
            {reservations
                .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime() || b.time.localeCompare(a.time)) // Sort by date desc, then time desc
                .map(res => (
              <ReservationItem key={res.id} reservation={res} onCancel={cancelReservation} />
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg mb-4">You have no reservations.</p>
            <Link to={ROUTES.RESERVATIONS}>
              <Button variant="primary" size="lg">Make a Reservation</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
