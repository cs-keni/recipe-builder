from flask import Blueprint, jsonify

example = Blueprint("example", __name__)

@example.route("/api/data", methods=["GET"])
def get_data():
    return jsonify({"message": "Hello from Flask!"})
