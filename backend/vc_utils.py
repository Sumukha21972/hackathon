# vc_utils.py - small helper producing a minimal W3C-like VC JSON
import time

def make_credential(issuer_id, subject, schema_id):
    now = int(time.time())
    credential = {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        "id": "urn:uuid:" + str(subject.get('id') or subject.get('subject_id') or now),
        "type": ["VerifiableCredential"],
        "issuer": issuer_id,
        "issuanceDate": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime(now)),
        "credentialSchema": {"id": schema_id, "type":"JsonSchemaValidator2018"},
        "credentialSubject": subject
        }
    return credential