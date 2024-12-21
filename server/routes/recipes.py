from flask import Blueprint, jsonify, request
from models.recipe import Recipe
from database import db
from utils.ai import generate_recipe

ai_bp = Blueprint("ai", __name__)

recipes = Blueprint("recipes", __name__)

@recipes.route("/api/recipes", methods=["GET"])
def get_recipes():
    return jsonify([recipe.to_dict() for recipe in Recipe.query.all()])

@recipes.route("/api/recipes", methods=["POST"])
def add_recipe():
    data = request.json
    recipe = Recipe(name=data["name"], ingredients=data["ingredients"], instructions=data["instructions"])
    db.session.add(recipe)
    db.session.commit()
    return jsonify(recipe.to_dict())

@recipes.route("/api/recipes/<int:id>", methods=["DELETE"])
def delete_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    db.session.delete(recipe)
    db.session.commit()
    return "", 204

@ai_bp.route("/generate-recipe", methods=["POST"])
def generate():
    data = request.json
    ingredients = data.get("ingredients", [])
    recipe = generate_recipe(ingredients)
    return jsonify({"recipe": recipe})
