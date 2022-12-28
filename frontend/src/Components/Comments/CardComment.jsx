import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { user, reset } from "../../features/auth/authSlice";
import { deleteComment } from "../../features/comments/commentSlice";

// CSS
import Moment from "react-moment"; // Date format
import "moment-timezone";
import { pink } from "@mui/material/colors";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {
  Box,
  Divider,
  Button,
  Card,
  Typography,
  Container,
} from "@mui/material";

const CardComment = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); //User data from Store

  return (
    <Container sx={{ minWidth: "100%" }}>
      <Divider />
      <Container sx={{ m: 0, p: 0 }}>
        {post.Comments.map((comment) => {
          return (
            <Box>
              <Card
                sx={{
                  minWidth: "100%",
                  mt: 1,
                  mb: 1,
                  border: 0.5,
                  borderColor: "#DEE9FC",
                  "&.MuiContainer-root": {
                    margin: "0",
                    padding: "0",
                  },
                }}
                m={2}
                p={2}
                key={comment.id}
              >
                <Box
                  sx={{
                    maxHeight: "20vh",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {comment.UserId === user.userId || user.isAdmin === true ? (
                    <Button
                      size="small"
                      type="button"
                      onClick={() => dispatch(deleteComment(comment.id))}
                      title="supprimer le post"
                      aria-label="Supprimer le post"
                    >
                      <DeleteForeverRoundedIcon
                        sx={{ color: pink[500] }}
                        fontSize="small"
                      />
                    </Button>
                  ) : null}
                  <Typography
                    m={2}
                    sx={{
                      fontSize: "lg",
                      fontWeight: "bold",
                    }}
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    {comment.firstName} {comment.lastName}
                  </Typography>
                  <Box sx={{ justifyContent: "flex-end" }}>
                    <Typography
                      label={'margin="normal"'}
                      fontSize="medium"
                      color="text.secondary"
                      margin={1}
                    >
                      Posté le:
                      <Moment format="DD/MM/YYYY">{comment.createdAt}</Moment>
                    </Typography>
                  </Box>
                </Box>
                <Typography fontSize={"1.1rem"} m={2}>
                  {comment.text}
                </Typography>
              </Card>
            </Box>
          );
        })}
      </Container>
    </Container>
  );
};

export default CardComment;
