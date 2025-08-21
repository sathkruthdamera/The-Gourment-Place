
import React, { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';
import TextInput from './TextInput';
import { AVAILABLE_TIMES } from '../constants';
import { Reservation } from '../types';

interface ReservationFormProps {
  onReservationMade: (reservation: Reservation) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ onReservationMade }) => {
  const { addReservation } = useAuth();
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>(AVAILABLE_TIMES[0]);
  const [guests, setGuests] = useState<number>(2);
  const [occasion, setOccasion] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (new Date(date) < new Date(new Date().toDateString())) {
      setError('Please select a future date.');
      return;
    }
    if (guests < 1 || guests > 10) {
      setError('Number of guests must be between 1 and 10.');
      return;
    }

    const reservationData: Omit<Reservation, 'id' | 'userId' | 'status'> = { date, time, guests, occasion };
    // The addReservation in AuthContext will handle adding id, userId, status
    addReservation(reservationData); 
    
    // For UI feedback, we create a temporary reservation object.
    // In a real app, onReservationMade might receive the full object from a backend response.
    const newReservationForDisplay: Reservation = {
        ...reservationData,
        id: 'temp-id', // This ID is just for local display and won't be the final one
        userId: 'temp-user-id',
        status: 'confirmed'
    };
    onReservationMade(newReservationForDisplay);

    setSuccessMessage(`Reservation for ${guests} guest(s) on ${date} at ${time} confirmed!`);
    // Reset form partially
    // setDate(new Date().toISOString().split('T')[0]);
    // setTime(AVAILABLE_TIMES[0]);
    // setGuests(2);
    setOccasion('');
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-secondary-dark mb-6 text-center">Make a Reservation</h2>
      {error && <p className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
      {successMessage && <p className="mb-4 text-sm text-green-600 bg-green-100 p-3 rounded-md">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          label="Date"
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          required
        />
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT sm:text-sm"
            required
          >
            {AVAILABLE_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <TextInput
          label="Number of Guests"
          type="number"
          id="guests"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value, 10))}
          min="1"
          max="10"
          required
        />
        <TextInput
          label="Occasion (Optional)"
          type="text"
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          placeholder="e.g., Birthday, Anniversary"
        />
        <Button type="submit" variant="primary" size="lg" className="w-full">
          Reserve Table
        </Button>
      </form>
    </div>
  );
};

export default ReservationForm;
