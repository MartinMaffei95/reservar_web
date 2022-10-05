import React from 'react';
import { useEffect, useState } from 'react';
import Header from '../Components/Header';
import {
  Box,
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material/';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';

const Buildings = () => {
  const [buildings, setBuildings] = useState([]);
  const { data, loading, error } = useFetch('buildings');

  useEffect(() => {
    setBuildings(data?.building);
  }, [loading]);

  const BuildingCard = ({ buildingName, buildingId, admin, space }) => (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {buildingName}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Administrador: {admin}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {space}
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
      <Header />
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
            key={b._id}
            buildingName={b.name}
            buildingId={b._id}
            admin={b.admin[0].username}
            space={b?.spaces[0]?.name}
          />
        ))}
    </div>
  );
};

export default Buildings;
