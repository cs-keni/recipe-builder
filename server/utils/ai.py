from flask import jsonify
import openai
import os
from dotenv import load_dotenv
from pathlib import Path

# Get the directory containing this file
current_dir = Path(__file__).parent.parent
env_path = current_dir / '.env'

print(f"Current directory: {current_dir}")
print(f"Looking for .env file at: {env_path}")
print(f"Does .env file exist? {env_path.exists()}")

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

def generate_recipe(ingredients):
    # Set the API key for the OpenAI client
    openai.api_key = os.getenv("OPENAI_API_KEY")
    
    if not openai.api_key:
        raise ValueError("OpenAI API key not configured")
        
    print(f"Generating recipe for ingredients: {ingredients}")
    prompt = f"Create a recipe using these ingredients: {ingredients}."
    
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful chef that creates recipes."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error calling OpenAI API: {str(e)}")
        raise

""" for spoonacular
SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")

def fetch_recipes(ingredients):
    url = f"https://api.spoonacular.com/recipes/findByIngredients?ingredients={','.join(ingredients)}&apiKey={SPOONACULAR_API_KEY}"
    response = requests.get(url)
    return response.json()
"""
