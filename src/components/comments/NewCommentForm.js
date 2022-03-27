import { useRef, useEffect } from "react";

import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = ({ quoteId, addingComment }) => {
  const commentTextRef = useRef();
  const { sendRequest: addNewComment, status, error } = useHttp(addComment);

  // Form submit handler to post new comments
  const submitFormHandler = (event) => {
    event.preventDefault();
    const newComment = commentTextRef.current.value;
    addNewComment({ quoteId, commentData: { text: newComment } });
  };

  //Need to rerender whenever there is new comment added and inform the parent component about the update
  useEffect(() => {
    if (status === "completed" && !error) {
      console.log("informed parent");
      addingComment();
    }
  }, [status, error, addingComment]);

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
