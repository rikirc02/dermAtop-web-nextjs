
import React, { useEffect, useState } from 'react';
import { Button, Stepper, Step, StepLabel, Box,Grid,Typography, Card, TextField,
 } from '@mui/material';
 
import PatientSymptomsCard from '../components/PatientsSintomosCard';
import DiagnosisCard from '../components/DiagnosisCard';


function getStepContent(step) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [age, setAge] = useState();
  
const handleSymptomsChange = (newSymptoms) => {
 
  setSelectedSymptoms(newSymptoms);
};
const handleAgeChange = (event) => {
  const value = event.target.value;
  if (value > 18) {
    setAge(18); 
  } else if (value < 0) {
    setAge(0); 
  } else {
    setAge(value);
  }
};


  switch (step) {
    case 0:
      return (
        <Card>

          <Box sx={{  p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                 Introducción
                </Typography>
                <Typography variant="body1" paragraph>
                  Realice una breve evaluación de los sintomas. La información que proporcione está segura . Sus resultados incluirán :
               
                </Typography>

                <Typography  mt={1} variant="body1" component="p" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px' }}>•</span>
          Diagnóstico a partir de sus síntomas 
        </Typography>
        <Typography  mt={1} variant="body1" component="p" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px' }}>•</span>
          Recomendaciones sobre qué hacer a continuación
        </Typography>
        <Typography mt={2} variant="h5" gutterBottom>
                  Acerca de esta herramienta 
                </Typography>
                <Typography  mt={1} variant="body1" component="p" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px' }}>•</span>
          Validado por médicos
        </Typography>
        <Typography   mt={1} variant="body1" component="p" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px' }}>•</span>
         Clínicamente Validado
        </Typography>
        
              </Grid>
              <Grid item xs={12} md={6}>
                <img src="/assets/doctor.svg" alt="Descripción de la imagen" style={{ width: '100%' }} />
              </Grid>
            </Grid>
          </Box>
        </Card>
          );
    case 1:
      return  <Card>

      <Box sx={{  p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
             Edad
            </Typography>
            <Typography variant="h5" paragraph>
             Por favor introduzca la edad del paciente correctamente
           
            </Typography>
            <TextField  sx={{mt:4}}
              label="Edad del paciente"
              variant="outlined"
              fullWidth
              type="number"
              value={age}
             
              onChange={handleAgeChange}
              inputProps={{ min: 0,max:18 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="/assets/doctor.svg" alt="Descripción de la imagen" style={{ width: '100%' }} />
          </Grid>
        </Grid>
      </Box>
    </Card>;
    case 2:
      return <PatientSymptomsCard age selectedSymptoms={selectedSymptoms} onSymptomsChange={handleSymptomsChange}></PatientSymptomsCard>;
    case 3:
      return <DiagnosisCard selectedSymptoms={selectedSymptoms} age={age}></DiagnosisCard> ;
    default:
      return 'Desconocido';
  }
}

const PaginatedForm = () => {
  const steps = ['Introducción', 'Edad', 'Síntomas', 'Diagnóstico y Tratamiento'];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Si estamos en el último paso (Finalizar), recargar la página
      window.location.reload();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => 
      prevActiveStep === 0 ? steps.length - 1 : prevActiveStep - 1
    );
  };
  return (
    <Box my={10}  sx={{ width: '100%' }}>
      
      <Stepper sx={{margin:2}} activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        {activeStep === steps.length ? (
          <Box>
            <Typography>Todos los pasos completados</Typography>
          </Box>
        ) : (
          <Box>
            <Typography>{getStepContent(activeStep)}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Atrás
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              
              <Button   variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PaginatedForm;
