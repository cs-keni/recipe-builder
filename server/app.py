from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import os
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this to a secure secret key
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_HEADER_NAME'] = 'Authorization'
app.config['JWT_HEADER_TYPE'] = 'Bearer'

jwt = JWTManager(app)

# Initialize SQLite database
def init_db():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

def handle_preflight():
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Methods', 'PUT, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response

@app.route('/api/register', methods=['POST'])
def register():
    print("Received registration request")
    data = request.get_json()
    print("Request data:", data)
    
    if not all(k in data for k in ["name", "email", "password"]):
        print("Missing required fields")
        return jsonify({"message": "Missing required fields"}), 400
    
    try:
        conn = sqlite3.connect('users.db')
        c = conn.cursor()
        
        # Check if email already exists
        c.execute('SELECT * FROM users WHERE email = ?', (data['email'],))
        if c.fetchone() is not None:
            print("Email already registered")
            return jsonify({"message": "Email already registered"}), 400
        
        # Hash password and store user
        hashed_password = generate_password_hash(data['password'])
        c.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                 (data['name'], data['email'], hashed_password))
        conn.commit()
        
        # Get the created user
        c.execute('SELECT id, name, email FROM users WHERE email = ?', (data['email'],))
        user = c.fetchone()
        conn.close()
        
        print("User registered successfully:", user)
        return jsonify({
            "user": {
                "id": user[0],
                "name": user[1],
                "email": user[2]
            }
        }), 201
        
    except Exception as e:
        print("Error during registration:", str(e))
        return jsonify({"message": str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not all(k in data for k in ["email", "password"]):
        return jsonify({"message": "Missing required fields"}), 400
    
    try:
        conn = sqlite3.connect('users.db')
        c = conn.cursor()
        
        c.execute('SELECT * FROM users WHERE email = ?', (data['email'],))
        user = c.fetchone()
        conn.close()
        
        if user is None:
            return jsonify({"message": "User not found"}), 404
            
        if not check_password_hash(user[3], data['password']):
            return jsonify({"message": "Invalid password"}), 401
        
        return jsonify({
            "user": {
                "id": user[0],
                "name": user[1],
                "email": user[2]
            }
        }), 200
        
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/api/profile/avatar/icon', methods=['PUT', 'OPTIONS'])
@jwt_required()
@cross_origin()
def update_avatar_icon():
    if request.method == 'OPTIONS':
        return handle_preflight()
        
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        icon = data.get('icon')
        
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404
            
        user.avatar = icon
        db.session.commit()
        
        return jsonify({'avatar': user.avatar})
    except Exception as e:
        return jsonify({'message': 'Server error', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
