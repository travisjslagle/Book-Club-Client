import React from "react";
import { Card, CardTitle, CardText, Col } from "reactstrap";
import { Book } from "../Booklist/Booklist";

interface AccountCardProps {
  userBooks: Book[];
}

class AccountCard extends React.Component<AccountCardProps> {
  render() {
    return (
      <>
        {this.props.userBooks.map((book) => {
          return (
            <Col>
              <Card key={book.title} body>
                <CardTitle>{book.title}</CardTitle>
                <CardText>
                  <p>
                    By: {book.authorFirst} {book.authorLast}
                  </p>
                  <p>Published: {book.releaseYear}</p>
                </CardText>
              </Card>
            </Col>
          );
        })}
      </>
    );
  }
}
export default AccountCard;
