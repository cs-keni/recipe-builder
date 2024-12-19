import React, { useState } from "react";
import { addRecipe, generateRecipe } from "../api";

function RecipeForm({ onRecipeAdded }) {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");

    const handleSubmit = async (e) => {
	e.preventDefault();
	const newRecipe = { name, ingredients, instructions };
	const addedRecipe = await addRecipe(newRecipe);
	onRecipeAdded(addedRecipe);
    };

    const handleGenerate = async () => {
	const result = await generateRecipe(ingredients);
	setInstructions(result.instructions || "AI couldn't generate a recipe.")
    };

    return (
	<form onSubmit={handleSubmit} className="recipe-form">
	  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
	  <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients" required />
	  <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions" required />
	  <button type="button" onClick={handleGenerate}>Generate</button>
	  <button type="submit">Add Recipe</button>
	</form>
    );
}

export default RecipeForm;
