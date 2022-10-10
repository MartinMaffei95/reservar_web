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

const Buildings = () => {
  const [buildings, setBuildings] = useState([]);
  const { data, loading, error } = useFetch('buildings');

  useEffect(() => {
    setBuildings(data?.building);
    console.log(buildings);
  }, [loading]);

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
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
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
    </div>
  );
};

export default Buildings;
