import React, { useState } from "react";
import { motion } from "framer-motion";
import { generateRecipe } from "../api";

function GenerateRecipeForm({ onRecipeGenerated, isDarkMode }) {
    const [ingredients, setIngredients] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        try {
            const result = await generateRecipe(ingredients);
            onRecipeGenerated({
                name: "Recipe from Leftovers",
                ingredients: ingredients,
                instructions: result.instructions
            });
        } catch (error) {
            console.error("Error generating recipe:", error);
        }
        setIsGenerating(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}
        >
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Generate Recipe from Leftovers
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        What ingredients do you have?
                    </label>
                    <textarea
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        rows={4}
                        className={`w-full rounded-md ${
                            isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                : 'border-gray-300'
                        }`}
                        placeholder="Enter your ingredients, separated by commas..."
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isGenerating}
                    className={`w-full py-2 px-4 rounded-md text-white transition-colors ${
                        isDarkMode
                            ? 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600'
                            : 'bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300'
                    }`}
                >
                    {isGenerating ? "Generating Recipe..." : "Generate Recipe"}
                </button>
            </form>
        </motion.div>
    );
}

export default GenerateRecipeForm; 