import React, {Fragment} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function Comment(props) {
  const { message } = props.message;

  return (
    <Fragment>
      <div className="comment">
        <div className="comment-header">
          <h3>Comments</h3>
          <FontAwesomeIcon icon={faTrashAlt} className="comment-header-delete" onClick={props.onClick}/>
        </div>
        <ul className="comment-list">
          <li className="comment-list-item">{message}</li>
        </ul>
      </div>
    </Fragment>
  );
}
