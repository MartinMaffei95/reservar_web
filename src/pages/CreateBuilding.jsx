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

  const [spaces, setSpaces] = useState([]);
  const [newSpace, setNewSpace] = useState({
    space_name: '',
    timeSlotsFormat: '',
    needConfirmation: false,
  });

  const handleSpace = (e) => {
    const { name, value } = e.target;
    setNewSpace({ ...newSpace, [name]: value });
  };

  const saveSpace = () => {
    setSpaces([...spaces, newSpace]);
    setNewSpace({
      space_name: '',
      timeSlotsFormat: '',
      needConfirmation: false,
    });
    console.log(spaces);
  };

  const SpacesCreated = ({ name, resFor, reqAuth }) => (
    <Accordion
      elevation={4}
      sx={cardSpaceStyle}
      expanded={expanded === name}
      onChange={handleExpanded(name)}
    >
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
            <Button onClick={removeCardSpace} id={name}>
              <AiOutlineDelete />
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

  const onSubmit = () => {};

  const errorMessages = {
    required: '* Este campo es requerido',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'La cantidad minima de caracteres es 4')
      .required(errorMessages.required),
  });

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

  const [expanded, setExpanded] = useState(false);

  const handleExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const cardSpaceStyle = {
    maxWidth: '95%',
    minWidth: '90%',
  };

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
          name={'name'}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Nombre del edificio"
          variant="filled"
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
                name={sp.space_name}
                resFor={sp.timeSlotsFormat}
                reqAuth={sp.needConfirmation}
              />
            ))}
        </Stack>
        <div>
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleExpanded('panel1')}
          >
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
                    name={'space_name'}
                    value={newSpace?.space_name}
                    label="Nombre"
                    variant="filled"
                    onChange={handleSpace}
                  />

                  <FormControl variant="filled">
                    <InputLabel>Reservar por:</InputLabel>

                    <Select
                      name={'timeSlotsFormat'}
                      value={newSpace?.timeSlotsFormat}
                      onChange={handleSpace}
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
                      value={newSpace?.needConfirmation}
                      color="primary"
                      exclusive
                      fullWidth
                      onChange={handleSpace}
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
                <Button onClick={saveSpace} variant="outlined">
                  Crear zona comun
                </Button>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
        <Button variant="outlined">Guardar Edificio</Button>
      </Grid>
    </div>
  );
};

export default CreateBuilding;
