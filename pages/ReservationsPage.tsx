
import React, { useState } from 'react';
import ReservationForm from '../components/ReservationForm';
import { useAuth } from '../hooks/useAuth';
import { Reservation } from '../types';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import Button from '../components/Button';
import { CalendarDaysIcon, ClockIcon, UserGroupIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';


const ReservationCard: React.FC<{ reservation: Reservation; onCancel: (id: string) => void }> = ({ reservation, onCancel }) => {
  const isCancelled = reservation.status === 'cancelled';
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${isCancelled ? 'opacity-60 bg-gray-50' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-xl font-semibold ${isCancelled ? 'text-gray-500' : 'text-secondary-dark'}`}>
          Reservation #{reservation.id.substring(0, 8)}
        </h3>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          isCancelled ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
        </span>
      </div>
      <div className="space-y-2 text-sm text-gray-700">
        <p className="flex items-center"><CalendarDaysIcon className="h-5 w-5 mr-2 text-primary-DEFAULT" /> Date: {new Date(reservation.date).toLocaleDateString()}</p>
        <p className="flex items-center"><ClockIcon className="h-5 w-5 mr-2 text-primary-DEFAULT" /> Time: {reservation.time}</p>
        <p className="flex items-center"><UserGroupIcon className="h-5 w-5 mr-2 text-primary-DEFAULT" /> Guests: {reservation.guests}</p>
        {reservation.occasion && <p>Occasion: {reservation.occasion}</p>}
      </div>
      {!isCancelled && (
        <Button 
          onClick={() => onCancel(reservation.id)} 
          variant="danger" 
          size="sm" 
          className="mt-4 w-full"
        >
          <XCircleIcon className="h-4 w-4 mr-1" /> Cancel Reservation
        </Button>
      )}
      {isCancelled && (
         <p className="mt-4 text-sm text-red-600 flex items-center justify-center"><XCircleIcon className="h-5 w-5 mr-1"/> This reservation has been cancelled.</p>
      )}
    </div>
  );
};


const ReservationsPage: React.FC = () => {
  const { user, reservations, cancelReservation } = useAuth();
  const [showForm, setShowForm] = useState(true); // Show form by default or if no reservations

  const handleReservationMade = (newReservation: Reservation) => {
    // The reservation is already added to context by ReservationForm's addReservation call
    // This function is mainly for UI feedback if needed, e.g., scrolling to the new reservation
    console.log('Reservation made:', newReservation);
    // Potentially hide form or show a success message specific to this page
    setShowForm(false); // Hide form after a successful reservation
  };

  const activeReservations = reservations.filter(r => r.status === 'confirmed');
  const pastOrCancelledReservations = reservations.filter(r => r.status !== 'confirmed');


  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-700 mb-4">Please log in to make or manage reservations.</p>
        <Link to={ROUTES.LOGIN}>
          <Button variant="primary">Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {showForm || activeReservations.length === 0 ? (
        <ReservationForm onReservationMade={handleReservationMade} />
      ) : (
        <div className="text-center">
           <Button onClick={() => setShowForm(true)} variant="primary" size="lg">
            <CheckCircleIcon className="h-5 w-5 mr-2"/> You have an upcoming reservation! <span className="ml-2 font-normal">Want to make another?</span>
           </Button>
        </div>
      )}

      {reservations.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-secondary-dark mb-6">Your Reservations</h2>
          {activeReservations.length > 0 && (
            <>
              <h3 className="text-xl font-medium text-gray-700 mb-4">Upcoming</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {activeReservations.map(res => (
                  <ReservationCard key={res.id} reservation={res} onCancel={cancelReservation} />
                ))}
              </div>
            </>
          )}
          
          {pastOrCancelledReservations.length > 0 && (
             <>
              <h3 className="text-xl font-medium text-gray-700 mb-4">Past or Cancelled</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastOrCancelledReservations.map(res => (
                  <ReservationCard key={res.id} reservation={res} onCancel={cancelReservation} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      {reservations.length === 0 && !showForm && (
        <p className="text-center text-gray-600 mt-8">You have no reservations yet.</p>
      )}
    </div>
  );
};

export default ReservationsPage;
