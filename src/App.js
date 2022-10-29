import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users,setUsers]= useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])
  const handleSubmit= event =>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    
    const user = {name,email}
    console.log(user)

  
    fetch('http://localhost:5000/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    const newUsers = [...users,data]
    setUsers(newUsers)
    // Do some stuff ...
  })
  .catch((err) => console.log(err));
  event.target.reset()
  }
  
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <button>submit</button>
      </form>
     <h1> users:{users.length}</h1>
     {
      users.map(user=> <p key={user._id}>{user.name} {user.email}</p>)
     }
    </div>
  );
}

export default App;
