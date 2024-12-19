const API_BASE = "http://127.0.0.1:5000";

export const fetchData = async() => {
    try {
	const response = await fetch("http://127.0.0.1:5000/api/data");
	const data = await response.json();
	return data;
    } catch (error) {
	console.error("Error fetching data:", error);
	return null;
    }
};

export const getRecipes = async () => {
    const response = await fetch(`${API_BASE}/api/recipes`);
    return response.json();
};

export const addRecipe = async (recipe) => {
    const response = await fetch(`${API_BASE}/api/recipes`, {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(recipe),
    });
    return response.json();
};

export const deleteRecipe = async (id) => {
    await fetch(`${API_BASE}/api/recipes/${id}`, {
	method: "DELETE",
    });
};

export const generateRecipe = async (ingredients) => {
    const response = await fetch(`${API_BASE}/api/ai/recipe`, {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({ ingredients }),
    });
    return response.json();
};
