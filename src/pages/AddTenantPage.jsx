import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import {
  Grid,
  Typography,
  InputBase,
  Paper,
  Divider,
  IconButton,
  Button,
} from '@mui/material/';
import { MdOutlinePersonAddAlt } from 'react-icons/md';
import { MdSearch } from 'react-icons/md';
import useFetch from '../Hooks/useFetch';
import usePostFetch from '../Hooks/usePostFetch';
const AddTenantPage = () => {
  let { buildingId } = useParams();
  const [results, setResults] = useState();
  const [search, setSearch] = useState('');

  const postHook = usePostFetch();
  const { data, loading, error, fetchGetData } = useFetch();

  const handleSearchValue = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      if (search === '') return alert('input vacio');
      fetchGetData(`search/?username=${search}`);
    }
  };

  const postData = (userId, bodyData) => {
    postHook.fetchPostData(`users/${userId}`, bodyData);
  };

  useEffect(() => {
    setResults(data?.user);
  }, [loading, postHook.loading]);

  const titleStyle = {
    marginBlock: '1rem .5rem',
    height: '3rem',
    paddingInline: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <div>
      <Header />
      <Grid
        container
        direction="column"
        justifyContent="center"
        mt={5}
        mb={5}
        sx={{
          maxWidth: '90%',
          minWidth: '80%',
          marginInline: 'auto',
        }}
      >
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '90vw',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            inputComponent="input"
            type="search"
            placeholder="Buscá un inquilino"
            inputProps={{ 'aria-label': 'buscá un inquilino' }}
            value={search}
            onChange={handleSearchValue}
            onKeyDown={handleSearch}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <IconButton
            onClick={handleSearch}
            type="button"
            sx={{ p: '10px' }}
            aria-label="search"
          >
            <MdSearch />
          </IconButton>
        </Paper>

        {results ? (
          results?.map((res) => (
            <Paper key={res?._id} sx={titleStyle}>
              <Typography>{res?.username}</Typography>
              <Button
                onClick={() => {
                  postData(res?._id, { buildingId: buildingId });
                }}
                variant="outlined"
                startIcon={<MdOutlinePersonAddAlt />}
              >
                add
              </Button>
            </Paper>
          ))
        ) : (
          <div>Sin resultados</div>
        )}
      </Grid>
    </div>
  );
};

export default AddTenantPage;
