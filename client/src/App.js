import './App.css';
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { getRecipes } from "./api";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import Welcome from "./components/Welcome";
import GenerateRecipeForm from "./components/GenerateRecipeForm";
import RecipeSuggestions from "./components/RecipeSuggestions";

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
        }, 500);
    };

    const handleRecipeAdded = (newRecipe) => {
        setRecipes([...recipes, newRecipe]);
        setIsFormOpen(false);
    };

    const handleRecipeDeleted = (id) => {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
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

                {currentView === 'main' && (
                    <motion.div
                        key="main"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <div className="min-h-screen bg-gray-100">
                            <nav className="bg-white shadow-lg">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                                    <h1 className="text-3xl font-bold text-gray-800">Recipe Builder</h1>
                                </div>
                            </nav>

                            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Left sidebar - Recipe List */}
                                    <div className="lg:col-span-1">
                                        <div className="bg-white rounded-lg shadow-lg p-6">
                                            <h2 className="text-xl font-semibold mb-4">Your Recipes</h2>
                                            {recipes.length === 0 ? (
                                                <p className="text-gray-500 text-center">No Recipes Added Yet</p>
                                            ) : (
                                                <ul className="space-y-3">
                                                    {recipes.map((recipe) => (
                                                        <motion.li
                                                            key={recipe.id}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                                                        >
                                                            <span>{recipe.name}</span>
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

                                    {/* Main content - Generate Recipe Form and Suggestions */}
                                    <div className="lg:col-span-2 space-y-8">
                                        <GenerateRecipeForm onRecipeGenerated={handleRecipeAdded} />
                                        
                                        <RecipeSuggestions />
                                        
                                        <div className="mt-8">
                                            <button
                                                onClick={() => setIsFormOpen(true)}
                                                className="w-full bg-white text-indigo-600 px-4 py-2 rounded-md border-2 border-indigo-600 hover:bg-indigo-50 transition-colors text-center"
                                            >
                                                Already got a recipe you want to add? Click here!
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isFormOpen && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
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
                            </main>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
