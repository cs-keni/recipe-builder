import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { deleteRecipe, rateRecipe } from "../api";
import Rating from './Rating';

function RecipeList({ recipes, onRecipeDeleted, isDarkMode }) {
    const handleDelete = async (id) => {
        try {
            const response = await deleteRecipe(id);
            if (response.status === 204) {  // Successful deletion
                onRecipeDeleted(id);
            } else {
                console.error("Failed to delete recipe");
            }
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };

    const handleRate = async (recipeId, rating) => {
        try {
            await rateRecipe(recipeId, rating);
        } catch (error) {
            console.error("Error rating recipe:", error);
        }
    };

    if (recipes.length === 0) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
            >
                <p className="text-gray-500">No recipes yet. Add your first recipe!</p>
            </motion.div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
                {recipes.map((recipe) => (
                    <motion.div
                        key={recipe.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">{recipe.name}</h3>
                            
                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-600 mb-2">Ingredients:</h4>
                                <p className="text-gray-700 whitespace-pre-line">{recipe.ingredients}</p>
                            </div>
                            
                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-600 mb-2">Instructions:</h4>
                                <p className="text-gray-700 whitespace-pre-line">{recipe.instructions}</p>
                            </div>

                            <div className="flex justify-end">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleDelete(recipe.id)}
                                    className="text-red-600 hover:text-red-800 transition-colors"
                                >
                                    Delete Recipe
                                </motion.button>
                            </div>

                            <div className="mt-4 border-t pt-4">
                                <p className="text-sm text-gray-600 mb-2">Rate this recipe:</p>
                                <Rating 
                                    recipeId={recipe.id}
                                    onRate={handleRate}
                                    isDarkMode={isDarkMode}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

export default RecipeList;
