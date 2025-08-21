
import React from 'react';
import { MenuItem } from '../types';
import Button from './Button';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row">
      {item.imageUrl && (
        <img 
          className="w-full md:w-48 h-48 md:h-auto object-cover" 
          src={item.imageUrl} 
          alt={item.name} 
        />
      )}
      <div className={`p-6 flex flex-col flex-grow ${!item.imageUrl && 'w-full'}`}>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-secondary-dark mb-1">{item.name}</h3>
          <p className="text-lg font-bold text-primary-DEFAULT">${item.price.toFixed(2)}</p>
        </div>
        <p className="text-gray-600 text-sm mb-1">{item.category}</p>
        <p className="text-gray-700 text-sm mb-4 flex-grow">{item.description}</p>
        <Button variant="outline" size="sm" className="mt-auto self-start">
          Add to Order (Feature Coming Soon)
        </Button>
      </div>
    </div>
  );
};

export default MenuItemCard;
