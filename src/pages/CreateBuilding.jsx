import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import {
  Paper,
  Grid,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  ToggleButtonGroup,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  ToggleButton,
  Stack,
  ButtonGroup,
  Button,
  Tooltip,
  Container,
} from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
//FORMIK
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreateBuilding = () => {
  const initialValues = {
    name: '',
    space_name: '',
    timeSlotsFormat: '',
    needConfirmation: '',
  };

  const SpacesCreated = ({ name, resFor, reqAuth }) => (
    <Accordion elevation={4} sx={cardSpaceStyle}>
      <AccordionSummary
        expandIcon={'▼'}
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          '& .MuiAccordionSummary-content': {
            justifyContent: 'space-between',
          },
          gap: '1rem',
        }}
      >
        <Typography>{name}</Typography>
        <ButtonGroup variant="text">
          {/* <Tooltip id={name} title="Edit">
            <Button>
              <AiOutlineEdit />
            </Button>
          </Tooltip> */}
          <Tooltip title="Delete">
            <Button
              onClick={removeCardSpace}
              id={name}
              sx={{ background: 'lightblue' }}
            >
              <AiOutlineDelete onClick={removeCardSpace} id={name} />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Nombre del edificio: {name} </Typography>
        <Typography>
          Se reserva por: {resFor === 'PER_DAY' ? 'DIA' : 'FRANJA HORARIA'}{' '}
        </Typography>
        <Typography>Requiere autorizacion?: {reqAuth ? 'SI' : 'NO'}</Typography>
      </AccordionDetails>
    </Accordion>
  );

  const onSubmit = () => {
    console.log({
      name: values.name,
      buildingIdentifier: uuidv4(),
      spaces: spaces,
    });
    fetch('http://localhost:5000/buildings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzMzYxMTExYzcwMDExNDQxN2QzMDg0OSIsInVzZXJuYW1lIjoibWFydGluIiwicGFzc3dvcmQiOiIkMmIkMTAkQ25xaFFVNEVkZHlHeFEwc0hzMUp3T0xoWDY4OHA1OC9pUXpkV0RXem43cTBYWk1nc0hua2kiLCJjcmVhdGVkQXQiOjE2NjQ0ODc2OTc2NzMsInVwZGF0ZWRBdCI6MTY2NDQ4NzY5NzY3MywiX192IjowfSwiaWF0IjoxNjY0ODA5MzEzfQ.JrrL9-imwp2QxqdTXtLSAlZThvb9pC8LMywSeFvIDSE',
      },
      body: JSON.stringify({
        name: values.name,
        buildingIdentifier: uuidv4(),
        spaces: spaces,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const errorMessages = {
    required: '* Este campo es requerido',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'La cantidad minima de caracteres es 4')
      .required(errorMessages.required),
  });

  //Principal Form
  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setFieldValue,
  } = formik;

  //Space Form

  const SpaceValidationSchema = Yup.object().shape({
    space_name: Yup.string()
      .min(4, 'La cantidad minima de caracteres es 4')
      .required(errorMessages.required),
    timeSlotsFormat: Yup.string().required(errorMessages.required),
    needConfirmation: Yup.boolean().required(errorMessages.required),
  });

  const spaceInitialValues = {
    space_name: '',
    timeSlotsFormat: '',
    needConfirmation: false,
  };

  const spaceSubmit = () => {
    if (
      spaces.find((space) => space.space_name === SpaceFormik.values.space_name)
    ) {
      return alert('ya xiste');
    }
    console.log(spaces);
    setSpaces([
      ...spaces,
      {
        space_name: SpaceFormik.values.space_name,
        timeSlotsFormat: SpaceFormik.values.timeSlotsFormat,
        needConfirmation: SpaceFormik.values.needConfirmation,
      },
    ]);
    SpaceFormik.resetForm();
  };

  const SpaceFormik = useFormik({
    initialValues: spaceInitialValues,
    onSubmit: spaceSubmit,
    validationSchema: SpaceValidationSchema,
  });
  const [expanded, setExpanded] = useState(false);
  const handleExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const cardSpaceStyle = {
    maxWidth: '95%',
    minWidth: '90%',
  };

  const [spaces, setSpaces] = useState([]); //Array with spaces - fetch POST
  const [newSpace, setNewSpace] = useState({
    space_name: '',
    timeSlotsFormat: '',
    needConfirmation: false,
  });

  const removeCardSpace = (e) => {
    let spacesList = spaces.filter((sp) => sp.space_name !== e.target.id);
    console.log(spacesList);
    setSpaces(spacesList);
  };
  const editCardSpace = () => {};

  return (
    <div>
      <h3>CREAR EDIFICIO</h3>
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{
          maxWidth: '90%',
          minWidth: '80%',
          marginInline: 'auto',
        }}
      >
        <TextField
          error={errors.name && touched.name}
          name={'name'}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Nombre del edificio"
          variant="filled"
          value={values.name}
        />

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          mt={3}
          mb={3}
        >
          {spaces &&
            spaces.map((sp) => (
              <SpacesCreated
                key={sp.space_name}
                name={sp.space_name}
                resFor={sp.timeSlotsFormat}
                reqAuth={sp.needConfirmation}
              />
            ))}
        </Stack>
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={'▼'}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>Crear un espacio común</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container direction="column" justifyContent="center">
                <FormControl variant="filled">
                  <TextField
                    error={
                      SpaceFormik.errors.space_name &&
                      SpaceFormik.touched.space_name
                    }
                    name={'space_name'}
                    value={SpaceFormik.values.space_name}
                    label="Nombre"
                    variant="filled"
                    onChange={SpaceFormik.handleChange}
                  />

                  <FormControl variant="filled">
                    <InputLabel>Reservar por:</InputLabel>

                    <Select
                      name={'timeSlotsFormat'}
                      error={
                        SpaceFormik.errors.timeSlotsFormat &&
                        SpaceFormik.touched.timeSlotsFormat
                      }
                      value={SpaceFormik.values.timeSlotsFormat}
                      onChange={SpaceFormik.handleChange}
                    >
                      <MenuItem value={'PER_DAY'}>DIA</MenuItem>
                      <MenuItem value={'BY_TIME_SLOT'}>FRANJA HORARIA</MenuItem>
                    </Select>
                  </FormControl>

                  <Container sx={{ marginBlock: '1em' }}>
                    <Typography mt={1} mb={1}>
                      Necesita autorizacion?
                    </Typography>
                    <ToggleButtonGroup
                      error={
                        SpaceFormik.errors.needConfirmation &&
                        SpaceFormik.touched.needConfirmation
                      }
                      value={SpaceFormik.values.needConfirmation}
                      onChange={SpaceFormik.handleChange}
                      color="primary"
                      exclusive
                      fullWidth
                    >
                      <ToggleButton name={'needConfirmation'} value="true">
                        SI
                      </ToggleButton>
                      <ToggleButton name={'needConfirmation'} value="false">
                        NO
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Container>
                </FormControl>
                <Button onClick={SpaceFormik.handleSubmit} variant="outlined">
                  Crear zona comun
                </Button>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
        <Button onClick={handleSubmit} variant="outlined">
          Guardar Edificio
        </Button>
      </Grid>
    </div>
  );
};

export default CreateBuilding;
