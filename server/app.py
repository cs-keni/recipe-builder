from flask import Flask
from flask_cors import CORS
from routes.example import example

app = Flask(__name__)
CORS(app)

app.register_blueprint(example)

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Recipe Builder API!"})

@app.route("/recipes")
def get_recipes():
    return jsonify({"recipes": []})

if __name__ == '__main__':
    app.run(debug=True)
