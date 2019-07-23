import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import NotificationLikeButton from "../NotificationLikeButton/NotificationLikeButton";
import NotificationCommentButton from "../NotificationCommentButton/NotificationCommentButton";
import CommentForm from "../CommentForm/CommentForm";
import CommentList from "../CommentList/CommentList";
import axios from "../../axios-comments";

export default class NotificationItem extends Component {
  state = {
    likeCounter: 0,
    isLiked: false,
    commentCounter: 0,
    comments: [],
    loading: false,
    isDisplayed: false
  };

  componentWillMount() {
    axios.get("https://fir-comm.firebaseio.com/comments.json").then(res => {
      const comments = res.data;
      const commentCounter = Object.keys(comments).length;
      this.setState({
        comments,
        commentCounter
      });
      console.log(comments)
    });


    
  }

  componentDidUpdate() {
    axios.get("https://fir-comm.firebaseio.com/comments.json").then(res => {
      const comments = res.data;
      const commentCounter = Object.keys(comments).length;
      this.setState({
        comments,
        commentCounter
      });
    });
  }

  handleLikeCounter = () => {
    const { likeCounter, isLiked } = this.state;

    this.setState({
      likeCounter: likeCounter + 1,
      isLiked: true
    });

    if (isLiked) {
      this.setState({
        likeCounter: likeCounter - 1,
        isLiked: false
      });
    } else {
      this.setState({
        likeCounter: likeCounter + 1,
        isLiked: true
      });
    }
  };

  handleCommentBox = () => {
    this.setState({
      isDisplayed: !this.state.isDisplayed
    });
  };

  handleDeleteComment = index => {
    axios.delete("/orders.json").then(res => {
      const comments = Object.keys(this.state.comments).filter(
        comment => comment.id !== index
      );
      this.setState({ comments: comments });
    });
  };

  addComment(comment) {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
  }

  render() {
    const {
      likeCounter,
      commentCounter,
      isLiked,
      isDisplayed,
      comments
    } = this.state;
    return (
      <Fragment>
        <div className="notification-item">
          <div className="notification-item-header">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="notification-item-avatar"
            />
            <span className="notification-item-username">John Doe</span>
          </div>
          <div className="notification-item-content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              ducimus officiis repellat unde facere et error minus dicta animi,
              eos iste iure ab illo. Molestias recusandae aliquid eligendi
              provident repellat. ;) :P :D
            </p>
            <span className="notification-item-like-counter">
              Likes: {likeCounter}
              <br />
              Comments: {commentCounter}
            </span>
          </div>
          <div className="notification-items-buttons">
            <NotificationLikeButton
              onClick={this.handleLikeCounter}
              isLiked={isLiked}
            />
            <NotificationCommentButton onClick={this.handleCommentBox} />
          </div>
        </div>
        {isDisplayed ? <CommentForm addComment={this.addComment} /> : null}
        <CommentList comments={comments} onClick={this.handleDeleteComment} />
      </Fragment>
    );
  }
}
