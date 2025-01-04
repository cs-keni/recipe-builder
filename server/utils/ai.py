from flask import jsonify
import os
from dotenv import load_dotenv
from pathlib import Path
import requests
import openai  # Keep this import for future use
from models.recipe import Recipe
from database import db
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

"""NO API BECAUSE OPENAI "FREE TIER" ISN'T FREE AND SPOONACULAR GIVES ONE REQUEST FREE

so i'm making my own recipe database.
all comments below are the previous implementations if i ever decide to subscribe for higher tier
"""

"""WE ARE USING THIS FOR NOW, AI TRAINING IS AT BOTTOM
need to implement machine learning model (use collaborative filtering, content-based filtering, and neural networks)
TODO: collect more recipe data for training
TODO: periodically retrain model"""
def generate_recipe(ingredients):
    print(f"Finding recipe for ingredients: {ingredients}")
    
    ingredient_list = [i.strip().lower() for i in ingredients.split(',')]
    all_recipes = Recipe.query.all()
    
    if not all_recipes:
        raise ValueError("No recipes in database")
    
    # Get recipe stats
    recipe_stats = {stat.recipe_id: stat for stat in RecipeStats.query.all()}
    
    # Enhanced scoring system
    scored_recipes = []
    for recipe in all_recipes:
        recipe_ingredients = [i.strip().lower() for i in recipe.ingredients.split(',')]
        matching_ingredients = len(set(ingredient_list) & set(recipe_ingredients))
        
        # Calculate score based on matches and popularity
        base_score = matching_ingredients
        stats = recipe_stats.get(recipe.id)
        if stats:
            popularity_boost = (stats.rating * 0.3) + (stats.times_generated * 0.1)
            final_score = base_score + popularity_boost
        else:
            final_score = base_score
            
        scored_recipes.append((recipe, final_score))
    
    # Sort by score
    scored_recipes.sort(key=lambda x: x[1], reverse=True)
    best_recipe = scored_recipes[0][0]
    
    # Update statistics
    stats = recipe_stats.get(best_recipe.id)
    if not stats:
        stats = RecipeStats(recipe_id=best_recipe.id)
        db.session.add(stats)
    stats.times_generated += 1
    db.session.commit()
    
    return {
        'name': f"Recipe with {ingredients}",
        'ingredients': best_recipe.ingredients,
        'instructions': best_recipe.instructions,
        'category': best_recipe.category,
        'difficulty': best_recipe.difficulty,
        'cooking_time': best_recipe.cooking_time
    }

