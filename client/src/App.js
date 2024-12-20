import './App.css';
import React, { useEffect, useState } from "react";
import { getRecipes } from "./api";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";

function App() {
    const [recipes, setRecipes] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRecipes();
            setRecipes(data);
        };
        fetchData();
    }, []);

    const handleRecipeAdded = (newRecipe) => {
        setRecipes([...recipes, newRecipe]);
        setIsFormOpen(false);
    };

    const handleRecipeDeleted = (id) => {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
    };

    return (
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

                {isFormOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
                            <RecipeForm onRecipeAdded={handleRecipeAdded} onCancel={() => setIsFormOpen(false)} />
                        </div>
                    </div>
                )}

                <RecipeList recipes={recipes} onRecipeDeleted={handleRecipeDeleted} />
            </main>
        </div>
    );
}

export default App;
