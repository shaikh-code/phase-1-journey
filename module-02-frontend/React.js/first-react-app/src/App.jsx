
import React from 'react'

const App = () => {
  const name="john"
  const x = 10
  const y  =11
  const names = ["john","mary","joe","Sara"]
  const loggedIn  =false
  const styles = {
    color:"red",
    fontSize:"55px"
  }

  return (
     <div>
      <h1 className="text-5xl font-bold text-blue-600">
      Hello {name}
    </h1>
    <p style={styles}>the sum of {x} and {y} is {x+y}</p>
    <ul>
      {names.map((name,index)=>(
        <li key={index}>{name}</li>

      ))}
    </ul>
    {/* { loggedIn ? <h1>hello member</h1>: <h1>hello guest</h1>} */
      loggedIn && <h1>hello member</h1>
    }
     </div>
    
  
  )
}

export default App
