import React from "react";
import { Book } from "../Booklist/Booklist";
import { Button } from "reactstrap";
import { User } from "../../App";
import Threadlist from "../Threadlist/Threadlist";

interface ThreadProps {
  sessionToken: string;
  activeBook: Book | undefined;
  clearActiveBook: Function;
  currentUser: User;
}

class Threads extends React.Component<ThreadProps> {
  render() {
    return (
      <div>
        {this.props.activeBook ? (
          <div>
            <Button onClick={(e) => this.props.clearActiveBook()}>
              Return To Book List
            </Button>
            <h3>Here are the threads for {this.props.activeBook.title}:</h3>
            <Threadlist
              activeBook={this.props.activeBook}
              sessionToken={this.props.sessionToken}
              currentUser={this.props.currentUser}
            />
          </div>
        ) : (
          <div>
            <p>
              Not Sure how you got here... please go home and select a book!
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Threads;
