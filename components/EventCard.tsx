
import React from 'react';
import { Event } from '../types';
import { CalendarDaysIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <img className="w-full h-56 object-cover" src={event.imageUrl} alt={event.title} />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-secondary-dark mb-2">{event.title}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <CalendarDaysIcon className="h-5 w-5 mr-2 text-primary-DEFAULT" />
          <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <ClockIcon className="h-5 w-5 mr-2 text-primary-DEFAULT" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPinIcon className="h-5 w-5 mr-2 text-primary-DEFAULT" />
          <span>{event.location}</span>
        </div>
        <p className="text-gray-700 text-base mb-4 flex-grow">{event.description}</p>
        <Button variant="primary" size="md" className="mt-auto w-full">
          Learn More & RSVP
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
