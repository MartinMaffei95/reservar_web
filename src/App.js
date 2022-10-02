import './App.css';
import { useEffect } from 'react';
function App() {
  const getData = () => {
    fetch('http://localhost:5000/buildings/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzMzYxMTExYzcwMDExNDQxN2QzMDg0OSIsInVzZXJuYW1lIjoibWFydGluIiwicGFzc3dvcmQiOiIkMmIkMTAkQ25xaFFVNEVkZHlHeFEwc0hzMUp3T0xoWDY4OHA1OC9pUXpkV0RXem43cTBYWk1nc0hua2kiLCJjcmVhdGVkQXQiOjE2NjQ0ODc2OTc2NzMsInVwZGF0ZWRBdCI6MTY2NDQ4NzY5NzY3MywiX192IjowfSwiaWF0IjoxNjY0NTA0MDAyfQ.famG5lYqHDKfe-xxJcyL9EslkBJkXbBle82_y-1MZ60',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  useEffect(() => {
    getData();
  }, []);

  return <div className="App"></div>;
}

export default App;
