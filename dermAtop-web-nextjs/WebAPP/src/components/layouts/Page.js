import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Head from "next/head";

export default function Page({ title, seoTitle, maxWidth = "md", children }) {
  const pageTitle = seoTitle || title || "Lam Fundation";
  const showTitle = title && title !== "Lam Fundation";

  return (
    <>
      <Head>
        <title>
          {pageTitle !== "Lam Fundation"
            ? `dermAtop - ${pageTitle}`
            : pageTitle}
        </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="dermAtop" />
      </Head>
      {maxWidth === false ? (
        children
      ) : (
        <Container maxWidth={maxWidth} sx={{ pt: 2 }}>
          {showTitle && (
            <Typography variant="h1" sx={{ mb: 2 }}>
              {title}
            </Typography>
          )}
          {children}
        </Container>
      )}
    </>
  );
}
