from app import app, db
from models.recipe import Recipe
import sqlite3
from sqlalchemy import text

def add_is_seeded_column():
    with app.app_context():
        try:
            # Add the new column using the correct SQLAlchemy syntax
            with db.engine.connect() as conn:
                conn.execute(text('ALTER TABLE recipe ADD COLUMN is_seeded BOOLEAN DEFAULT FALSE'))
                conn.commit()
            print("Successfully added is_seeded column")
            
            # Update existing recipes to be seeded
            db.session.query(Recipe).update({Recipe.is_seeded: True})
            db.session.commit()
            print("Updated existing recipes as seeded")
            
        except sqlite3.OperationalError as e:
            if "duplicate column name" in str(e):
                print("Column already exists, skipping...")
            else:
                raise e

if __name__ == "__main__":
    add_is_seeded_column() 