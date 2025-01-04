import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RecipeModal = ({ isOpen, onClose, recipe, isDarkMode }) => {
    // Lock scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: { 
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        visible: { 
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 300
            }
        },
        exit: {
            opacity: 0,
            y: 50,
            scale: 0.95,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    style={{ 
                        position: 'fixed',
                        top: `${window.scrollY}px`,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto`}
                        style={{
                            marginTop: '-10vh' // Adjust this value to move modal higher
                        }}
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {recipe.name}
                        </h2>
                        
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
                            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                Ingredients:
                            </h3>
                            <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {recipe.ingredients.split(',').map((ingredient, index) => (
                                    <li key={index}>{ingredient.trim()}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                Instructions:
                            </h3>
                            <ol className={`list-decimal pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
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
            )}
        </AnimatePresence>
    );
};

export default RecipeModal; 