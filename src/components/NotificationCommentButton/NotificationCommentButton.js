import React from "react";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotificationCommentButton(props) {

  return (
    <button
      className="notification-item-button comment-btn"
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={faComments} /> Comment
    </button>
  );
}
