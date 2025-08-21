
import React, { useState, useEffect } from 'react';
import { MOCK_MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';
import MenuItemCard from '../components/MenuItemCard';
import { SparklesIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/solid';
// import { generateMenuItemDescription } from '../services/geminiService'; // Example for future enhancement


const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MOCK_MENU_ITEMS);
  // const [isLoadingDescriptions, setIsLoadingDescriptions] = useState(false); // For Gemini-powered descriptions

  // Example: Enhance descriptions with Gemini (could be run once or on demand)
  // useEffect(() => {
  //   const enhanceDescriptions = async () => {
  //     setIsLoadingDescriptions(true);
  //     const enhancedItems = await Promise.all(
  //       MOCK_MENU_ITEMS.map(async (item) => {
  //         if (item.description.length < 30) { // Only enhance short descriptions
  //           const newDesc = await generateMenuItemDescription({ name: item.name, category: item.category });
  //           return { ...item, description: newDesc };
  //         }
  //         return item;
  //       })
  //     );
  //     setMenuItems(enhancedItems);
  //     setIsLoadingDescriptions(false);
  //   };
  //   // enhanceDescriptions(); // Call this if you want to auto-enhance
  // }, []);


  const categories: MenuItem['category'][] = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <Bars3BottomLeftIcon className="h-16 w-16 text-primary-DEFAULT mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-dark mb-2">Our Culinary Delights</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our menu, crafted with passion and the finest ingredients. Each dish tells a story of flavor and tradition.
        </p>
      </div>

      {/* Optional: Loading indicator for Gemini descriptions */}
      {/* {isLoadingDescriptions && (
        <div className="text-center py-4">
          <p className="text-primary-DEFAULT flex items-center justify-center">
            <SparklesIcon className="h-5 w-5 mr-2 animate-pulse" /> Refining our exquisite menu descriptions...
          </p>
        </div>
      )} */}

      {categories.map(category => {
        const itemsInCategory = menuItems.filter(item => item.category === category);
        if (itemsInCategory.length === 0) return null;

        return (
          <section key={category}>
            <div className="flex items-center mb-6">
                <SparklesIcon className="h-8 w-8 text-primary-DEFAULT mr-3" />
                <h2 className="text-3xl font-bold text-secondary-dark">{category}s</h2>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {itemsInCategory.map(item => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default MenuPage;
