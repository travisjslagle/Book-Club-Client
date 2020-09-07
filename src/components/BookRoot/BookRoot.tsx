import React from "react";
import Auth from "../Auth/Auth";
import Threads from "../Threads/Threads";
import Home from "../Home/Home";
import { Book } from "../Booklist/Booklist";
import { User } from "../../App";

interface BookRootProps {
  sessionToken: string;
  updateToken: Function;
  setCurrentUser: Function;
  activeBook: Book | undefined;
  updateActiveBook: Function;
  clearActiveBook: Function;
  currentUser: User;
}

class BookRoot extends React.Component<BookRootProps> {
  render() {
    return (
      <div>
        {!this.props.sessionToken ? (
          <Auth
            updateToken={this.props.updateToken}
            setCurrentUser={this.props.setCurrentUser}
          />
        ) : this.props.activeBook ? (
          <Threads
            sessionToken={this.props.sessionToken}
            activeBook={this.props.activeBook}
            clearActiveBook={this.props.clearActiveBook}
            currentUser={this.props.currentUser}
          />
        ) : (
          <Home
            sessionToken={this.props.sessionToken}
            updateActiveBook={this.props.updateActiveBook}
            currentUser={this.props.currentUser}
          />
        )}
      </div>
    );
  }
}

export default BookRoot;
