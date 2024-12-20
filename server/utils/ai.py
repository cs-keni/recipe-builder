from flask import jsonify
import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_recipe(ingredients):
    prompt = f"Create a recipe using these ingredients: {ingredients}."
    response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=150
            )
    return response['choices'][0]['text']

""" for spoonacular
SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")

def fetch_recipes(ingredients):
    url = f"https://api.spoonacular.com/recipes/findByIngredients?ingredients={','.join(ingredients)}&apiKey={SPOONACULAR_API_KEY}"
    response = requests.get(url)
    return response.json()
"""
