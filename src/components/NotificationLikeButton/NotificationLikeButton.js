import React from 'react';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NotificationLikeButton = (props) => {
  let liked;

  if(props.isLiked) {
    liked = "You liked it"
  } else {
    liked = "Like"
  }

    return (
      <button className="notification-item-button like-btn" onClick={props.onClick}>
       <FontAwesomeIcon icon={faThumbsUp} />{liked}
      </button>
    );
}
export default NotificationLikeButton;