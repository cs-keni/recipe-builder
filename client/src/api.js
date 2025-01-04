const API_BASE = "http://127.0.0.1:5000";

export const fetchData = async() => {
    try {
        const response = await fetch(`${API_BASE}/api/data`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const getRecipes = async () => {
    try {
        const response = await fetch(`${API_BASE}/api/recipes`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
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
    const response = await fetch(`${API_BASE}/generate-recipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const rateRecipe = async (id, rating) => {
    const response = await fetch(`${API_BASE}/api/recipes/${id}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
    });
    return response.json();
};
