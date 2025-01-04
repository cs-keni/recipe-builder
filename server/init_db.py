from app import app, db
from models.recipe import Recipe

def init_db():
    with app.app_context():
        # Drop all tables
        db.drop_all()
        # Create all tables
        db.create_all()
        print("Database initialized!")

if __name__ == "__main__":
    init_db() 