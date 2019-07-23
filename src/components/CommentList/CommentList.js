import React from "react";
import Comment from "../Comment/Comment";

export default function CommentList(props) {
  const objVal = Object.values(props.comments);

  return (
    <div className="commentlist">
      {Object.values(objVal).map((message, index) => (
        <Comment key={index} message={message} onClick={props.onClick} />
      ))}
    </div>
  );
}
