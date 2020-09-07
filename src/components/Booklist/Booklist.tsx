import React from "react";
import { Row, Button, Form, Input } from "reactstrap";
import BookCard from "../BookCard/BookCard";
import { User } from "../../App";

interface BookProps {
  sessionToken: string;
  updateActiveBook: Function;
  currentUser: User;
}

export interface Book {
  title: string;
  authorLast: string;
  authorFirst: string;
  releaseYear: number;
  createdBy: number;
  id: number;
}

interface BookState {
  books: Book[];
  addingBook: boolean;
  newTitle: string;
  newAuthorLast: string;
  newAuthorFirst: string;
  newReleaseYear: number;
}

class Booklist extends React.Component<BookProps, BookState> {
  constructor(props: BookProps) {
    super(props);

    this.state = {
      books: [],
      addingBook: false,
      newTitle: "",
      newAuthorLast: "",
      newAuthorFirst: "",
      newReleaseYear: 0,
    };
  }

  bookUrl = "http://localhost:3001/book/";
  fetchBooks = () => {
    fetch(this.bookUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ books: json });
      })
      .catch((err) => console.log(err));
  };

  deleteBook = (book: Book) => {
    console.log("Deleting: ", book.id);
    fetch(`http://localhost:3001/book/delete/${book.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      },
    })
      .then(this.fetchBooks)
      .catch((err) => console.log(err));
  };

  showAddBook = () => {
    const newAddingBook = !this.state.addingBook;
    this.setState({ addingBook: newAddingBook });
  };

  handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ newTitle: e.target.value });
  };

  handleAuthorFirstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ newAuthorFirst: e.target.value });
  };

  handleAuthorLastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ newAuthorLast: e.target.value });
  };

  handleReleaseYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const convertedYear = parseInt(e.target.value);
    this.setState({ newReleaseYear: convertedYear });
  };

  addBook = () => {
    const newBookObj = {
      book: {
        title: this.state.newTitle,
        authorLast: this.state.newAuthorLast,
        authorFirst: this.state.newAuthorFirst,
        releaseYear: this.state.newReleaseYear,
        createdBy: this.props.currentUser.id,
      },
    };
    fetch("http://localhost:3001/book/create", {
      method: "POST",
      body: JSON.stringify(newBookObj),
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      },
    })
      .then(this.fetchBooks)
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchBooks();
  }

  render() {
    return (
      <div>
        <Row>
          <h3>Here are the books people are talking about:</h3>
          <Button onClick={this.showAddBook}>Add A Book</Button>
          <hr />
          {this.state.addingBook ? (
            <Form>
              <Input
                type="text"
                placeholder="Book Title"
                name="title"
                onChange={this.handleTitleChange}
                value={this.state.newTitle}
              />
              <Input
                type="text"
                placeholder="Author First Name"
                name="authorFirst"
                onChange={this.handleAuthorFirstChange}
                value={this.state.newAuthorFirst}
              />
              <Input
                type="text"
                placeholder="Author Last Name"
                name="authorLast"
                onChange={this.handleAuthorLastChange}
                value={this.state.newAuthorLast}
              />
              <Input
                type="text"
                placeholder="Year Published"
                name="releaseYear"
                onChange={this.handleReleaseYearChange}
                value={this.state.newReleaseYear}
              />
              <Button onClick={this.addBook}>Add</Button>
            </Form>
          ) : null}
          <BookCard
            books={this.state.books}
            sessionToken={this.props.sessionToken}
            deleteBook={this.deleteBook}
            updateActiveBook={this.props.updateActiveBook}
            currentUser={this.props.currentUser}
          />
        </Row>
      </div>
    );
  }
}

export default Booklist;
