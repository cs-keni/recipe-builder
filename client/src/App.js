import './App.css';
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { getRecipes } from "./api";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import Welcome from "./components/Welcome";
import GenerateRecipeForm from "./components/GenerateRecipeForm";
import RecipeSuggestions from "./components/RecipeSuggestions";
import Auth from "./components/Auth";
import Header from "./components/Header";
import RecipeSearch from "./components/RecipeSearch";

function App() {
    const [recipes, setRecipes] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [error, setError] = useState(null);
    const [currentView, setCurrentView] = useState('welcome');
    const [isAnimating, setIsAnimating] = useState(false);
    const [user, setUser] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchFilters, setSearchFilters] = useState({
        searchTerm: '',
        category: 'all',
        difficulty: 'all',
        time: 'all'
    });
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        if (currentView === 'main') {
            fetchData();
        }
    }, [currentView]);

    const fetchData = async () => {
        try {
            const data = await getRecipes();
            setRecipes(data || []);
        } catch (error) {
            setError("Failed to fetch recipes. Please try again later.");
            console.error("Error:", error);
        }
    };

    const handleGetStarted = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentView('auth');
        }, 500);
    };

    const handleLogin = (userData) => {
        setUser(userData);
        setCurrentView('main');
    };

    const handleRecipeAdded = (newRecipe) => {
        setRecipes([...recipes, newRecipe]);
        setIsFormOpen(false);
    };

    const handleRecipeDeleted = (id) => {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
    };

    const handleLogout = () => {
        setUser(null);
        setCurrentView('auth');
    };

    const handleSearch = (filters) => {
        setSearchFilters(filters);
        const filtered = recipes.filter(recipe => {
            const matchesSearch = recipe.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                                recipe.ingredients.toLowerCase().includes(filters.searchTerm.toLowerCase());
            const matchesCategory = filters.category === 'all' || recipe.category === filters.category;
            const matchesDifficulty = filters.difficulty === 'all' || recipe.difficulty === filters.difficulty;
            const matchesTime = filters.time === 'all' || recipe.cookingTime <= parseInt(filters.time);
            
            return matchesSearch && matchesCategory && matchesDifficulty && matchesTime;
        });
        setFilteredRecipes(filtered);
    };

    const handleUpdateProfile = async (updatedData) => {
        try {
            let response;
            if (updatedData.avatar) {
                // If updating avatar
                response = await fetch('http://localhost:5000/api/profile/avatar/icon', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ icon: updatedData.avatar })
                });
            } else {
                // If updating other profile data
                response = await fetch('http://localhost:5000/api/profile/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(updatedData)
                });
            }

            const data = await response.json();
            if (response.ok) {
                setUser(prev => ({ ...prev, ...updatedData }));
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
                {currentView === 'welcome' && (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: isAnimating ? '-100%' : 0 }}
                        exit={{ opacity: 0, x: '-100%' }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{
                            position: 'fixed',
                            width: '100%',
                            height: '100vh',
                            top: 0,
                            left: 0
                        }}
                    >
                        <Welcome onGetStarted={handleGetStarted} />
                    </motion.div>
                )}

                {currentView === 'auth' && (
                    <motion.div
                        key="auth"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '-100%' }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{
                            position: 'fixed',
                            width: '100%',
                            height: '100vh',
                            top: 0,
                            left: 0
                        }}
                    >
                        <Auth onLogin={handleLogin} isDarkMode={isDarkMode} />
                    </motion.div>
                )}

                {currentView === 'main' && (
                    <motion.div
                        key="main"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
                    >
                        <Header 
                            user={user}
                            onLogout={handleLogout}
                            isDarkMode={isDarkMode}
                            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                            onUpdateProfile={handleUpdateProfile}
                        />
                        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                            <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                                    <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                        Recipe Builder
                                    </h1>
                                </div>
                            </nav>

                            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Left sidebar - Recipe List */}
                                    <div className="lg:col-span-1">
                                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
                                            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                Your Recipes
                                            </h2>
                                            {recipes.length === 0 ? (
                                                <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    No Recipes Added Yet
                                                </p>
                                            ) : (
                                                <ul className="space-y-3">
                                                    {recipes.map((recipe) => (
                                                        <motion.li
                                                            key={recipe.id}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            className={`flex justify-between items-center p-3 ${
                                                                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                                            } rounded-md`}
                                                        >
                                                            <span className={isDarkMode ? 'text-white' : ''}>
                                                                {recipe.name}
                                                            </span>
                                                            <button
                                                                onClick={() => handleRecipeDeleted(recipe.id)}
                                                                className="text-red-600 hover:text-red-800"
                                                            >
                                                                Delete
                                                            </button>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>

                                    {/* Main content area */}
                                    <div className="lg:col-span-2 space-y-8">
                                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
                                            <RecipeSearch onSearch={handleSearch} isDarkMode={isDarkMode} />
                                        </div>
                                        
                                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
                                            <GenerateRecipeForm onRecipeGenerated={handleRecipeAdded} isDarkMode={isDarkMode} />
                                        </div>
                                        
                                        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
                                            <RecipeSuggestions isDarkMode={isDarkMode} />
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
