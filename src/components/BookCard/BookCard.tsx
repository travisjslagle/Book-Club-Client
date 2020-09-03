import React from "react";
import { Book } from "../Booklist/Booklist";
import { Card, Button, CardTitle, CardText, Col } from "reactstrap";

interface BookCardProps {
  books: Book[];
  sessionToken: string;
  deleteBook: Function;
}

class BookCard extends React.Component<BookCardProps> {
  constructor(props: BookCardProps) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.books.map((book) => {
          return (
            <Col sm="4">
              <Card key={book.title} body>
                <CardTitle>{book.title}</CardTitle>
                <CardText>
                  <p>
                    By: {book.authorFirst} {book.authorLast}
                  </p>
                  <p>Published: {book.releaseYear}</p>
                </CardText>
                <Button onClick={(e) => this.props.deleteBook(book)}>
                  Delete
                </Button>
              </Card>
            </Col>
          );
        })}
      </>
    );
  }
}

export default BookCard;
