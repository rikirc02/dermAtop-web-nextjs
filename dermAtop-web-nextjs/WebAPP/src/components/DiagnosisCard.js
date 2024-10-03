import React, { useState, useEffect } from 'react';
import { Card, Box, Grid, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';

const DiagnosisCard = ({ selectedSymptoms, age }) => {
  const [diagnosis, setDiagnosis] = useState(null);
  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      const requestBody = { lista: selectedSymptoms, edad: age };
      console.log('Request Body:', requestBody);
      try {
        const response = await fetch('http://localhost:4000/diagnostico', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error('Error al obtener el diagnóstico');
        }

        const data = await response.json();
        setDiagnosis(data.resultado);

        // Fetch treatment based on age
        const treatmentResponse = await fetch('http://localhost:4000/tratamiento', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ edad: age }),
        });

        if (!treatmentResponse.ok) {
          throw new Error('Error al obtener el tratamiento');
        }

        const treatmentData = await treatmentResponse.json();
        setTreatment(treatmentData.tratamientos);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnosis();
  }, [selectedSymptoms, age]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Card>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Diagnóstico
            </Typography>
            <Typography variant="body1" paragraph>
              {diagnosis ? diagnosis : 'No se encontró diagnóstico.'}
            </Typography>
           
            {diagnosis!=="Poca posibilidad de padecer dermatitis atopica, consulte al especialista para mayor seguridad"?( <Box>
              
              <Typography variant="h4" gutterBottom>
              Tratamiento
            </Typography> <Typography variant="body1" paragraph>

            {treatment ? (
  <Box>
    
    <List>
      {treatment.map((item, index) => (
        <ListItem key={index} sx={{ display: 'list-item', listStyleType: 'disc', pl: 2 }}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  </Box>
) : (
  <Typography variant="body1" paragraph>
    No se encontró tratamiento.
  </Typography>
)}

</Typography>  </Box>):<></>}
             
           
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="/assets/doctor.svg" alt="Descripción de la imagen" style={{ width: '100%' }} />
          </Grid>
          
        </Grid>
      </Box>
    </Card>
  );
};

export default DiagnosisCard;
