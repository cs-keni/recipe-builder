import './App.css';
import React, { useEffect, useState } from "react";
import { fetchData } from "./api";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import { getRecipes } from "./api";

function App() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
	const fetchData = async () => {
	    const data = await getRecipes();
	    setRecipes(data);
	};
	fetchData();
    }, []);

    const handleRecipeAdded = (newRecipe) => {
	setRecipes([...recipes, newRecipe]);
    };

    const handleRecipeDeleted = (id) => {
	setRecipes(recipes.filter((recipe) => recipe.id !== id));

    return (
	<div>
	  <h1>Recipe Builder</h1>
	  <RecipeForm onRecipeAdded={handleRecipeAdded} />
	  <RecipeList recipes={recipes} onRecipeDeleted={handleRecipeDeleted} />
	</div>
    );
}

export default App;
