//importaciones
import React, { useState } from "react";

//react-redux
import { useDispatch } from "react-redux";

//material-ui
import {
  Grow,
  Grid,
  Container,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

//react-router
import { useNavigate, useLocation } from "react-router-dom";

//componentes
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";

//actions
import { getPostsBySearch } from "../../actions/posts.actions";

//estilos css
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  //variables de estado
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  //variable del hook de react-redux
  const dispatch = useDispatch();

  //variable del hook de react-router
  const navigate = useNavigate();

  //variable del useStyles
  const classes = useStyles();

  //variables
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  //funciones
  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item={true} xs={12} sm={12} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item={true} xs={12} sm={12} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Buscar Memorias"
                autoComplete="off"
                fullWidth
                value={search}
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(tag) => handleAdd(tag)}
                onDelete={(tag) => handleDelete(tag)}
                label="Buscar etiquetas"
                variant="outlined"
              />
              <Button onClick={searchPost} color="primary" variant="contained">
                Buscar
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
