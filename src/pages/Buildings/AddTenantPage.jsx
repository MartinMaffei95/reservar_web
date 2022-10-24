import { useState, useEffect } from 'react';
import Header from '../../Components/Header';
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
import useFetch from '../../Hooks/useFetch';
import usePostFetch from '../../Hooks/usePostFetch';
import { findeItems, titleStyle } from '../../muiStyles';
import useDeleteFetch from '../../Hooks/useDeleteFetch';
import AddTenantButton from '../../molecules/AddTenantButton';
import { Helmet } from 'react-helmet';
const AddTenantPage = () => {
  let { buildingId } = useParams();
  const [results, setResults] = useState();
  const [search, setSearch] = useState('');
  const [buildingData, setBuildingData] = useState();

  const postHook = usePostFetch();
  const deleteHook = useDeleteFetch();
  const { data, loading, error, fetchGetData } = useFetch();
  const buildingFetch = useFetch(`buildings/${buildingId}`);
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

  const postAction = (userId, bodyData) => {
    postHook.fetchPostData(`users/${userId}`, bodyData);
  };

  const deleteAction = (userId, bodyData) => {
    deleteHook.fetchDeleteData(`users/${userId}`, bodyData);
  };

  const [onHover, setOnHover] = useState(false);

  useEffect(() => {
    buildingFetch.fetchGetData(`buildings/${buildingId}`);
  }, [postHook?.data, deleteHook?.data]);

  useEffect(() => {
    setBuildingData(buildingFetch?.data?.building);
    console.log(buildingFetch?.data?.building);
    setResults(data?.user);
  }, [buildingFetch?.loading, loading]);

  return (
    <div>
      <Helmet>
        <title>Agregar inquilino | {buildingData?.name || 'TakeZoom'}</title>
      </Helmet>
      <Header backButton title={'Agrega inquilinos'} />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        mb={5}
        sx={{
          maxWidth: '90%',
          minWidth: '80%',
          marginInline: 'auto',
        }}
      >
        <Paper elevation={4} sx={titleStyle}>
          <Typography>{buildingData?.name}</Typography>
        </Paper>
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
          results
            ?.filter((res) => res.username !== localStorage.getItem('username'))
            .map((res) => (
              <Paper key={res?._id} sx={findeItems}>
                <Typography>{res?.username}</Typography>
                {!buildingData?.requestsSended?.includes(res?._id) ? (
                  <AddTenantButton
                    addBtn={true}
                    deleteAction={() => {
                      deleteAction(res?._id, { buildingId: buildingId });
                    }}
                    postAction={() => {
                      postAction(res?._id, { buildingId: buildingId });
                    }}
                  />
                ) : (
                  <AddTenantButton
                    addBtn={false}
                    deleteAction={() => {
                      deleteAction(res?._id, { buildingId: buildingId });
                    }}
                    postAction={() => {
                      postAction(res?._id, { buildingId: buildingId });
                    }}
                  />
                )}
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