"""
# Get the directory containing this file
current_dir = Path(__file__).parent.parent
env_path = current_dir / '.env'

print(f"Current directory: {current_dir}")
print(f"Looking for .env file at: {env_path}")
print(f"Does .env file exist? {env_path.exists()}")
"""
"""
# Try to read the .env file contents directly
try:
    with open(env_path, 'r') as f:
        env_contents = f.read()
        print("First few characters of .env file:", env_contents[:20])
except Exception as e:
    print(f"Error reading .env file: {e}")

# Load environment variables from .env file
load_dotenv(dotenv_path=env_path)

# Print all environment variables (excluding the actual API key)
print("All environment variables:", [k for k in os.environ.keys()])

# Print environment variable (don't print the full key!)
api_key = os.getenv("OPENAI_API_KEY")
if api_key:
    print("OpenAI API key found with length:", len(api_key))
else:
    print("OpenAI API key not found in environment")
"""
"""
# Load environment variables from .env file
load_dotenv(dotenv_path=env_path)

# Get API keys
SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")
if not SPOONACULAR_API_KEY:
    print("Warning: SPOONACULAR_API_KEY not found in environment")

def generate_recipe(ingredients):
    if not SPOONACULAR_API_KEY:
        raise ValueError("Spoonacular API key not configured")
        
    print(f"Generating recipe for ingredients: {ingredients}")
    
    try:
        # Convert ingredients string to list and join with commas
        ingredients_list = [i.strip() for i in ingredients.split(',')]
        ingredients_param = ','.join(ingredients_list)
        
        # Call Spoonacular API
        url = "https://api.spoonacular.com/recipes/findByIngredients"
        params = {
            "apiKey": SPOONACULAR_API_KEY,
            "ingredients": ingredients_param,
            "number": 1,  # Get just one recipe
            "ranking": 2,  # Maximize used ingredients
            "ignorePantry": True
        }
        
        print("Calling Spoonacular API...")
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        recipes = response.json()
        if not recipes:
            return "No recipes found for these ingredients."
            
        # Get the first recipe's details
        recipe_id = recipes[0]['id']
        recipe_info_url = f"https://api.spoonacular.com/recipes/{recipe_id}/information"
        recipe_response = requests.get(recipe_info_url, params={"apiKey": SPOONACULAR_API_KEY})
        recipe_response.raise_for_status()
        
        recipe_details = recipe_response.json()
        
        # Format the recipe
        recipe_text = (
            f"Recipe: {recipe_details['title']}\n\n"
            f"Ingredients:\n{recipe_details['extendedIngredients']}\n\n"
            f"Instructions:\n{recipe_details['instructions']}"
        )
        
        return recipe_text
        
    except requests.exceptions.RequestException as e:
        if e.response.status_code == 401:
            print("Invalid or expired Spoonacular API key")
            raise ValueError("API key is invalid or expired. Please check your Spoonacular API key.")
        else:
            print(f"Error calling Spoonacular API: {str(e)}")
            raise ValueError(f"Failed to generate recipe: {str(e)}")
"""
"""
def generate_recipe(ingredients):
    # Set the API key for the OpenAI client
    openai.api_key = os.getenv("OPENAI_API_KEY")
    
    if not openai.api_key:
        raise ValueError("OpenAI API key not configured")
        
    print(f"Generating recipe for ingredients: {ingredients}")
    prompt = f"Create a recipe using these ingredients: {ingredients}."
    
    try:
        print("Attempting to call OpenAI API...")
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful chef that creates recipes."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150
        )
        print("OpenAI API call successful")
        return response.choices[0].message.content
    except openai.RateLimitError as e:
        print(f"Rate limit error: {str(e)}")
        raise ValueError("API rate limit exceeded. Please try again later.")
    except openai.InsufficientQuotaError as e:
        print(f"Quota error: {str(e)}")
        raise ValueError("OpenAI API quota exceeded. Please check your billing details.")
    except Exception as e:
        print(f"Unexpected error type: {type(e)}")
        print(f"Error calling OpenAI API: {str(e)}")
        raise ValueError(f"Failed to generate recipe: {str(e)}")
"""

class RecipeRecommender:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.recipe_vectors = None
        self.recipes = []
        self.stats = {}

    def train(self):
        # Get all recipes and their stats
        recipes = Recipe.query.all()
        stats = RecipeStats.query.all()
        
        # Prepare content-based features
        ingredient_texts = [r.ingredients.lower() for r in recipes]
        self.recipe_vectors = self.vectorizer.fit_transform(ingredient_texts)
        
        # Store recipe stats for collaborative filtering
        self.stats = {s.recipe_id: s for s in stats}
        self.recipes = recipes

    def recommend(self, ingredients, top_k=3):
        # Content-based similarity
        input_vector = self.vectorizer.transform([ingredients.lower()])
        content_scores = cosine_similarity(input_vector, self.recipe_vectors)[0]
        
        # Combine with popularity/rating scores
        final_scores = []
        for i, recipe in enumerate(self.recipes):
            content_score = content_scores[i]
            stats = self.stats.get(recipe.id)
            
            if stats:
                popularity_score = (stats.rating * 0.3 + 
                                 (stats.times_generated or 0) * 0.1 + 
                                 (stats.times_rated or 0) * 0.1)
            else:
                popularity_score = 0
                
            final_scores.append(content_score * 0.7 + popularity_score * 0.3)
            
        # Get top recommendations
        top_indices = np.argsort(final_scores)[-top_k:][::-1]
        return [self.recipes[i] for i in top_indices]
