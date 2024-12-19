from server.app import db

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
                "id": self.id,
                "name": self.name,
                "ingredients": self.ingredients,
                "instructions": self.instructions,
                }
