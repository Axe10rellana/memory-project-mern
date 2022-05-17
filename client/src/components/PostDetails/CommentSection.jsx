//importaciones
import React, {useState, useRef} from 'react';

//material-ui
import {Typography, TextField, Button} from "@material-ui/core";

//react-redux
import {useDispatch} from "react-redux";

//acciones
import {commentPost} from "../../actions/posts.actions";

//estilos css
import useStyles from "./styles";

const CommentSection = ({post}) => {
  //variables de useStyles
  const classes = useStyles();

  //variables de estado
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');

  //variables del hook de redux
  const dispatch = useDispatch();

  //variables del useRef
  const commentsRef = useRef();

  //variables
  const user = JSON.parse(localStorage.getItem('profile'));

  //funciones
  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComment('');
    setComments(newComments);
    commentsRef.current.scrollIntoView({behavior: 'smooth'});
  };

  return (
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comentarios</Typography>
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef}/>
        </div>
        {user?.result?.name && (
          <div className={classes.comments}>
            <Typography gutterBottom variant="h6">Escribe un comentario</Typography>
            <TextField 
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comentario"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button style={{marginTop: '10px'}} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleClick}>
              Comentar
            </Button>
          </div>
        )}
      </div>
  )
}

export default CommentSection;
