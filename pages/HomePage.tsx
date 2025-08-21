
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { RESTAURANT_NAME, ROUTES, MOCK_EVENTS } from '../constants';
import EventCard from '../components/EventCard';
import { getRestaurantWelcomeMessage } from '../services/geminiService';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/solid';

const HomePage: React.FC = () => {
  const [welcomeMessage, setWelcomeMessage] = useState<string>('');
  const [isLoadingWelcome, setIsLoadingWelcome] = useState<boolean>(true);

  useEffect(() => {
    const fetchWelcome = async () => {
      setIsLoadingWelcome(true);
      try {
        const message = await getRestaurantWelcomeMessage();
        setWelcomeMessage(message);
      } catch (error) {
        console.error("Failed to load welcome message:", error);
        // Fallback message is handled in getRestaurantWelcomeMessage
        setWelcomeMessage(`Welcome to ${RESTAURANT_NAME}! Discover an exceptional dining experience.`);
      } finally {
        setIsLoadingWelcome(false);
      }
    };
    fetchWelcome();
  }, []);

  const featuredEvents = MOCK_EVENTS.slice(0, 2);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section 
        className="bg-cover bg-center rounded-xl shadow-2xl py-20 px-6 md:py-32 md:px-10 text-center text-white relative overflow-hidden min-h-[60vh] flex flex-col justify-center items-center"
        style={{ backgroundImage: "url('https://picsum.photos/seed/restaurant_hero/1600/900')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Experience {RESTAURANT_NAME}
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto drop-shadow-md">
            Where culinary artistry meets unforgettable moments.
          </p>
          <div className="space-x-0 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center items-center">
            <Link to={ROUTES.RESERVATIONS}>
              <Button variant="primary" size="lg" className="w-full md:w-auto">
                Reserve Your Table <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to={ROUTES.MENU}>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary-dark w-full md:w-auto">
                Explore Our Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Message Section */}
      <section className="bg-white p-8 md:p-12 rounded-xl shadow-xl">
        <div className="flex items-center mb-4">
          <SparklesIcon className="h-8 w-8 text-primary-DEFAULT mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark">A Taste of Perfection</h2>
        </div>
        {isLoadingWelcome ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        ) : (
          <p className="text-lg text-gray-700 leading-relaxed">
            {welcomeMessage}
          </p>
        )}
      </section>

      {/* Featured Events Section */}
      {featuredEvents.length > 0 && (
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-8 text-center">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to={ROUTES.EVENTS}>
              <Button variant="secondary" size="lg">
                View All Events
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="bg-primary-dark text-white p-8 md:p-12 rounded-xl shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for an Unforgettable Meal?</h2>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          Book your table today and let us treat you to a symphony of flavors.
        </p>
        <Link to={ROUTES.RESERVATIONS}>
          <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary-dark">
            Make a Reservation
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
