import React, {useEffect, useState} from 'react'
import { listSchemas, issueCredential } from '../api'
export default function IssueCredential(){
    const [schemas, setSchemas] = useState([])
    const [schemaId, setSchemaId] = useState('')
    const [subjectJson, setSubjectJson] =
    useState('{"id":"user-1","name":"Alice","email":"a@example.com"}')
    useEffect(()=>{listSchemas().then(setSchemas)},[])
    async function issue(){
        let subject
        try{ subject = JSON.parse(subjectJson) }catch(e){ alert('invalid json');
    return }
        const r = await issueCredential(schemaId, subject)
        if(r.credential_id) alert('credential issued: '+r.credential_id)
        else alert('error issuing')
    }
    return (
    <div className="card p-3">
        <h5>Issue Credential</h5>
        <select className="form-control my-2" value={schemaId}onChange={e=>setSchemaId(e.target.value)}>
            <option value="">-- select schema --</option>
            {schemas.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <textarea rows={6} className="form-control my-2" value={subjectJson}onChange={e=>setSubjectJson(e.target.value)} />
        <button className="btn btn-primary" onClick={issue}>Issue</button>
    </div>
    )
}
