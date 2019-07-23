import React, { Fragment, Component } from "react";
import axios from "../../axios-comments";

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",

      comment: {
        message: ""
      }
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
   
        [name]: value
      }
    });
  };

  onSubmit(e) {
    e.preventDefault();

    this.setState({ error: "", loading: true });

    let { comment } = this.state;

    axios
      .post("/comments.json", comment)
      .then(res => res.json())
      .then(res => {
        this.setState({ loading: false });
      })
      .then(res => {
        if (res.error) {
          this.setState({
            loading: false,
            error: res.error
          });
        } else {
          this.props.addComment(comment);

          this.setState({
            loading: false,
            comment: { ...comment, message: "" }
          });
        }
      })
      .catch(err => {
        this.setState({
          error: "Something went wrong while submitting form.",
          loading: false
        });
      });
  }


  renderError() {
    return !this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    return (
      <Fragment>
        <form method="post" onSubmit={this.onSubmit}>
          <div className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.message}
              className="notification-textarea"
              placeholder="Write Your Comment..."
              name="message"
              rows="5"
            />
          </div>

          {this.renderError()}

          <div className="form-group">
            <button disabled={this.state.loading} className="add-comment-btn">
              Add Comment
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}
