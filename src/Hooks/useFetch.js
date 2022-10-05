import { useState, useEffect } from 'react';

const useFetch = (endpoint, token) => {
  // action = 'GET','POST','PUT' 'DELETE';
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGetData = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_URI}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
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
    fetchGetData();
  }, []);

  return { data, loading, error };
};

export default useFetch;
