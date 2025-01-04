from flask import jsonify
import os
from dotenv import load_dotenv
from pathlib import Path
import requests
import openai  # Keep this import for future use
from models.recipe import Recipe
from database import db

"""NO API BECAUSE OPENAI "FREE TIER" ISN'T FREE AND SPOONACULAR GIVES ONE REQUEST FREE

so i'm making my own recipe database.
all comments below are the previous implementations if i ever decide to subscribe for higher tier
"""

def generate_recipe(ingredients):
    print(f"Finding recipe for ingredients: {ingredients}")

    # Convert input ingredients to a list
    ingredient_list = [i.strip().lower() for i in ingredients.split(',')]

    # Query all recipes from database
    all_recipes = Recipe.query.all()
    
    if not all_recipes:
        raise ValueError("No recipes in database")

    # Scoring system for each recipe based on matching ingredients
    scored_recipes = []
    for recipe in all_recipes:
        recipe_ingredients = [i.strip().lower() for i in recipe.ingredients.split(',')]
        matching_ingredients = len(set(ingredient_list) & set(recipe_ingredients))
        scored_recipes.append((recipe, matching_ingredients))
    
    # Sort by number of matching ingredients
    scored_recipes.sort(key=lambda x: x[1], reverse=True)
    
    # Get the best matching recipe
    best_recipe = scored_recipes[0][0]  # Safe now because we checked all_recipes
    matching_count = scored_recipes[0][1]
    
    return {
        'name': f"Recipe using {ingredients} ({matching_count} matching ingredients)",
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
