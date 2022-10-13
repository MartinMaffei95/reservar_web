export const fetchPost =(endpoint, bodyData)=>{
 console.log(endpoint, bodyData);
    fetch(`${process.env.REACT_APP_URI}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(bodyData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        return data
      })
      .catch((err) => {
        return err
}



// import { useState, useEffect } from 'react';

// const usePostFetch = (endpoint, bodyData) => {
//   // action = 'GET','POST','PUT' 'DELETE';
//   const [data, setData] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchPostData = (endpoint, bodyData) => {
//     console.log(endpoint, bodyData);
//     setLoading(true);
//     fetch(`${process.env.REACT_APP_URI}/${endpoint}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//       body: JSON.stringify(bodyData),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setLoading(false);
//         setData(data);
//         console.log(data);
//       })
//       .catch((err) => {
//         setLoading(false);
//         setError(err);
//       });
//   };

//   useEffect(() => {
//     if (!bodyData) return;
//     if (!endpoint) return;
//     fetchPostData(endpoint, bodyData);
//   }, []);

//   return { data, loading, error, fetchPostData };
// };

// export default usePostFetch;