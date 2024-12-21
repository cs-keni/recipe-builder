import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function RecipeSuggestions({ isDarkMode }) {
    const [showMore, setShowMore] = useState(false);
    
    const popularRecipes = [
        {
            id: 1,
            name: "Classic Spaghetti Carbonara",
            likes: 1200,
            shares: 450,
            image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            name: "Chicken Stir Fry",
            likes: 980,
            shares: 320,
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            name: "Homemade Pizza",
            likes: 1500,
            shares: 600,
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            name: "Beef Tacos",
            likes: 850,
            shares: 280,
            image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 5,
            name: "Greek Salad",
            likes: 720,
            shares: 190,
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 6,
            name: "Chocolate Chip Cookies",
            likes: 2000,
            shares: 800,
            image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 7,
            name: "Vegetable Curry",
            likes: 890,
            shares: 300,
            image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 8,
            name: "Grilled Salmon",
            likes: 760,
            shares: 250,
            image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 9,
            name: "Mac and Cheese",
            likes: 1100,
            shares: 400,
            image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 10,
            name: "Berry Smoothie Bowl",
            likes: 950,
            shares: 340,
            image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&w=800&q=80"
        }
    ];

    const displayedRecipes = showMore ? popularRecipes : popularRecipes.slice(0, 3);

    return (
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Popular Recipes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                    {displayedRecipes.map((recipe) => (
                        <motion.div
                            key={recipe.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="relative group cursor-pointer"
                        >
                            <div className="relative h-48 rounded-lg overflow-hidden">
                                <img 
                                    src={recipe.image} 
                                    alt={recipe.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-200"/>
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h3 className="text-white font-semibold text-lg">{recipe.name}</h3>
                                    <div className="flex items-center space-x-4 text-sm text-gray-200">
                                        <span>{recipe.likes.toLocaleString()} likes</span>
                                        <span>{recipe.shares.toLocaleString()} shares</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowMore(!showMore)}
                className={`mt-6 w-full py-2 rounded-md ${
                    isDarkMode 
                        ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                } transition-colors`}
            >
                {showMore ? 'Show Less' : 'Show More Ideas'}
            </motion.button>
        </div>
    );
}

export default RecipeSuggestions; 