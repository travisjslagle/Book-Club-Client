import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Book } from "./components/Booklist/Booklist";
import Header from "./components/Header/Header";
import Splash from "./components/Splash/Splash";

interface AppState {
  sessionToken: string;
  activeBook: Book | undefined;
  currentUser: User;
}

export interface User {
  id: number;
  username: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sessionToken: "",
      activeBook: undefined,
      currentUser: {
        id: 3,
        username: "Default",
      },
    };
  }

  updateToken = (newToken: string): void => {
    localStorage.setItem("token: ", newToken);
    this.setState({ sessionToken: newToken });
  };

  updateActiveBook = (book: Book) => {
    this.setState({ activeBook: book });
  };

  clearActiveBook = () => {
    this.setState({ activeBook: undefined });
  };

  setCurrentUser = (user: User) => {
    this.setState({ currentUser: user });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Splash
            sessionToken={this.state.sessionToken}
            updateToken={this.updateToken}
            setCurrentUser={this.setCurrentUser}
            activeBook={this.state.activeBook}
            updateActiveBook={this.updateActiveBook}
            clearActiveBook={this.clearActiveBook}
            currentUser={this.state.currentUser}
          />
        </Router>
      </div>
    );
  }
}

export default App;
