import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [test, setTest] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/testApi')
      .then(response => {
        setTest(response.data)
      })
  }, [])

  return (
    <>
      <h1>test</h1>
      <ul>
        {test.map(test1 =>(
          <li key={test1.id}>
            {test1.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
