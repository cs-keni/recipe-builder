import React, { useState } from 'react';
import { motion } from 'framer-motion';

function RecipeSearch({ onSearch, isDarkMode }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: 'all',
        difficulty: 'all',
        time: 'all'
    });

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch({ searchTerm, ...filters });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}
        >
            <form onSubmit={handleSearch} className="space-y-4">
                <div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search recipes..."
                        className={`w-full px-4 py-2 rounded-md border ${
                            isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                : 'border-gray-300'
                        }`}
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                        value={filters.category}
                        onChange={(e) => setFilters({...filters, category: e.target.value})}
                        className={`px-4 py-2 rounded-md border ${
                            isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'border-gray-300'
                        }`}
                    >
                        <option value="all">All Categories</option>
                        <option value="main">Main Dishes</option>
                        <option value="dessert">Desserts</option>
                        <option value="vegetarian">Vegetarian</option>
                    </select>

                    <select
                        value={filters.difficulty}
                        onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                        className={`px-4 py-2 rounded-md border ${
                            isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'border-gray-300'
                        }`}
                    >
                        <option value="all">All Difficulties</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    <select
                        value={filters.time}
                        onChange={(e) => setFilters({...filters, time: e.target.value})}
                        className={`px-4 py-2 rounded-md border ${
                            isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'border-gray-300'
                        }`}
                    >
                        <option value="all">Any Time</option>
                        <option value="15">15 minutes or less</option>
                        <option value="30">30 minutes or less</option>
                        <option value="60">1 hour or less</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className={`w-full py-2 rounded-md ${
                        isDarkMode 
                            ? 'bg-indigo-600 hover:bg-indigo-700' 
                            : 'bg-indigo-500 hover:bg-indigo-600'
                    } text-white transition-colors`}
                >
                    Search Recipes
                </button>
            </form>
        </motion.div>
    );
}

export default RecipeSearch; 