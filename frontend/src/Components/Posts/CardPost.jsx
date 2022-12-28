import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteOnePost } from "../../features/posts/postsSlice"; // Posts Store
import { getAllComments } from "../../features/comments/commentSlice"; // Comments Store

// Components
import CardComment from "../Comments/CardComment";
import FormComment from "../Comments/FormComment";

// CSS
import Moment from "react-moment"; // Date format
import "moment-timezone";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { pink } from "@mui/material/colors";
import {
  Container,
  Button,
  Card,
  Typography,
  Box,
  Stack,
  CardMedia,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

const CardPost = ({ post }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const PostId = post.id;

  const { comments, isError, message } = useSelector((state) => state.comments);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getAllComments(PostId));
  }, [dispatch, PostId, isError, message]);

  return (
    <Container>
      <Box
        m={2}
        p={2}
        display="flex"
        direction="column"
        justifyContent="center"
      >
        <Card
          sx={{ maxWidth: "90%", minWidth: "90vw", margin: "0", padding: "0" }}
        >
          <div>
            <header className="cardheader">
              <Stack
                sx={{ alignItems: "center" }}
                direction="row"
                spacing={1}
                className="userInfo"
              >
                {post.UserId === user.userId || user.isAdmin === true ? (
                  <Button
                    size="small"
                    type="button"
                    onClick={() => dispatch(deleteOnePost(post.id))}
                    title="supprimer le post"
                    aria-label="Supprimer le post"
                  >
                    <DeleteForeverRoundedIcon
                      sx={{ color: pink[500] }}
                      fontSize="small"
                    />
                  </Button>
                ) : null}
                <CardMedia
                  sx={{
                    objectFit: "contain",
                    maxHeight: "8vh",
                    width: "auto",
                    marginRight: 3,
                  }}
                  component="img"
                  loading="lazy"
                  image={post.avatar}
                  crossOrigin="anonymous"
                  alt="card-pic"
                  className="user_picture"
                />
                <Typography
                  label={'margin="normal"'}
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  fontWeight="bold"
                >
                  {post.firstName}
                </Typography>
                <Typography
                  label={'margin="normal"'}
                  sx={{ fontSize: 16 }}
                  fontWeight="bold"
                  color="text.secondary"
                >
                  {post.lastName}
                </Typography>
                <Box justifyContent="flex-end">
                  <Typography
                    label={'margin="normal"'}
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    align="right"
                  >
                    Posté le:
                    <Moment format="DD/MM/YYYY">{post.createdAt}</Moment>
                  </Typography>
                </Box>
              </Stack>
            </header>
            {post.imageUrl ? (
              <CardMedia
                sx={{ padding: 0, objectFit: "contain" }}
                component="img"
                loading="lazy"
                image={post.imageUrl}
                crossOrigin="anonymous"
                alt="shared picture"
                className="post_picture"
              />
            ) : null}
            <Box
              sx={{
                textAlign: "center",
                m: 1,
                fontWeight: "medium",
                fontSize: 18,
              }}
            >
              <Typography label={'margin="normal"'}>{post.content}</Typography>
            </Box>
          </div>
          <Typography textAlign="center" variant="h7" component="div">
            <Button
              aria-label="show comment section"
              onClick={() => setShow((prev) => !prev)}
            >
              <MarkChatUnreadIcon fontSize="small" />
            </Button>
            Afficher commentaires
          </Typography>
          {show && (
            <div>
              <div>
                <FormComment PostId={PostId} />
              </div>
              <div>
                {comments.length > 0 ? (
                  <div className="comments">
                    {comments.map((id) => (
                      <div key={id}>
                        <CardComment post={post} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Typography>Aucun commentaire pour le moment..</Typography>
                )}
              </div>
            </div>
          )}
        </Card>
      </Box>
    </Container>
  );
};

export default CardPost;
