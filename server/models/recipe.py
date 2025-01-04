from database import db

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), default='main')
    difficulty = db.Column(db.String(50), default='medium')
    cooking_time = db.Column(db.Integer, default=30)
    is_seeded = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ingredients': self.ingredients,
            'instructions': self.instructions,
            'category': self.category,
            'difficulty': self.difficulty,
            'cooking_time': self.cooking_time,
            'is_seeded': self.is_seeded
        }
