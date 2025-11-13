# app.py  (Flask backend - minimal issuer/admin endpoints)
from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import time

from db import (
    init_db,
    get_db,
    save_schema,
    list_schemas,
    save_credential,
    get_credential,
    revoke_credential,
    list_credentials
)

from keys import load_or_create_keys, sign_json
from vc_utils import make_credential


# ---------------------------
# Initialize Flask App
# ---------------------------
app = Flask(__name__)
CORS(app)

# Initialize local sqlite DB
init_db()

# Load or create issuer keys
ISSUER_KEY = load_or_create_keys("issuer")


# ---------------------------
# Routes
# ---------------------------

# Simple login (DEMO ONLY)
@app.route('/login', methods=['POST'])
def login():
    data = request.json or {}
    username = data.get('username')
    password = data.get('password')
    if username == 'issuer' and password == 'password':
        return jsonify({"status": "ok", "token": "demo-issuer-token"})
    return jsonify({"status": "error", "message": "invalid"}), 401


# Create a new credential schema
@app.route('/schemas', methods=['POST'])
def create_schema():
    payload = request.json
    name = payload.get('name')
    fields = payload.get('fields', [])
    if not name or not fields:
        return jsonify({"error": "name and fields required"}), 400

    schema_id = save_schema(name, fields)
    return jsonify({"status": "ok", "schema_id": schema_id})


# List all credential schemas
@app.route('/schemas', methods=['GET'])
def get_schemas():
    return jsonify(list_schemas())


# Issue a new credential
@app.route('/issue', methods=['POST'])
def issue_credential():
    payload = request.json
    schema_id = payload.get('schema_id')
    subject = payload.get('subject')

    if not schema_id or not subject:
        return jsonify({"error": "schema_id and subject required"}), 400

    # Create credential
    credential = make_credential(
        issuer_id="did:example:issuer",
        subject=subject,
        schema_id=schema_id
    )

    # Sign it
    signed = sign_json(credential, ISSUER_KEY)

    # Save it locally
    record_id = save_credential(signed)

    return jsonify({
        "status": "ok",
        "credential_id": record_id,
        "credential": signed
    })


# Revoke a credential
@app.route('/revoke', methods=['POST'])
def revoke():
    payload = request.json
    cred_id = payload.get('credential_id')
    if not cred_id:
        return jsonify({"error": "credential_id required"}), 400

    ok = revoke_credential(cred_id)
    if not ok:
        return jsonify({"error": "not found"}), 404

    return jsonify({"status": "revoked", "credential_id": cred_id})


# List all issued credentials
@app.route('/credentials', methods=['GET'])
def credentials():
    return jsonify(list_credentials())


# ---------------------------
# Run Server
# ---------------------------
if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True)
