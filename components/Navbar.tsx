
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { RESTAURANT_NAME, ROUTES } from '../constants';
import { Bars3Icon, XMarkIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
      isActive ? 'bg-primary-dark text-white' : 'text-gray-700 hover:bg-primary-light hover:text-gray-900'
    }`;
  
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
      isActive ? 'bg-primary-dark text-white' : 'text-gray-700 hover:bg-primary-light hover:text-gray-900'
    }`;

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to={ROUTES.HOME} className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary-dark tracking-tight">{RESTAURANT_NAME}</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to={ROUTES.HOME} className={navLinkClass}>Home</NavLink>
              <NavLink to={ROUTES.MENU} className={navLinkClass}>Menu</NavLink>
              <NavLink to={ROUTES.RESERVATIONS} className={navLinkClass}>Reservations</NavLink>
              <NavLink to={ROUTES.EVENTS} className={navLinkClass}>Events</NavLink>
              {user ? (
                <>
                  <NavLink to={ROUTES.PROFILE} className={navLinkClass}>
                    <UserCircleIcon className="h-6 w-6 inline-block mr-1" /> Profile
                  </NavLink>
                  <button
                    onClick={logout}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-red-100 hover:text-red-700 transition-colors duration-150"
                  >
                    <ArrowRightOnRectangleIcon className="h-6 w-6 inline-block mr-1" /> Logout
                  </button>
                </>
              ) : (
                <NavLink to={ROUTES.LOGIN} className={navLinkClass}>Login</NavLink>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to={ROUTES.HOME} className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to={ROUTES.MENU} className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Menu</NavLink>
            <NavLink to={ROUTES.RESERVATIONS} className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Reservations</NavLink>
            <NavLink to={ROUTES.EVENTS} className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Events</NavLink>
            {user ? (
              <>
                <NavLink to={ROUTES.PROFILE} className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                  <UserCircleIcon className="h-5 w-5 inline-block mr-1" /> Profile
                </NavLink>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-red-100 hover:text-red-700 transition-colors duration-150"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 inline-block mr-1" /> Logout
                </button>
              </>
            ) : (
              <NavLink to={ROUTES.LOGIN} className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Login</NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
