import React, { useState } from "react";
import { addRecipe, generateRecipe } from "../api";

function RecipeForm({ onRecipeAdded, onCancel }) {
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
                <label className="block text-sm font-medium text-gray-700">Recipe Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Instructions</label>
                <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={6}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="main">Main Dish</option>
                        <option value="dessert">Dessert</option>
                        <option value="vegetarian">Vegetarian</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Cooking Time (minutes)</label>
                    <input
                        type="number"
                        value={cookingTime}
                        onChange={(e) => setCookingTime(parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        min="1"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-300"
                >
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    Save Recipe
                </button>
            </div>
        </form>
    );
}

export default RecipeForm;
