import React from 'react';
import { Card, Box, Grid, Typography, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const PatientSymptomsCard = ({ selectedSymptoms, onSymptomsChange,age }) => {
  const symptoms = [
    { label: 'Prurito en los últimos 12 meses', value: 'Prurito en los ultimos 12 meses' },
    { label: 'Afectación del pliegue antecubital', value: 'Antecubital' },
    { label: 'Afectación de los huecos poplíteos', value: 'Huecos poplieos' },
    { label: 'Afectación de la cara lateral de tobillos', value: 'Cara lateral de tobillos' },
    { label: 'Afectación del cuello', value: 'Cuello' },
    { label: 'Afectación de la zona periorbitaria', value: 'Zona periorbitaria' },
    { label: 'Dermatitis en mejillas', value: 'Mejillas' },
    { label: 'Dermatitis en frente', value: 'Frente' },
    { label: 'Dermatitis en cara externa de miembros', value: 'Cara externa de miembros' },
    { label: 'Asma', value: 'Asma' },
    { label: 'Rinitis Alérgica', value: 'Rinitis Alergica' },
    { label: 'Enfermedad atópica en familiar de primer grado', value: 'Enfermedad atopica en familiar de primer grado' },
    { label: 'Xerosis cutánea generalizada en el último año', value: 'Xerosis cutanea generalizada en el ultimo anho' },
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const newSelectedSymptoms = checked
      ? [...selectedSymptoms, value]
      : selectedSymptoms.filter((symptom) => symptom !== value);

    onSymptomsChange(newSelectedSymptoms);
  };

  return (
    <Card>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Síntomas
            </Typography>
            <Typography variant="h5" paragraph>
              Por favor marque correctamente los síntomas que presenta el paciente
            </Typography>
            
            <FormGroup sx={{ mt: 4 }}>
              {symptoms.map((symptom, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      name="hallazgo"
                      value={symptom.value}
                      checked={selectedSymptoms.includes(symptom.value)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={symptom.label}
                />
              ))}
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="/assets/doctor.svg" alt="Descripción de la imagen" style={{ width: '100%' }} />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default PatientSymptomsCard;
