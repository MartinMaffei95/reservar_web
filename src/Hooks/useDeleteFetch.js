import { useState, useEffect } from 'react';

const useDeleteFetch = (endpoint, bodyData) => {
  // action = 'GET','POST','PUT' 'DELETE';
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDeleteData = (endpoint, bodyData) => {
    console.log(endpoint, bodyData);
    setLoading(true);
    fetch(`${process.env.REACT_APP_URI}/${endpoint}`, {
      method: 'DELETE',
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
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    if (!bodyData) return;
    if (!endpoint) return;
    fetchDeleteData(endpoint, bodyData);
  }, []);

  return { data, loading, error, fetchDeleteData };
};

export default useDeleteFetch;
