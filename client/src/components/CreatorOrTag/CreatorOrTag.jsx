//importaciones
import React, { useEffect } from 'react';

//react-router
import { useParams, useLocation } from 'react-router-dom';

//material-ui
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';

//redux
import { useDispatch, useSelector } from 'react-redux';

//componentes
import Post from '../Posts/Post/Post';

//acciones
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts.actions';

const CreatorOrTag = () => {
  //variables del hook de react-router
  const { name } = useParams();
  const location = useLocation();

  //variables del hook de redux
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  //useEffect
  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getPostsBySearch({ tags: name }));
    } else {
      dispatch(getPostsByCreator(name));
    }
  }, []);

  if (!posts.length && !isLoading) return 'No hay publicaciones';

  return (
    <div>
      <Typography variant="h2">{name.toUpperCase()}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CreatorOrTag;