# keys.py - generate/load an ed25519 keypair and sign simple JSON
from pathlib import Path
import json
import base64
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
from cryptography.hazmat.primitives import serialization

# Directory to store key files
KEY_DIR = Path(__file__).parent / "keys"
KEY_DIR.mkdir(exist_ok=True)

def load_or_create_keys(name="issuer"):
    """Load existing keypair or create a new one."""
    priv_path = KEY_DIR / f"{name}_priv.pem"
    pub_path = KEY_DIR / f"{name}_pub.pem"

    # Load existing keys
    if priv_path.exists() and pub_path.exists():
        private_key = serialization.load_pem_private_key(
            priv_path.read_bytes(),
            password=None
        )
        public_key = serialization.load_pem_public_key(
            pub_path.read_bytes()
        )
        return {"priv": private_key, "pub": public_key}

    # Create new keypair
    private_key = Ed25519PrivateKey.generate()
    public_key = private_key.public_key()

    # Save private key
    priv_bytes = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )
    priv_path.write_bytes(priv_bytes)

    # Save public key
    pub_bytes = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )
    pub_path.write_bytes(pub_bytes)

    return {"priv": private_key, "pub": public_key}

def sign_json(payload, keypair):
    """Sign a JSON-serializable payload and return a VC-style proof."""
    msg = json.dumps(payload, separators=(",", ":")).encode("utf-8")
    signature = keypair["priv"].sign(msg)

    proof = {
        "type": "Ed25519Signature2018",
        "signatureValue": base64.b64encode(signature).decode()
    }

    signed_payload = dict(payload)
    signed_payload["proof"] = proof
    return signed_payload
