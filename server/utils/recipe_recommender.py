import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

class RecipeRecommender:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            analyzer='word',
            ngram_range=(1, 2),  # Consider both single ingredients and pairs
            stop_words='english'
        )
        
    def preprocess_data(self):
        # Get all recipes and their stats
        recipes = Recipe.query.all()
        ingredient_data = IngredientData.query.all()
        
        # Create feature matrix
        ingredients_matrix = self.vectorizer.fit_transform(
            [r.ingredients.lower() for r in recipes]
        )
        
        # Create additional features
        ratings = np.array([r.stats.rating if r.stats else 0 for r in recipes])
        categories = self._encode_categories([r.category for r in recipes])
        
        return {
            'ingredients_matrix': ingredients_matrix,
            'ratings': ratings,
            'categories': categories,
            'ingredient_data': {i.ingredient_name: i for i in ingredient_data}
        } 

    def calculate_similarity(self, user_ingredients, preprocessed_data):
        # Convert user ingredients to vector
        user_vector = self.vectorizer.transform([user_ingredients.lower()])
        
        # Calculate content similarity
        content_sim = cosine_similarity(user_vector, preprocessed_data['ingredients_matrix'])[0]
        
        # Calculate ingredient compatibility
        compatibility = self._calculate_ingredient_compatibility(
            user_ingredients,
            preprocessed_data['ingredient_data']
        )
        
        # Combine scores
        final_scores = (
            0.6 * content_sim +           # Content similarity
            0.2 * compatibility +         # Ingredient compatibility
            0.2 * preprocessed_data['ratings']  # Recipe ratings
        )
        
        return final_scores 