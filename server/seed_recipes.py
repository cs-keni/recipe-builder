from app import app, db
from models.recipe import Recipe

recipes_data = [
    {
        "name": "Basic Chocolate Chip Cookies",
        "ingredients": "flour, sugar, butter, eggs, chocolate chips, vanilla extract, baking soda, salt",
        "instructions": "1. Cream butter and sugar\n2. Add eggs and vanilla\n3. Mix in dry ingredients\n4. Add chocolate chips\n5. Bake at 350°F for 10-12 minutes",
        "category": "dessert",
        "difficulty": "easy",
        "cooking_time": 25
    },
    # TODO: Add more recipes here
]

def seed_recipes():
    with app.app_context():
        for recipe_data in recipes_data:
            recipe = Recipe(**recipe_data)
            db.session.add(recipe)
        db.session.commit()

if __name__ == "__main__":
    seed_recipes() 