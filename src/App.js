
import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios';



function App() {
const [data,setData] = useState([]);
const [sumber, setsumber] = useState([]);
const [b3, setb3] = useState([]);
  useEffect(() =>{
    axios.get(`http://localhost:4000/v1/data/datas`)
    .then(res => {
      setData(res.data.data);
    })

   
  },[data]);
  
  const add = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:4000/v1/data/add`,{
     
    sumber: sumber,
    b3_in: b3

    }) 
    .then(res => {
      alert(res.data.message)
      setsumber('')
      setb3('')
    }) }

    const upd = (e, id) => {
    e.preventDefault();

      axios.put(`http://localhost:4000/v1/data/update`,+ id)
      .then(res => {
        alert(res.data.message)
      })
    }

  const del = (id) => {
    

    axios.delete(`http://localhost:4000/v1/data/delete`,+ id)
    .then(res => {
      alert(res.data.message)
    })
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={add}>
          <input type='text' onInput={e => setsumber(e.target.value)} value={sumber} /><br />
          <input type='text' onInput={e => setb3(e.target.value)} value={b3}/><br />
          <button onClick={() => upd()}>ok</button><br />
        </form>
        <div>
        {data.map(e => (
        <ul key={e._id} style={{width:'244px', textAlign:'left'}}>
          <li>{e.sumber}</li>
          <li>{e.b3_in}</li>
          
          <li>
            <button>edit</button>
            <button onClick={() => del(e._id)}>hapus</button>
          </li>
        </ul>
        ))}
        </div>
      </header>
    </div>
  );
}

export default App;
