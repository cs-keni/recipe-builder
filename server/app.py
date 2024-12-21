from flask import Flask, jsonify
from flask_cors import CORS
from database import db

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipes.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Import routes after db initialization
from routes.recipes import recipes, ai_bp

app.register_blueprint(recipes)
app.register_blueprint(ai_bp)

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Recipe Builder API!"})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
