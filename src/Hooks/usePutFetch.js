import { useState, useEffect } from 'react';

const usePutFetch = (endpoint, bodyData) => {
  // action = 'GET','POST','PUT' 'DELETE';
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPutData = (endpoint, bodyData) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_URI}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(bodyData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    if (!bodyData) return;
    if (!endpoint) return;
    fetchPutData(endpoint, bodyData);
  }, []);

  return { data, loading, error, fetchPutData };
};

export default usePutFetch;
