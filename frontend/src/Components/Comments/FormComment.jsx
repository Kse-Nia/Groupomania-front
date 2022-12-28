import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../features/comments/commentSlice";

// CSS
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Container } from "@mui/material";
import Textarea from "@mui/joy/Textarea";

const FormComment = ({ PostId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); //User data from Store

  const UserId = user.userId;
  const firstName = user.firstName;
  const lastName = user.lastName;
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const commentData = {
      PostId,
      UserId,
      firstName,
      lastName,
      text,
    };

    dispatch(createComment(commentData));
    navigate("/dashboard");
  }

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Container sx={{ m: 1, p: 1 }}>
        <Typography variant="h6">Ecrire un commentaire</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Textarea
            sx={{ background: "#F3F3F3" }}
            variant="soft"
            placeholder="Ecrivez votre commentaire ici..."
            minRows={2}
            autoComplete="given-name"
            name="text"
            id="text"
            onChange={(event) => setText(event.target.value)}
            value={text}
          />

          <Button
            type="submit"
            variant="contained"
            title="Commenter"
            size="md"
            sx={{ mt: 2, backgroundColor: "#4a4aa3" }}
            endIcon={<SendRoundedIcon />}
          >
            Poster
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FormComment;
