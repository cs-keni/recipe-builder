import React from "react";
import { deleteRecipe } from "../api";

function RecipeList({ recipes, onRecipeDeleted }) {
    const handleDelete = async (id) => {
        await deleteRecipe(id);
        onRecipeDeleted(id);
    };

    if (recipes.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No recipes yet. Add your first recipe!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
                <div
                    key={recipe.id}
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
                            <button
                                onClick={() => handleDelete(recipe.id)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                            >
                                Delete Recipe
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RecipeList;
