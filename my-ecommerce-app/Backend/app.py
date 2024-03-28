from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

users = [    
    {"id": 1, "username": "aiden", "password": "hi"} 
]

@app.route('/login', methods=['POST'])
def authenticateUser():
    data = request.get_json()
    entered_username = data.get("username")
    entered_password = data.get("password")
    
    for user in users:
        if user['username'] == entered_username and user['password'] == entered_password:
            return jsonify({True})
    return False

if __name__ == '__main__':
    app.run(debug=True)