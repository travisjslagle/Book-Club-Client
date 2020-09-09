import React from "react";
import { Book } from "../Booklist/Booklist";
import { Card, Button, CardTitle, CardText, Col } from "reactstrap";
import { User } from "../../App";

interface BookCardProps {
  books: Book[];
  sessionToken: string;
  deleteBook: Function;
  updateActiveBook: Function;
  currentUser: User;
  updateOn: Function;
  selectBookToUpdate: Function;
}

class BookCard extends React.Component<BookCardProps> {
  render() {
    return (
      <>
        {this.props.books.map((book) => {
          return (
            <Col sm="4">
              <Card key={book.title} body outline color="info" className="card">
                <CardTitle>{book.title}</CardTitle>
                <CardText>
                  <p>
                    By: {book.authorFirst} {book.authorLast}
                  </p>
                  <p>Published: {book.releaseYear}</p>
                </CardText>
                {book.createdBy === this.props.currentUser.id ? (
                  <div>
                    <Button
                      className="smallBtn"
                      onClick={(e) => {
                        this.props.selectBookToUpdate(book);
                        this.props.updateOn();
                      }}
                    >
                      Edit Book Details
                    </Button>
                    <Button
                      className="smallBtn"
                      onClick={(e) => this.props.deleteBook(book)}
                    >
                      Delete This Book
                    </Button>
                  </div>
                ) : null}
                <Button onClick={(e) => this.props.updateActiveBook(book)}>
                  Join The Discussion
                </Button>
              </Card>
              <br />
            </Col>
          );
        })}
      </>
    );
  }
}

export default BookCard;
