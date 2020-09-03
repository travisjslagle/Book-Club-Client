import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

interface AppState {
  sessionToken: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sessionToken: "",
    };
  }

  updateToken = (newToken: string): void => {
    localStorage.setItem("token: ", newToken);
    this.setState({ sessionToken: newToken });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
        </Router>
        {/* <Home sessionToken={this.state.sessionToken} /> */}
        {this.state.sessionToken ? (
          <Home sessionToken={this.state.sessionToken} />
        ) : (
          <Auth updateToken={this.updateToken} />
        )}
      </div>
    );
  }
}

export default App;
