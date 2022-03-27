import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  //Intialising the custom hook to get all the comments from firebase
  const {
    sendRequest: loadAllComments,
    status,
    data: loadedComments,
  } = useHttp(getAllComments);

  const params = useParams();
  const { quoteId } = params;

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    loadAllComments(quoteId);
  }, [quoteId, loadAllComments]);

  //useEffect to load comments at first and whenever a new comment is added
  useEffect(() => {
    loadAllComments(quoteId);
  }, [quoteId, loadAllComments]);

  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }
  if (status === "completed" && loadedComments && loadedComments.length === 0) {
    comments = <div className="centered">No comments added yet</div>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm quoteId={quoteId} addingComment={addedCommentHandler} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
