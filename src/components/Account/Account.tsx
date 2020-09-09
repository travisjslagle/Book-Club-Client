import React from "react";
import { User } from "../../App";
import { Book } from "../Booklist/Booklist";
import AccountCard from "../AccountCard/AccountCard";
import { Button } from "reactstrap";
import ModTools from "../ModTools/ModTools";
import APIURL from "../../helpers/environment";

interface AccountProps {
  sessionToken: string;
  currentUser: User;
}

interface AccountState {
  userBooks: Book[];
  showModTools: boolean;
}

class Account extends React.Component<AccountProps, AccountState> {
  constructor(props: AccountProps) {
    super(props);

    this.state = {
      userBooks: [],
      showModTools: false,
    };
  }

  toggleModTools = () => {
    const newShowModTools = !this.state.showModTools;
    this.setState({ showModTools: newShowModTools });
  };

  fetchUsersBooks = () => {
    fetch(`${APIURL}/book/mine`, {
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
          {this.props.currentUser.isModerator ? (
            <Button onClick={this.toggleModTools}>Toggle Mod Tools View</Button>
          ) : null}
          {this.state.showModTools ? (
            <ModTools sessionToken={this.props.sessionToken} />
          ) : (
            <div>
              <p>Here are your books:</p>
              <AccountCard userBooks={this.state.userBooks} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Account;
