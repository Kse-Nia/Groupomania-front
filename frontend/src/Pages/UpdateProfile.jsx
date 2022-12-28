import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAccount } from "../features/auth/authSlice";

// CSS
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Card, Container, TextField } from "@mui/material";

const UpdateProfile = () => {
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = user.userId;
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const userData = { id, firstName, lastName, email };
    dispatch(updateAccount(userData));
  };
  /*  */
  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "1em",
            width: 600,
            maxWidth: "100%",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography textAlign="center" variant="h4" width="80%">
              Modifier mes données
            </Typography>

            <Box textAlign="center">
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                  id="firstName"
                  label="firstName"
                  name="firstName"
                  autoComplete="firstName"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                  id="lastName"
                  label="lastName"
                  name="lastName"
                  autoComplete="lastName"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Mettre à jour les données
                </Button>
              </form>
            </Box>
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
};

export default UpdateProfile;
