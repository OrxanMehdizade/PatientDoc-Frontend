import { Container, Grid } from "@mui/material";
import errorImg from "../assets/images/something-lost.png";

let NotFound = () => {
  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <img style={{ width: 500 }} src={errorImg} alt="err" />
          <h1 style={{ marginTop: 0, marginBottom: 0 }}>
            Oops, looks like the page is lost.
          </h1>
          <p style={{ fontSize: 22 }} className="sub-header text-block-narrow">
            This is not a fault, just an accident that was not intentional.
          </p>
        </div>
      </Grid>
    </Container>
  );
};

export default NotFound;
