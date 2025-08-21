
import React from 'react';
import EventCard from '../components/EventCard';
import { MOCK_EVENTS } from '../constants';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';

const EventsPage: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <CalendarDaysIcon className="h-16 w-16 text-primary-DEFAULT mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-dark mb-2">Upcoming Events</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join us for special occasions, themed nights, and culinary celebrations. There's always something exciting happening at The Gourmet Place.
        </p>
      </div>

      {MOCK_EVENTS.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {MOCK_EVENTS.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-xl py-10">
          No upcoming events scheduled at the moment. Please check back soon!
        </p>
      )}
    </div>
  );
};

export default EventsPage;
