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
import AddAdminButton from '../../molecules/AddAdminButton';
const AddAdminPage = () => {
  let { buildingId } = useParams();
  // HOOKS
  const { data, loading, fetchGetData } = useFetch(`buildings/${buildingId}`);
  const postHook = usePostFetch();
  const deleteHook = useDeleteFetch();

  const [buildingData, setBuildingData] = useState();
  const [tenants, setTenats] = useState();
  const [renderTenants, setRenderTenants] = useState();
  const [searchValue, setSearchValue] = useState();

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
    }
    setRenderTenants(
      tenants.filter((t) => t?.username?.includes(e.target.value))
    );
  };

  const postAction = (id, bodyData) => {
    postHook.fetchPostData(`buildings/admin/${id}`, bodyData);
  };

  const deleteAction = (id, bodyData) => {
    deleteHook.fetchDeleteData(`buildings/admin/${id}`, bodyData);
  };

  useEffect(() => {
    fetchGetData(`buildings/${buildingId}`);
    setTenats(data?.building?.tenants);
    setRenderTenants(data?.building?.tenants);
  }, [postHook?.loading, deleteHook?.loading]);

  useEffect(() => {
    setBuildingData(data?.building);
    setRenderTenants(data?.building?.tenants);
  }, [loading]);

  return (
    <div>
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
            value={searchValue}
            onChange={handleSearch}
            onKeyDown={handleSearch}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <MdSearch />
          </IconButton>
        </Paper>

        {renderTenants ? (
          renderTenants?.map((res) =>
            buildingData.admin.find((admin) => admin._id === res._id) ? (
              <Paper key={res?._id} sx={findeItems}>
                <Typography>{res?.username}</Typography>
                <AddAdminButton
                  addBtn={false}
                  deleteAction={() => {
                    deleteAction(buildingId, { adminId: res?._id });
                  }}
                  postAction={() => {
                    postAction(buildingId, { newAdmin: res?._id });
                  }}
                />
              </Paper>
            ) : (
              <Paper key={res?._id} sx={findeItems}>
                <Typography>{res?.username}</Typography>
                <AddAdminButton
                  addBtn={true}
                  deleteAction={() => {
                    deleteAction(buildingId, { adminId: res?._id });
                  }}
                  postAction={() => {
                    postAction(buildingId, { newAdmin: res?._id });
                  }}
                />
              </Paper>
            )
          )
        ) : (
          <div>Sin resultados</div>
        )}
      </Grid>
    </div>
  );
};

export default AddAdminPage;
