import React from "react";
import { Thread } from "../Threadlist/Threadlist";
import { User } from "../../App";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Col,
  Form,
  Input,
} from "reactstrap";

export interface Post {
  content: string;
  threadId: number;
  isFlagged: boolean;
  id: number;
  createdBy: number;
}

interface ThreadDetailProps {
  activeThread: Thread;
  currentUser: User;
  deleteThread: Function;
  clearActiveThread: Function;
  sessionToken: string;
}

interface ThreadDetailState {
  posts: Post[];
  newPostContent: string;
}

class ThreadDetail extends React.Component<
  ThreadDetailProps,
  ThreadDetailState
> {
  constructor(props: ThreadDetailProps) {
    super(props);

    this.state = {
      posts: [],
      newPostContent: "",
    };
  }

  fetchPosts = () => {
    fetch(`http://localhost:3001/post/${this.props.activeThread.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ posts: json });
      })
      .catch((err) => console.log(err));
  };

  deletePost = (post: Post) => {
    fetch(`http://localhost:3001/post/delete/${post.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      },
    })
      .then(this.fetchPosts)
      .catch((err) => console.log(err));
  };

  addPost = () => {
    const newPostObj = {
      post: {
        content: this.state.newPostContent,
        threadId: this.props.activeThread.id,
        isFlagged: false,
      },
    };
    fetch("http://localhost:3001/post/create", {
      method: "POST",
      body: JSON.stringify(newPostObj),
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      },
    })
      .then(this.fetchPosts)
      .catch((err) => console.log(err));
  };

  flagPost = (post: Post) => {
    fetch(`http://localhost:3001/post/flagged/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      },
    }).catch((err) => console.log(err));
  };

  handleNewPostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ newPostContent: e.target.value });
  };

  componentDidMount() {
    this.fetchPosts();
  }
  render() {
    return (
      <Col sm="4">
        {this.props.activeThread ? (
          <Button onClick={(e) => this.props.clearActiveThread()}>
            Go back to threads
          </Button>
        ) : null}
        <br />
        <br />
        <Card key={this.props.activeThread.headline} body className="card">
          <CardTitle>{this.props.activeThread.headline}</CardTitle>
          <CardText>
            <p>{this.props.activeThread.originalPost}</p>
            <p>
              Is Flagged?: {!this.props.activeThread.isFlagged ? "Nah" : "Yeah"}
            </p>
          </CardText>
          {this.props.activeThread.createdBy === this.props.currentUser.id ? (
            <Button
              onClick={(e) => {
                this.props.deleteThread(this.props.activeThread);
                this.props.clearActiveThread();
              }}
            >
              Delete This Thread
            </Button>
          ) : null}
        </Card>
        {this.state.posts.map((post) => {
          return (
            <>
              <Card key={post.id} className="card">
                <CardText>
                  <p>{post.content}</p>
                </CardText>
                {post.createdBy === this.props.currentUser.id ? (
                  <Button
                    onClick={(e) => {
                      this.deletePost(post);
                    }}
                  >
                    Delete This Comment
                  </Button>
                ) : null}
                <Button onClick={(e) => this.flagPost(post)}>
                  Flag This Comment
                </Button>
              </Card>
            </>
          );
        })}
        <Form>
          <Input
            type="textarea"
            name="newPost"
            onChange={this.handleNewPostChange}
            value={this.state.newPostContent}
            placeholder="Reply in this thread"
          />
          <Button onClick={this.addPost}>Add Comment</Button>
        </Form>
      </Col>
    );
  }
}

export default ThreadDetail;
