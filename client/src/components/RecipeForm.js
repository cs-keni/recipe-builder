import React, { useState } from "react";
import { addRecipe, generateRecipe } from "../api";

function RecipeForm({ onRecipeAdded, onCancel, isDarkMode }) {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [category, setCategory] = useState("main");
    const [difficulty, setDifficulty] = useState("medium");
    const [cookingTime, setCookingTime] = useState(30);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRecipe = { 
            name, 
            ingredients, 
            instructions,
            category,
            difficulty,
            cookingTime
        };
        const addedRecipe = await addRecipe(newRecipe);
        onRecipeAdded(addedRecipe);
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        const result = await generateRecipe(ingredients);
        setInstructions(result.instructions || "AI couldn't generate a recipe.");
        setIsGenerating(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Recipe Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`mt-1 block w-full rounded-md ${
                        isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'border-gray-300'
                    }`}
                    required
                />
            </div>

            <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Ingredients
                </label>
                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    rows={4}
                    className={`mt-1 block w-full rounded-md ${
                        isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'border-gray-300'
                    }`}
                    required
                />
            </div>

            <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Instructions
                </label>
                <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={6}
                    className={`mt-1 block w-full rounded-md ${
                        isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'border-gray-300'
                    }`}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={`mt-1 block w-full rounded-md ${
                            isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'border-gray-300'
                        }`}
                    >
                        <option value="main">Main Dish</option>
                        <option value="dessert">Dessert</option>
                        <option value="vegetarian">Vegetarian</option>
                    </select>
                </div>

                <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Difficulty
                    </label>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className={`mt-1 block w-full rounded-md ${
                            isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'border-gray-300'
                        }`}
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Cooking Time (minutes)
                    </label>
                    <input
                        type="number"
                        value={cookingTime}
                        onChange={(e) => setCookingTime(parseInt(e.target.value))}
                        className={`mt-1 block w-full rounded-md ${
                            isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'border-gray-300'
                        }`}
                        min="1"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={`px-4 py-2 rounded-md text-white transition-colors ${
                        isDarkMode
                            ? 'bg-green-600 hover:bg-green-700 disabled:bg-gray-600'
                            : 'bg-green-500 hover:bg-green-600 disabled:bg-green-300'
                    }`}
                >
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className={`px-4 py-2 rounded-md transition-colors ${
                        isDarkMode
                            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={`px-4 py-2 rounded-md text-white transition-colors ${
                        isDarkMode
                            ? 'bg-indigo-600 hover:bg-indigo-700'
                            : 'bg-indigo-500 hover:bg-indigo-600'
                    }`}
                >
                    Save Recipe
                </button>
            </div>
        </form>
    );
}

export default RecipeForm;
