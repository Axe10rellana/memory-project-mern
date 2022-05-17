//importaciones
import React, {useEffect} from "react";

//material-ui
import {Pagination, PaginationItem} from "@material-ui/lab";

//react-router
import {Link} from "react-router-dom";

//react-redux
import { useDispatch, useSelector } from "react-redux";

//acciones
import { getPosts } from "../actions/posts.actions";

//estilos css
import useStyles from './styles';

const Paginate = ({page}) => {
  //variables del useStyles
  const classes = useStyles();

  //variables del hook de redux
  const dispatch = useDispatch();
  const {numberOfPage} = useSelector((state) => state.posts);

  //useEffect
  useEffect(() => {
    if(page) dispatch(getPosts(page));
  }, [dispatch, page]);

  return (
    <Pagination 
      classes={{ul: classes.ul}}
      count={numberOfPage}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem 
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;