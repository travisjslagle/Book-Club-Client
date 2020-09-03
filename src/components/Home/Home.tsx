import React from "react";
import "./Home.css";
import Booklist from "../Booklist/Booklist";

interface HomeProps {
  sessionToken: string;
}

class Home extends React.Component<HomeProps> {
  render() {
    return (
      <div>
        <h2>Welcome to the Home Screen!</h2>
        <img
          id="splashPic"
          src="https://images.unsplash.com/photo-1555116505-38ab61800975?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
          alt="library"
        />
        <Booklist sessionToken={this.props.sessionToken} />
      </div>
    );
  }
}

export default Home;
