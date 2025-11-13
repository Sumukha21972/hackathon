const API_BASE = process.env.REACT_APP_API || 'http://localhost:5000'


export async function login(username, password) {
    const res = await fetch(`${API_BASE}/login`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username,password})})
    return res.json()
}
export async function createSchema(name, fields) {
    const res = await fetch(`${API_BASE}/schemas`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name, fields})})
    return res.json()
}
export async function listSchemas() {
    const res = await fetch(`${API_BASE}/schemas`)
    return res.json()
}
export async function issueCredential(schema_id, subject) {
    const res = await fetch(`${API_BASE}/issue`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({schema_id, subject})})
    return res.json()
}
export async function revokeCredential(credential_id) {
    const res = await fetch(`${API_BASE}/revoke`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({credential_id})})
    return res.json()
}
export async function listCredentials() {
    const res = await fetch(`${API_BASE}/credentials`)
    return res.json()
}