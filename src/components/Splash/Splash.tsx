import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Row, CardImg } from "reactstrap";
import BookRoot from "../BookRoot/BookRoot";
import { Book } from "../Booklist/Booklist";
import { User } from "../../App";
import Account from "../Account/Account";

interface SplashProps {
  sessionToken: string;
  updateToken: Function;
  setCurrentUser: Function;
  activeBook: Book | undefined;
  updateActiveBook: Function;
  clearActiveBook: Function;
  currentUser: User;
}

class Splash extends React.Component<SplashProps> {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Card>
              <Link to="/">
                <CardImg top width="100%" src="" alt="books" />
                <CardBody>
                  <CardTitle>Enter The Forum</CardTitle>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col>
            <Card>
              <Link to="/account">
                <CardImg top width="100%" src="" alt="books" />
                <CardBody>
                  <CardTitle>Manage My Account</CardTitle>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
        <div>
          <Switch>
            <Route exact path="/">
              <BookRoot
                sessionToken={this.props.sessionToken}
                updateToken={this.props.updateToken}
                setCurrentUser={this.props.setCurrentUser}
                activeBook={this.props.activeBook}
                updateActiveBook={this.props.updateActiveBook}
                clearActiveBook={this.props.clearActiveBook}
                currentUser={this.props.currentUser}
              />
            </Route>
            <Route exact path="/account">
              <Account
                sessionToken={this.props.sessionToken}
                currentUser={this.props.currentUser}
              />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Splash;
