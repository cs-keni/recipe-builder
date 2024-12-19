from flask import jsonify

def generate_recipe(ingredients):
    instructions =f"Combine {ingredients} and cook!"
    return jsonify({"instructions": instructions})
