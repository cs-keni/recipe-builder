from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Recipe Builder API!"})

@app.route("/recipes")
def get_recipes():
    return jsonify({"recipes": []})

if __name__ == '__main__':
    app.run(debug=True)
