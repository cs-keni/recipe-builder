from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import os
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
import secrets
import sys
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['PROPAGATE_EXCEPTIONS'] = True
CORS(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = secrets.token_hex(32)  # Generates a secure random key
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
            password TEXT NOT NULL,
            avatar TEXT
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
        
        # Create access token
        access_token = create_access_token(identity=user[0])
        
        return jsonify({
            "user": {
                "id": user[0],
                "name": user[1],
                "email": user[2],
                "avatar": user[4] if len(user) > 4 else None
            },
            "token": access_token
        }), 200
        
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/api/profile/avatar/icon', methods=['PUT', 'OPTIONS'])
@jwt_required()
@cross_origin()
def update_avatar_icon():
    logger.info("=== Starting Avatar Update Request ===")
    
    if request.method == 'OPTIONS':
        logger.info("Handling OPTIONS request")
        return handle_preflight()
    
    try:
        current_user_id = get_jwt_identity()
        logger.info(f"User ID: {current_user_id}")
        
        raw_data = request.get_data().decode('utf-8')
        logger.info(f"Raw request data: {raw_data}")
        
        data = request.get_json(force=True)
        logger.info(f"Parsed JSON data: {data}")
        
        if not data:
            logger.error("No data received")
            return jsonify({'message': 'No data provided'}), 422
            
        icon = data.get('icon')
        if not icon:
            logger.error(f"No icon in data: {data}")
            return jsonify({'message': 'No icon provided'}), 422
            
        logger.info(f"Processing icon URL: {icon}")
        
        conn = sqlite3.connect('users.db')
        c = conn.cursor()
        
        c.execute('UPDATE users SET avatar = ? WHERE id = ?', (icon, current_user_id))
        conn.commit()
        logger.info("Database updated successfully")
        
        c.execute('SELECT * FROM users WHERE id = ?', (current_user_id,))
        user = c.fetchone()
        conn.close()
        
        if not user:
            logger.error(f"User {current_user_id} not found after update")
            return jsonify({'message': 'User not found'}), 404
            
        response_data = {
            'user': {
                'id': user[0],
                'name': user[1],
                'email': user[2],
                'avatar': user[4]
            }
        }
        logger.info(f"Sending response: {response_data}")
        return jsonify(response_data)
        
    except Exception as e:
        logger.error(f"Error in update_avatar_icon: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({'message': 'Server error', 'error': str(e)}), 500

if __name__ == '__main__':
    app.debug = True
    app.logger.setLevel('DEBUG')
    app.run(debug=True)