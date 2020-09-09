import React from "react";
import { Form, Label, Input, Button } from "reactstrap";
import "./Auth.css";
import APIURL from "../../helpers/environment";

interface AuthProps {
  updateToken: Function;
  setCurrentUser: Function;
}

interface AuthState {
  username: string;
  email: string;
  password: string;
  login: boolean;
}

class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    const initialState = {
      username: "",
      email: "",
      password: "",
      login: true,
    };
    this.state = initialState;
  }

  toggleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({ login: !this.state.login });
  };

  handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.setState({ username: event.target.value });
  };

  handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.setState({ password: event.target.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url: string = this.state.login
      ? `${APIURL}/user/login`
      : `${APIURL}/user/create`;

    const userPayload = {
      user: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      },
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(userPayload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.props.updateToken(json.sessionToken);
        const newCurrentUser = {
          id: json.user.id,
          username: json.user.username,
          isModerator: json.user.isModerator,
        };
        this.props.setCurrentUser(newCurrentUser);
      });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>
            {this.state.login
              ? "Login to your Account"
              : "Sign Up for an Account"}
          </h2>
          <Form onSubmit={this.handleSubmit}>
            <div className="username">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                name="username"
                onChange={this.handleUsernameChange}
                value={this.state.username}
              />
            </div>
            {!this.state.login ? (
              <div className="email">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  onChange={this.handleEmailChange}
                  value={this.state.email}
                />
              </div>
            ) : null}
            <div className="password">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                onChange={this.handlePasswordChange}
                value={this.state.password}
              />
            </div>
            <div className="submit">
              <Button className="authButton" type="submit">
                Submit Info
              </Button>
              <Button className="authButton" onClick={this.toggleLogin}>
                {this.state.login ? "Switch to Sign Up" : "Switch to Login"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Auth;
