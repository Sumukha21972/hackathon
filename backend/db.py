# db.py - tiny sqlite manager for schemas & credentials (demo only)
import sqlite3
import json
from pathlib import Path
DB_PATH = Path(__file__).parent / 'data.db'


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    cur = conn.cursor()
    cur.execute('''CREATE TABLE IF NOT EXISTS schemas (id TEXT PRIMARY KEY, name TEXT, fields TEXT)''')
    cur.execute('''CREATE TABLE IF NOT EXISTS credentials (id TEXT PRIMARY KEY, credential_json TEXT, revoked INTEGER DEFAULT 0, created_at INTEGER)''')
    conn.commit()
    conn.close()


def save_schema(name, fields):
    import uuid
    id = str(uuid.uuid4())
    conn = get_db()
    conn.execute('INSERT INTO schemas (id,name,fields) VALUES (?, ?, ?)', (id, name, json.dumps(fields)))
    conn.commit()
    conn.close()
    return id


def list_schemas():
    conn = get_db()
    rows = conn.execute('SELECT * FROM schemas').fetchall()
    return [{"id":r['id'],"name":r['name'],"fields":json.loads(r['fields'])} for r in rows]


def save_credential(credential_json):
    import uuid, time
    id = str(uuid.uuid4())
    conn = get_db()
    conn.execute('INSERT INTO credentials (id, credential_json, revoked, created_at) VALUES (?, ?, 0, ?)', (id, json.dumps(credential_json), int(time.time())))
    conn.commit()
    conn.close()
    return id


def get_credential(id):
    conn = get_db()
    r = conn.execute('SELECT * FROM credentials WHERE id=?', (id,)).fetchone()
    return None if not r else {"id":r['id'], "credential":json.loads(r['credential_json']), "revoked":bool(r['revoked'])}


def revoke_credential(id):
    conn = get_db()
    cur = conn.execute('UPDATE credentials SET revoked=1 WHERE id=?', (id,))
    conn.commit()
    return cur.rowcount>0


def list_credentials():
    conn = get_db()
    rows = conn.execute('SELECT id,created_at,revoked FROM credentials').fetchall()
    return [{"id":r['id'],"created_at":r['created_at'],"revoked":bool(r['revoked'])} for r in rows]