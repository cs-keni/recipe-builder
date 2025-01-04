from flask import Blueprint, jsonify, request
from models.recipe import Recipe
from database import db
from utils.ai import generate_recipe
from flask_cors import cross_origin

ai_bp = Blueprint("ai", __name__)

recipes = Blueprint("recipes", __name__)

@recipes.route("/api/recipes", methods=["GET"])
def get_recipes():
    return jsonify([recipe.to_dict() for recipe in Recipe.query.all()])

@recipes.route("/api/recipes", methods=["POST"])
def add_recipe():
    data = request.json
    recipe = Recipe(
        name=data["name"],
        ingredients=data["ingredients"],
        instructions=data["instructions"],
        category=data.get("category", "main"),
        difficulty=data.get("difficulty", "medium"),
        cooking_time=data.get("cookingTime", 30)
    )
    db.session.add(recipe)
    db.session.commit()
    return jsonify(recipe.to_dict())

@recipes.route("/api/recipes/<int:id>", methods=["DELETE"])
def delete_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    db.session.delete(recipe)
    db.session.commit()
    return "", 204

@ai_bp.route("/generate-recipe", methods=["POST", "OPTIONS"])
@cross_origin()
def generate():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
        
    try:
        data = request.get_json()
        ingredients = data.get("ingredients", "")
        if not ingredients:
            return jsonify({"error": "No ingredients provided"}), 400
            
        recipe_data = generate_recipe(ingredients)
        if recipe_data is None:
            return jsonify({"error": "No recipes found with those ingredients"}), 404
            
        # Create a new recipe in the database
        recipe = Recipe(**recipe_data)
        db.session.add(recipe)
        db.session.commit()
        
        return jsonify({"recipe": recipe.to_dict()})
    except Exception as e:
        print(f"Error generating recipe: {str(e)}")
        return jsonify({"error": str(e)}), 500
