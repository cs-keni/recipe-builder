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