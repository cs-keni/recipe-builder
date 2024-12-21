import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function RecipeSuggestions() {
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
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Popular Recipe Ideas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <AnimatePresence>
                    {displayedRecipes.map((recipe) => (
                        <motion.div
                            key={recipe.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        >
                            <div 
                                className="h-48 w-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${recipe.image})` }}
                            />
                            <div className="p-4">
                                <h3 className="font-medium text-gray-800">{recipe.name}</h3>
                                <div className="mt-2 text-sm text-gray-500 flex space-x-4">
                                    <span>❤️ {recipe.likes}</span>
                                    <span>🔄 {recipe.shares}</span>
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
                className="mt-6 w-full bg-indigo-50 text-indigo-600 py-2 rounded-md hover:bg-indigo-100 transition-colors"
            >
                {showMore ? 'Show Less' : 'Show More Ideas'}
            </motion.button>
        </div>
    );
}

export default RecipeSuggestions; 