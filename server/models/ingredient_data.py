from database import db

class IngredientData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ingredient_name = db.Column(db.String(100), nullable=False)
    frequency = db.Column(db.Integer, default=0)
    avg_rating = db.Column(db.Float, default=0.0)
    common_pairs = db.Column(db.Text, default='')  # Store as JSON string
    categories = db.Column(db.Text, default='')    # Store as JSON string
    
    def update_stats(self, rating, paired_ingredients, category):
        self.frequency += 1
        self.avg_rating = ((self.avg_rating * (self.frequency - 1)) + rating) / self.frequency
        # Update common pairs and categories... 