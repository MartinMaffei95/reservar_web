import { useState, useEffect } from 'react';

const useFetch = (endpoint, token) => {
  // action = 'GET','POST','PUT' 'DELETE';
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGetData = (endpoint) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_URI}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setData(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    if (!endpoint) return;
    fetchGetData(endpoint);
  }, []);

  return { data, loading, error, fetchGetData };
};

export default useFetch;
