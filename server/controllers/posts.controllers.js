//router
import { Router } from "express";

//mongoose
import mongoose from "mongoose";

//models
import PostMessage from "../models/PostMessage.js";

//router
const router = Router();

export const getPosts = async (req, res) => {
  //variables
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPage: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  //variables
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.status(201).json({ data: posts });
  } catch (error) {
    res.status(404), json({ message: error.message });
  }
};

export const getPostsByCreator = async (req, res) => {
  //variables
  const { name } = req.query;

  try {
    const posts = await PostMessage.find({ name });
    res.status(201).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  //variables
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json({ post: post });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  //variables
  const post = req.body;
  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.messsage });
  }
};

export const updatePost = async (req, res) => {
  //variables
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags, name } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .send(`No se encontro la publicación con el id: ${id}`);
    const updatedPost = {
      title,
      message,
      creator,
      selectedFile,
      tags,
      name,
      createdAt: new Date().toISOString(),
      _id: id,
    };
    await PostMessage.findByIdAndUpdate(id, updatedPost, {
      new: true,
    });
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.messsage });
  }
};

export const deletePost = async (req, res) => {
  //variables
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No se encontro el post con el id: ${id}`);
    await PostMessage.findByIdAndRemove(id);
    res.status(204).json({ message: "Publicación borrada con exito" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  //variables
  const { id } = req.params;

  try {
    if (!req.userId) return res.json({ message: "Sin Autenticar" });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No se encontro el post con el id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      //like
      post.likes.push(req.userId);
    } else {
      //dislike
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409), json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  //variables
  const { id } = req.params;
  const { value } = req.body;

  try {
    const post = await PostMessage.findById(id);
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default router;
