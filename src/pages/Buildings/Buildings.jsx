import React from 'react';
import { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import {
  Box,
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
  Grid,
} from '@mui/material/';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { buildingCard, cardContent } from '../../muiStyles';
import Bookings from '../Bookings/Bookings';
import { useResize } from '../../Hooks/useResize';

const Buildings = () => {
  const [buildings, setBuildings] = useState([]);
  const { data, loading, error } = useFetch('buildings');

  useEffect(() => {
    setBuildings(data?.building);
  }, [loading]);

  const { isPhone } = useResize();

  const BuildingCard = ({
    buildingName,
    buildingId,
    adminsLength,
    spacesLength,
    tenantsLength,
  }) => (
    <Card variant="outlined" sx={buildingCard}>
      <CardContent sx={cardContent}>
        <Typography>{buildingName}</Typography>
        <Typography color="text.secondary">
          Administradores: {adminsLength}
        </Typography>
        <Typography color="text.secondary">
          Zonas comunes: {spacesLength}
        </Typography>
        <Typography color="text.secondary">
          Inquilinos: {tenantsLength}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            navigate(`/buildings/${buildingId}`, { replace: false });
          }}
        >
          Ver edificio
        </Button>
      </CardActions>
    </Card>
  );
  const navigate = useNavigate();
  return (
    <div className="App">
      <Header title={'Mis edificios'} />
      <Grid container direction="row" justifyContent="space-around">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={
            isPhone
              ? {
                  maxWidth: '90%',
                  minWidth: '80%',
                  marginInline: 'auto',
                  gap: '1rem',
                }
              : {
                  maxWidth: '70vw',
                  minWidth: '60vw',
                  gap: '1rem',
                  '& .MuiPaper-root': {
                    maxWidth: '100%',
                    minWidth: '90%',
                  },
                }
          }
        >
          <Box mt={2}>
            <Button
              onClick={() => {
                navigate('/buildings/create');
              }}
              variant="outlined"
              startIcon={<HiOutlineOfficeBuilding />}
            >
              Crear nuevo edificio
            </Button>
          </Box>
          {buildings &&
            buildings?.map((b) => (
              <BuildingCard
                key={b?._id}
                buildingName={b?.name}
                buildingId={b?._id}
                adminsLength={b?.admin?.length}
                spacesLength={b?.spaces?.length}
                tenantsLength={b?.tenants?.length}
              />
            ))}
        </Grid>

        {!isPhone && <Bookings />}
      </Grid>
    </div>
  );
};

export default Buildings;
