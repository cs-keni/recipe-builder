import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RecipeModal = ({ isOpen, onClose, recipe }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                    onClick={e => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">{recipe.name}</h2>
                    
                    <div className="mb-4">
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                            {recipe.category}
                        </span>
                        <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                            {recipe.difficulty}
                        </span>
                        <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            {recipe.cookingTime} mins
                        </span>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2 dark:text-white">Ingredients:</h3>
                        <ul className="list-disc pl-5 dark:text-gray-300">
                            {recipe.ingredients.split(',').map((ingredient, index) => (
                                <li key={index}>{ingredient.trim()}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2 dark:text-white">Instructions:</h3>
                        <ol className="list-decimal pl-5 dark:text-gray-300">
                            {recipe.instructions.split('\n').map((instruction, index) => (
                                <li key={index}>{instruction.replace(/^\d+\.\s*/, '')}</li>
                            ))}
                        </ol>
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Close
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default RecipeModal; 