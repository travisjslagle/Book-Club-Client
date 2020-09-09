import React from "react";
import { Post } from "../ThreadDetail/ThreadDetail";
import { Card, Button, CardTitle, CardText, Form, Input } from "reactstrap";

interface ModToolsProps {
  sessionToken: string;
}

interface ModToolsState {
  flaggedPosts: Post[];
  showMakeAMod: boolean;
  newModUserId: number;
}

class ModTools extends React.Component<ModToolsProps, ModToolsState> {
  constructor(props: ModToolsProps) {
    super(props);

    this.state = {
      flaggedPosts: [],
      showMakeAMod: false,
      newModUserId: 0,
    };
  }

  toggleMakeAMod = () => {
    const newShowMakeAMod = !this.state.showMakeAMod;
    this.setState({ showMakeAMod: newShowMakeAMod });
  };

  handleNewModUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ newModUserId: parseInt(e.target.value) });
  };

  fetchFlaggedPosts = () => {
    fetch("http://localhost:3001/post/review/allflagged", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ flaggedPosts: json });
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
      .then(this.fetchFlaggedPosts)
      .catch((err) => console.log(err));
  };

  unflagPost = (post: Post) => {
    fetch(`http://localhost:3001/post/unflagged/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      },
    })
      .then(this.fetchFlaggedPosts)
      .catch((err) => console.log(err));
  };

  bestowModPowers = (id: number) => {
    fetch(`http://localhost:3001/user/mod/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchFlaggedPosts();
  }

  render() {
    return (
      <div>
        <h4>Mod Tools</h4>
        <Button onClick={this.toggleMakeAMod}>
          Make Another User a Moderator
        </Button>
        <br />
        {this.state.showMakeAMod ? (
          <div>
            <Form>
              <Input
                name="newModUserId"
                placeholder="New Moderator User ID"
                onChange={this.handleNewModUserIdChange}
                value={this.state.newModUserId}
              />
              <Button
                onClick={(e) => this.bestowModPowers(this.state.newModUserId)}
              >
                Make This User A Mod
              </Button>
            </Form>
          </div>
        ) : null}
        <hr />
        {this.state.flaggedPosts.map((post) => {
          return (
            <>
              <Card key={post.id} body>
                <CardTitle>Post ID: {post.id}</CardTitle>
                <CardText>
                  <p>{post.content}</p>
                </CardText>
                <Button
                  onClick={(e) => {
                    this.deletePost(post);
                  }}
                >
                  Delete This Comment
                </Button>
                <Button
                  onClick={(e) => {
                    this.unflagPost(post);
                  }}
                >
                  Un-Flag This Comment
                </Button>
              </Card>
            </>
          );
        })}
      </div>
    );
  }
}

export default ModTools;
