import React from "react";
import { User } from "../../App";
// import { Thread } from "../Threadlist/Threadlist";
import { Book } from "../Booklist/Booklist";
import { Post } from "../ThreadDetail/ThreadDetail";

interface AccountProps {
  sessionToken: string;
  currentUser: User;
}

interface AccountState {
  userBooks: Book[];
}

class Account extends React.Component<AccountProps, AccountState> {
  constructor(props: AccountProps) {
    super(props);

    this.state = {
      userBooks: [],
    };
  }

  fetchUsersBooks = () => {
    fetch("http://localhost:3001/book/mine", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ userBooks: json });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchUsersBooks();
  }

  render() {
    return (
      <div>
        <h2>Your Account</h2>
        <div>
          <h3>Hello, {this.props.currentUser.username}</h3>
        </div>
      </div>
    );
  }
}

export default Account;
