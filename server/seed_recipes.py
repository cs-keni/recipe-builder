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
    {
        "name": "Vegetable Curry",
        "ingredients": "onion, garlic, ginger, curry powder, coconut milk, carrots, potatoes, peas, cauliflower",
        "instructions": "1. Sauté onion, garlic, and ginger\n2. Add curry powder and cook until fragrant\n3. Add vegetables and coconut milk\n4. Simmer until vegetables are tender\n5. Season to taste",
        "category": "main",
        "difficulty": "medium",
        "cooking_time": 45
    },
    {
        "name": "Grilled Salmon",
        "ingredients": "salmon fillet, lemon, olive oil, garlic, dill, salt, pepper",
        "instructions": "1. Mix olive oil, garlic, dill, salt, and pepper\n2. Marinate salmon for 30 minutes\n3. Preheat grill\n4. Grill salmon for 4-5 minutes per side\n5. Serve with lemon wedges",
        "category": "main",
        "difficulty": "medium",
        "cooking_time": 20
    },
    {
        "name": "Mac and Cheese",
        "ingredients": "macaroni, cheddar cheese, milk, butter, flour, breadcrumbs, salt, pepper",
        "instructions": "1. Cook macaroni according to package\n2. Make cheese sauce with butter, flour, milk, and cheese\n3. Combine sauce with macaroni\n4. Top with breadcrumbs\n5. Bake at 350°F for 20 minutes",
        "category": "main",
        "difficulty": "easy",
        "cooking_time": 40
    },
    {
        "name": "Berry Smoothie Bowl",
        "ingredients": "mixed berries, banana, yogurt, honey, granola, chia seeds",
        "instructions": "1. Blend berries, banana, and yogurt until smooth\n2. Pour into bowl\n3. Top with granola and chia seeds\n4. Drizzle with honey",
        "category": "breakfast",
        "difficulty": "easy",
        "cooking_time": 10
    },
    {
        "name": "Simple Pancakes",
        "ingredients": "flour, milk, eggs, sugar, baking powder, salt, butter",
        "instructions": "1. Mix dry ingredients\n2. Whisk wet ingredients separately\n3. Combine wet and dry ingredients\n4. Cook on griddle until bubbles form\n5. Flip and cook other side",
        "category": "breakfast",
        "difficulty": "easy",
        "cooking_time": 20
    },
    {
        "name": "Basic Tomato Pasta",
        "ingredients": "pasta, tomatoes, garlic, olive oil, basil, parmesan cheese, salt, pepper",
        "instructions": "1. Cook pasta according to package\n2. Sauté garlic in olive oil\n3. Add tomatoes and simmer\n4. Toss with pasta\n5. Top with basil and parmesan",
        "category": "main",
        "difficulty": "easy",
        "cooking_time": 25
    },
    {
        "name": "Classic Omelette",
        "ingredients": "eggs, milk, cheese, butter, salt, pepper",
        "instructions": "1. Whisk eggs with milk, salt, and pepper\n2. Melt butter in pan\n3. Pour in egg mixture\n4. Add cheese when nearly set\n5. Fold and serve",
        "category": "breakfast",
        "difficulty": "easy",
        "cooking_time": 15
    },
    {
        "name": "Classic Spaghetti Carbonara",
        "ingredients": "spaghetti, eggs, pecorino cheese, guanciale or bacon, black pepper, salt",
        "instructions": "1. Cook pasta until al dente\n2. Fry guanciale until crispy\n3. Mix eggs, cheese, and pepper\n4. Combine hot pasta with egg mixture\n5. Add crispy guanciale\n6. Serve with extra cheese and pepper",
        "category": "main",
        "difficulty": "medium",
        "cooking_time": 30
    },
    {
        "name": "Chicken Stir Fry",
        "ingredients": "chicken breast, soy sauce, garlic, ginger, broccoli, carrots, bell peppers, vegetable oil, cornstarch",
        "instructions": "1. Cut chicken into bite-sized pieces\n2. Mix soy sauce, garlic, and ginger for sauce\n3. Stir-fry chicken until cooked\n4. Add vegetables and stir-fry\n5. Add sauce and thicken with cornstarch\n6. Serve hot with rice",
        "category": "main",
        "difficulty": "easy",
        "cooking_time": 25
    },
    {
        "name": "Homemade Pizza",
        "ingredients": "flour, yeast, olive oil, salt, tomato sauce, mozzarella cheese, basil, toppings of choice",
        "instructions": "1. Make pizza dough with flour, yeast, oil, salt\n2. Let dough rise for 1 hour\n3. Roll out dough\n4. Add sauce and toppings\n5. Bake at 450°F for 12-15 minutes",
        "category": "main",
        "difficulty": "medium",
        "cooking_time": 90
    },
    {
        "name": "Classic French Toast",
        "ingredients": "bread slices, eggs, milk, vanilla extract, cinnamon, butter, maple syrup",
        "instructions": "1. Whisk eggs, milk, vanilla, and cinnamon\n2. Dip bread slices in mixture\n3. Cook in buttered pan until golden\n4. Serve with maple syrup",
        "category": "breakfast",
        "difficulty": "easy",
        "cooking_time": 20
    },
    {
        "name": "Quick Quesadillas",
        "ingredients": "tortillas, cheese, chicken or beans, bell peppers, onions, salsa, sour cream",
        "instructions": "1. Fill tortilla with cheese and fillings\n2. Cook in pan until cheese melts\n3. Flip and cook other side\n4. Serve with salsa and sour cream",
        "category": "main",
        "difficulty": "easy",
        "cooking_time": 15
    },
    {
        "name": "Simple Green Salad",
        "ingredients": "mixed greens, cucumber, tomatoes, red onion, olive oil, balsamic vinegar, salt, pepper",
        "instructions": "1. Wash and chop vegetables\n2. Mix olive oil and balsamic vinegar\n3. Toss vegetables with dressing\n4. Season with salt and pepper",
        "category": "side",
        "difficulty": "easy",
        "cooking_time": 10
    },
    {
        "name": "Basic Rice Pilaf",
        "ingredients": "rice, onion, garlic, chicken broth, butter, parsley, salt, pepper",
        "instructions": "1. Sauté onion and garlic in butter\n2. Add rice and toast slightly\n3. Add broth and simmer until rice is cooked\n4. Fluff with fork and add parsley",
        "category": "side",
        "difficulty": "easy",
        "cooking_time": 25
    },
    {
        "name": "Quick Banana Bread",
        "ingredients": "ripe bananas, flour, sugar, eggs, butter, baking soda, vanilla extract, salt",
        "instructions": "1. Mash bananas\n2. Cream butter and sugar\n3. Mix in eggs and vanilla\n4. Add dry ingredients\n5. Bake at 350°F for 60 minutes",
        "category": "dessert",
        "difficulty": "easy",
        "cooking_time": 70
    },
    {
        "name": "Beef Tacos",
        "ingredients": "ground beef, taco seasoning, tortillas, lettuce, tomatoes, onion, cheese, sour cream, lime",
        "instructions": "1. Brown beef and add taco seasoning\n2. Warm tortillas\n3. Chop vegetables\n4. Assemble tacos with meat and toppings\n5. Serve with lime wedges",
        "category": "main",
        "difficulty": "easy",
        "cooking_time": 25
    },
    {
        "name": "Greek Salad",
        "ingredients": "cucumber, tomatoes, red onion, olives, feta cheese, olive oil, oregano, salt, pepper, lettuce",
        "instructions": "1. Chop vegetables into chunks\n2. Mix vegetables in bowl\n3. Add crumbled feta and olives\n4. Dress with olive oil and oregano\n5. Season with salt and pepper",
        "category": "side",
        "difficulty": "easy",
        "cooking_time": 15
    },
    {
        "name": "Peanut Butter Sandwich",
        "ingredients": "bread, peanut butter, jelly, banana, honey",
        "instructions": "1. Toast bread if desired\n2. Spread peanut butter on one slice\n3. Add sliced bananas or jelly\n4. Drizzle with honey\n5. Close sandwich and cut diagonally",
        "category": "snack",
        "difficulty": "easy",
        "cooking_time": 5
    },
    {
        "name": "Microwave Baked Potato",
        "ingredients": "potato, butter, cheese, salt, pepper, sour cream, chives",
        "instructions": "1. Wash and pierce potato\n2. Microwave for 5 minutes\n3. Turn and microwave 3-5 more minutes\n4. Cut open and fluff\n5. Add toppings",
        "category": "side",
        "difficulty": "easy",
        "cooking_time": 10
    },
    {
        "name": "Tuna Salad",
        "ingredients": "canned tuna, mayonnaise, celery, onion, pickle relish, lemon juice, salt, pepper",
        "instructions": "1. Drain tuna\n2. Chop celery and onion\n3. Mix all ingredients\n4. Season to taste\n5. Chill before serving",
        "category": "main",
        "difficulty": "easy",
        "cooking_time": 10
    },
    {
        "name": "Instant Ramen Upgrade",
        "ingredients": "instant ramen, egg, green onions, sesame oil, soy sauce, corn, seaweed",
        "instructions": "1. Cook ramen according to package\n2. Add egg to hot broth\n3. Top with corn and green onions\n4. Add drops of sesame oil\n5. Garnish with seaweed",
        "category": "main",
        "difficulty": "easy",
        "cooking_time": 10
    },
    {
        "name": "Fruit and Yogurt Parfait",
        "ingredients": "yogurt, granola, honey, strawberries, blueberries, banana, mint",
        "instructions": "1. Layer yogurt in glass\n2. Add fruit layer\n3. Add granola layer\n4. Repeat layers\n5. Top with honey and mint",
        "category": "breakfast",
        "difficulty": "easy",
        "cooking_time": 10
    },
    {
        "name": "Garlic Bread",
        "ingredients": "bread, butter, garlic, parsley, parmesan cheese, olive oil",
        "instructions": "1. Mix softened butter with garlic\n2. Spread on bread\n3. Sprinkle with cheese and parsley\n4. Drizzle with olive oil\n5. Bake until golden",
        "category": "side",
        "difficulty": "easy",
        "cooking_time": 15
    }
]

def seed_recipes():
    with app.app_context():
        # Clear existing recipes
        Recipe.query.delete()
        
        # Add new recipes
        for recipe_data in recipes_data:
            recipe = Recipe(**recipe_data, is_seeded=True)
            db.session.add(recipe)
        db.session.commit()
        print(f"Added {len(recipes_data)} recipes to database!")

if __name__ == "__main__":
    seed_recipes() 