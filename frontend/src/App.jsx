import React, { useState, useEffect } from 'react'

export default function App(){
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(()=> {
    setMessages([{ id:'sys', speaker:'assistant', text:'Welcome to Titan Battalion Brain — ask anything.' }])
  },[])

  async function sendQuery(){
    if(!query.trim()) return
    setMessages(prev=>[...prev, { id:Date.now(), speaker:'user', text:query }])
    try{
      const res = await fetch((import.meta.env.VITE_API_BASE || '') + '/api/chat', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer ' + (import.meta.env.VITE_API_TOKEN || '') },
        body: JSON.stringify({ query })
      })
      const json = await res.json()
      setMessages(prev=>[...prev, { id:Date.now()+1, speaker:'assistant', text: json.answer || json.error || 'No response' }])
    }catch(e){
      setMessages(prev=>[...prev, { id:Date.now()+2, speaker:'assistant', text:'Error contacting server: '+String(e) }])
    }
    setQuery('')
  }

  return (
    <div style={{fontFamily:'Arial, sans-serif', padding:20, background:'#f1f5f9', minHeight:'100vh'}}>
      <div style={{maxWidth:900, margin:'0 auto', background:'#fff', borderRadius:12, padding:20}}>
        <h1 style={{margin:0}}>Titan Battalion Brain</h1>
        <p style={{color:'#666'}}>Ask questions, upload docs, and get recommendations.</p>

        <div style={{marginTop:20}}>
          {messages.map(m=>(
            <div key={m.id} style={{padding:10, marginBottom:8, background:m.speaker==='user'?'#eef':'#f8fafc', borderRadius:8}}>
              <div style={{fontSize:12, color:'#666'}}>{m.speaker==='user'?'You':'Titan Brain'}</div>
              <div style={{whiteSpace:'pre-wrap'}}>{m.text}</div>
            </div>
          ))}
        </div>

        <div style={{display:'flex', gap:8, marginTop:12}}>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ask Titan Battalion Brain..." style={{flex:1,padding:10,borderRadius:8,border:'1px solid #ccc'}} />
          <button onClick={sendQuery} style={{padding:'10px 16px', borderRadius:8, background:'#10b981', color:'#fff', border:'none'}}>Send</button>
        </div>
      </div>
    </div>
  )
}