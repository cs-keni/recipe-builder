import './App.css';
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { getRecipes } from "./api";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import Welcome from "./components/Welcome";

function App() {
    const [recipes, setRecipes] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [error, setError] = useState(null);
    const [currentView, setCurrentView] = useState('welcome');
    const [isAnimating, setIsAnimating] = useState(false);

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
            setCurrentView('main');
        }, 500); // Match this with animation duration
    };

    const handleRecipeAdded = (newRecipe) => {
        setRecipes([...recipes, newRecipe]);
        setIsFormOpen(false);
    };

    const handleRecipeDeleted = (id) => {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
    };

    return (
        <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
                {currentView === 'welcome' ? (
                    <motion.div
                        key="welcome"
                        initial={{ x: 0 }}
                        animate={{ x: isAnimating ? '-100%' : 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <Welcome onGetStarted={handleGetStarted} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="main"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <div className="min-h-screen bg-gray-100">
                            <nav className="bg-white shadow-lg">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                                    <h1 className="text-3xl font-bold text-gray-800">Recipe Builder</h1>
                                </div>
                            </nav>

                            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                <div className="mb-8">
                                    <button
                                        onClick={() => setIsFormOpen(true)}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                                    >
                                        Add New Recipe
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {isFormOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -50 }}
                                            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
                                        >
                                            <motion.div
                                                initial={{ scale: 0.9 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0.9 }}
                                                className="bg-white rounded-lg p-8 max-w-2xl w-full"
                                            >
                                                <RecipeForm onRecipeAdded={handleRecipeAdded} onCancel={() => setIsFormOpen(false)} />
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <RecipeList recipes={recipes} onRecipeDeleted={handleRecipeDeleted} />
                            </main>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
