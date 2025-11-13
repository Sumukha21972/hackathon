import React, {useEffect, useState} from 'react'
import { listCredentials, revokeCredential } from '../api'
import { Button, Spinner, ListGroup, Badge } from 'react-bootstrap'

export default function RevocationPanel(){
  const [creds, setCreds] = useState([])
  const [loading, setLoading] = useState(false)
  const [busyId, setBusyId] = useState(null)

  async function fetchCreds(){
    setLoading(true)
    try {
      const data = await listCredentials()
      setCreds(data || [])
    } catch(e){ console.error(e); alert('Failed to load') }
    finally { setLoading(false) }
  }

  useEffect(()=>{ fetchCreds() },[])

  async function handleRevoke(id){
    if(!window.confirm('Revoke credential ' + id + '?')) return
    setBusyId(id)
    const r = await revokeCredential(id)
    if(r && r.status === 'revoked'){ await fetchCreds(); alert('revoked') }
    else alert('failed to revoke')
    setBusyId(null)
  }

  if (loading) return <div className="text-center py-3"><Spinner animation="border" /></div>

  return (
    <ListGroup variant="flush">
      {creds.length === 0 && <div className="text-muted">No credentials yet</div>}
      {creds.map(c => (
        <ListGroup.Item key={c.id} className="d-flex align-items-center justify-content-between">
          <div>
            <div style={{fontFamily:'monospace'}}>{c.id}</div>
            <small className="text-muted">Created: {new Date(c.created_at*1000).toLocaleString()}</small>
          </div>
          <div>
            <Badge bg={c.revoked ? 'danger' : 'success'} className="me-2">{c.revoked ? 'REVOKED' : 'VALID'}</Badge>
            <Button size="sm" variant="danger" disabled={c.revoked || busyId===c.id} onClick={()=>handleRevoke(c.id)}>
              { busyId===c.id ? 'Working...' : (c.revoked ? 'Revoked' : 'Revoke') }
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
