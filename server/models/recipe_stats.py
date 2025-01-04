from database import db
from datetime import datetime

class RecipeStats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)
    rating = db.Column(db.Float, default=0.0)
    times_generated = db.Column(db.Integer, default=0)
    times_favorited = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Store ingredient combinations that users liked
    ingredient_combinations = db.Column(db.Text, default='')
    
    def to_dict(self):
        return {
            'recipe_id': self.recipe_id,
            'rating': self.rating,
            'times_generated': self.times_generated,
            'times_favorited': self.times_favorited
        } 