
import Container from "@mui/material/Container";

import Grid from "@mui/material/Grid";

import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

import Layout from "../components/layouts/Layout";
import Page from "../components/layouts/Page";

import PaginatedForm from '../components/PaginatedForm';


export default function Cataloging() {
 
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // No renderizar en el servidor
  }

  return (
    <Layout>
      <Page title="Diagnostic" maxWidth={false}>
     
          <Container maxWidth="lg" sx={{ py: 0 }}>
            <Grid container spacing={2}>
            <PaginatedForm></PaginatedForm>
            </Grid>
          </Container>
        
      </Page>
    </Layout>
  );
}
             
