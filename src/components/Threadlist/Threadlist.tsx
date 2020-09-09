import React from "react";
import { Book } from "../Booklist/Booklist";
import { User } from "../../App";
import ThreadCard from "../ThreadCard/ThreadCard";
import { Button, Form, Input } from "reactstrap";
import ThreadDetail from "../ThreadDetail/ThreadDetail";
import ThreadUpdate from "../ThreadUpdate/ThreadUpdate";
import APIURL from "../../helpers/environment";

interface ThreadlistProps {
  sessionToken: string;
  activeBook: Book;
  currentUser: User;
}

export interface Thread {
  headline: string;
  originalPost: string;
  bookId: number;
  isFlagged: boolean;
  createdBy: number;
  id: number;
}

interface ThreadlistState {
  activeThread: Thread | undefined;
  threads: Thread[];
  addingThread: boolean;
  newHeadline: string;
  newOriginalPost: string;
  threadUpdating: boolean;
  threadToUpdate: Thread | undefined;
}

class Threadlist extends React.Component<ThreadlistProps, ThreadlistState> {
  constructor(props: ThreadlistProps) {
    super(props);

    this.state = {
      activeThread: undefined,
      threads: [],
      addingThread: false,
      newHeadline: "",
      newOriginalPost: "",
      threadUpdating: false,
      threadToUpdate: undefined,
    };
  }

  updateActiveThread = (thread: Thread) => {
    this.setState({ activeThread: thread });
  };

  clearActiveThread = () => {
    this.setState({ activeThread: undefined });
  };

  updateOn = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ threadUpdating: true });
  };

  updateOff = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ threadUpdating: false });
    this.setState({ threadToUpdate: undefined });
  };

  selectThreadToUpdate = (thread: Thread) => {
    this.setState({ threadToUpdate: thread });
  };

  fetchThreads = () => {
    fetch(`${APIURL}/thread/${this.props.activeBook.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ threads: json });
      })
      .catch((err) => console.log(err));
  };

  deleteThread = (thread: Thread) => {
    fetch(`${APIURL}/thread/delete/${thread.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      },
    })
      .then(this.fetchThreads)
      .catch((err) => console.log(err));
  };

  showAddThread = () => {
    const newAddingThread = !this.state.addingThread;
    this.setState({ addingThread: newAddingThread });
  };

  addThread = () => {
    const newThreadObj = {
      thread: {
        headline: this.state.newHeadline,
        originalPost: this.state.newOriginalPost,
        bookId: this.props.activeBook.id,
        isFlagged: false,
      },
    };
    fetch(`${APIURL}/thread/create`, {
      method: "POST",
      body: JSON.stringify(newThreadObj),
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      },
    })
      .then(this.fetchThreads)
      .catch((err) => console.log(err));
  };

  handleHeadlineChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ newHeadline: e.target.value });
  };

  handleOriginalPostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ newOriginalPost: e.target.value });
  };

  componentDidMount() {
    this.fetchThreads();
  }

  render() {
    return (
      <div>
        <Button onClick={this.showAddThread}>Create A New Topic</Button>
        <hr />
        {this.state.addingThread ? (
          <Form>
            <Input
              type="text"
              placeholder="Headline"
              name="headline"
              onChange={this.handleHeadlineChage}
              value={this.state.newHeadline}
            />
            <Input
              type="textarea"
              placeholder="Original Post"
              name="originalPost"
              onChange={this.handleOriginalPostChange}
              value={this.state.newOriginalPost}
            />
            <Button onClick={this.addThread}>Create</Button>
            <hr />
          </Form>
        ) : null}
        {this.state.activeThread ? (
          <ThreadDetail
            activeThread={this.state.activeThread}
            currentUser={this.props.currentUser}
            deleteThread={this.deleteThread}
            clearActiveThread={this.clearActiveThread}
            sessionToken={this.props.sessionToken}
          />
        ) : (
          <ThreadCard
            threads={this.state.threads}
            sessionToken={this.props.sessionToken}
            updateActiveThread={this.updateActiveThread}
            clearActiveThread={this.clearActiveThread}
            deleteThread={this.deleteThread}
            currentUser={this.props.currentUser}
            updateOn={this.updateOn}
            selectThreadToUpdate={this.selectThreadToUpdate}
          />
        )}
        {this.state.threadUpdating ? (
          <ThreadUpdate
            sessionToken={this.props.sessionToken}
            updateOff={this.updateOff}
            // @ts-expect-error
            threadToUpdate={this.state.threadToUpdate}
            fetchThreads={this.fetchThreads}
          />
        ) : (
          <> </>
        )}
      </div>
    );
  }
}

export default Threadlist;
