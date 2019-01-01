import React from 'react'

export default function(props) { 
  console.log(props)
  let filters = Object.keys(props).map(k => [k, props[k]])
  let TYPE=0
  let OPTIONS=1
  return (
    <div>
      {filters.map(f=> (
        <div>
          <h1>{f[TYPE]}</h1>
          <p>{f[OPTIONS]}</p>
        </div>
      ))}
    </div>
    
  )
}