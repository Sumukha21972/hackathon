// frontend/src/components/SchemaCreator.js  (patch)
import React, {useState} from 'react'
import { createSchema } from '../api'

export default function SchemaCreator(){
  const [name,setName]=useState('');
  const [fields,setFields]=useState('name,email');

  async function onCreate(e){
    e?.preventDefault?.();
    const f = fields.split(',').map(s=>s.trim()).filter(Boolean);
    try {
      const r = await createSchema(name, f);
      console.log('createSchema response:', r);
      if(r && r.schema_id) {
        alert('schema created: '+r.schema_id);
        setName(''); setFields('');
      } else {
        // show server error message if present
        const msg = r && (r.error || r.message) ? (r.error || r.message) : 'Error creating schema';
        alert(msg);
      }
    } catch(err){
      console.error('Network or code error:', err);
      alert('Network error — check backend console and network tab');
    }
  }

  return (
    <div className="card p-3">
      <h5>Create Schema</h5>
      <input className="form-control my-2" placeholder="Schema name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="form-control my-2" placeholder="fields comma separated" value={fields} onChange={e=>setFields(e.target.value)} />
      <button className="btn btn-success" onClick={onCreate}>Create</button>
    </div>
  )
}
