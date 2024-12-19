import React from "react";
import { deleteRecipe } from "../api";

function RecipeList({ recipes, onRecipeDeleted }) {
    const handleDelete = async (id) => {
	await deleteRecipe(id);
	onRecipeDeleted(id);
    };

    return {
	<ul className="recipe-list">
	  {recipes.map((recipe) => (
	      <li key={recipe.id}>
	        <h3>{recipe.name}</h3>
	        <button onClick={() => handleDelete(recipe.id)}>Delete</button>
	      </li>
	  ))}
	</ul>
    };
}

export default RecipeList;
