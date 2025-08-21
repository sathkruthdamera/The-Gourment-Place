
import React from 'react';
import { RESTAURANT_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-dark text-gray-300 py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} {RESTAURANT_NAME}. All rights reserved.</p>
        <p className="text-sm mt-2">123 Culinary Avenue, Flavor Town, USA</p>
        <div className="mt-4">
          <a href="#" className="text-gray-300 hover:text-primary-light mx-2 transition-colors">Facebook</a>
          <a href="#" className="text-gray-300 hover:text-primary-light mx-2 transition-colors">Instagram</a>
          <a href="#" className="text-gray-300 hover:text-primary-light mx-2 transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
