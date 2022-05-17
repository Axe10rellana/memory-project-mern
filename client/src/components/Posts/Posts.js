//importaciones
import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

//componentes
import Post from "./Post/Post";

//estilos
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  //variables del hook de redux useSelector
  const { posts, isLoading } = useSelector((state) => state.posts);

  //variables del useStyles
  const classes = useStyles();

  if (!posts?.length && !isLoading) return "No existe la publicación";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
