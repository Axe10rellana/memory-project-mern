//api
import * as api from "../api";

//constantes
import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_BY_CREATOR,
  FETCH_POST,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  START_LOADING,
  END_LOADING,
  COMMENT,
} from "../constants/actionTypes";

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { post },
    } = await api.fetchPost(id);
    //console.info(post);
    dispatch({ type: FETCH_POST, payload: { post } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error(error.message);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data, currentPage, numberOfPage },
    } = await api.fetchPosts(page);
    //console.info(data, currentPage, numberOfPage);
    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPage },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error(error.message);
  }
};

export const getPostsByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    //console.info(data);
    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPosts(post);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.error(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  //variables
  const user = JSON.parse(localStorage.getItem("profile"));

  try {
    const { data } = await api.likePost(id, user?.token);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.error(error.message);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  //variables
  try {
    const { data } = await api.comment(value, id);
    //console.info(data);
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.error(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.error(error.message);
  }
};
