import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAccount } from "../features/auth/authSlice";

// CSS
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Card, Container } from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, message, isError } = useSelector(
    (state) => state.auth
  );

  const id = user.userId;

  const updatePage = () => {
    navigate("/updateprofile");
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Valider la suppression du compte ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Valider",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteAccount(id));
        navigate("/");
      }
    });
  };

  return (
    <Container>
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
            minWidth: "90%",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {user.isAdmin ? (
              <Typography textAlign="center" variant="h4" width="80%">
                Page Administrateur
              </Typography>
            ) : (
              <Typography variant="h1" sx={{ fontSize: "h3.fontSize" }}>
                Mon Profile
              </Typography>
            )}
            <Box textAlign="center">
              <Box className="profile-avatar">
                <img
                  src={user.avatar}
                  alt="profil avatar"
                  crossOrigin="anonymous"
                  className="avatar"
                />
              </Box>
              <Typography>Nom: {user.lastName}</Typography>
              <Typography>Prénom: {user.firstName}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                sx={{ m: 2 }}
                onClick={updatePage}
              >
                Modifier le compte
              </Button>
              <Button
                variant="contained"
                color="error"
                size="medium"
                sx={{ m: 2 }}
                onClick={handleDelete}
              >
                Supprimer le compte
              </Button>
            </Box>
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
};

export default Profile;
