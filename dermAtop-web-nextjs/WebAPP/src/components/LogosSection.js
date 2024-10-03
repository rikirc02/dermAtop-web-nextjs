import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

export default function LogoSection({ logos }) {
  return (
    <Container sx={{ py: 2 }}>
      <Divider sx={{ mb: 4 }} />
      <Grid container justifyContent="space-around" alignItems="center">
        {logos.map((logo, index) => (
          <Grid
            item
            container
            justifySelf="center"
            alignItems="center"
            justifyContent="center"
            xs={2}
            key={index}
          >
            <img
              draggable={false}
              src={logo.image}
              alt={logo.name}
              style={{
                userSelect: "none",
                objectFit: "contain",
                height: 70,
                width: 100,
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ mt: 4 }} />
    </Container>
  );
}
