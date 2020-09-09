import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Book } from "../Booklist/Booklist";

interface BookUpdateProps {
  sessionToken: string;
  updateOff: Function;
  bookToUpdate: Book | undefined;
  fetchBooks: Function;
}

interface BookUpdateState {
  updateTitle: string;
  updateAuthorFirst: string;
  updateAuthorLast: string;
  updateReleaseYear: string;
}

class BookUpdate extends React.Component<BookUpdateProps, BookUpdateState> {
  constructor(props: BookUpdateProps) {
    super(props);

    this.state = {
      updateTitle: "",
      updateAuthorFirst: "",
      updateAuthorLast: "",
      updateReleaseYear: "",
    };
  }

  handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ updateTitle: e.target.value });
  };

  handleAuthorFirstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ updateAuthorFirst: e.target.value });
  };

  handleAuthorLastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ updateAuthorLast: e.target.value });
  };

  handleReleaseYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ updateReleaseYear: e.target.value });
  };

  setupUpdate = () => {
    this.setState({
      // @ts-expect-error
      updateTitle: this.props.bookToUpdate?.title,
      // @ts-expect-error
      updateAuthorLast: this.props.bookToUpdate?.authorLast,
      // @ts-expect-error
      updateAuthorFirst: this.props.bookToUpdate?.authorFirst,
      // @ts-expect-error
      updateReleaseYear: this.props.bookToUpdate?.releaseYear,
    });
  };

  updateBook = () => {
    const updateBook = {
      book: {
        title: this.state.updateTitle,
        authorLast: this.state.updateAuthorLast,
        authorFirst: this.state.updateAuthorFirst,
        releaseYear: this.state.updateReleaseYear,
      },
    };
    // @ts-expect-error  -- activeBook will not be undefined if this component has mounted
    fetch(`http://localhost:3001/book/update/${this.props.bookToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify(updateBook),
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      },
    })
      .then(this.props.updateOff())
      .then(this.props.fetchBooks())
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Modal isOpen={true}>
        <ModalHeader closeButton>Edit Book Details</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                name="updateTitle"
                placeholder={this.props.bookToUpdate?.title}
                value={this.state.updateTitle}
                onChange={this.handleTitleChange}
                required
              >
                Edit Title
              </Input>
              <Input
                name="updateAuthorFirst"
                placeholder={this.props.bookToUpdate?.authorFirst}
                value={this.state.updateAuthorFirst}
                onChange={this.handleAuthorFirstChange}
                required
              >
                Edit Author First Name
              </Input>
              <Input
                name="updateAuthorLast"
                placeholder={this.props.bookToUpdate?.authorLast}
                value={this.state.updateAuthorLast}
                onChange={this.handleAuthorLastChange}
                required
              >
                Edit Author Last Name
              </Input>
              <Input
                name="updateReleaseYear"
                placeholder="Release Year"
                value={this.state.updateReleaseYear}
                onChange={this.handleReleaseYearChange}
                required
              >
                Edit Release Year
              </Input>
            </FormGroup>
            <Button onClick={(e) => this.props.updateOff()}>
              Cancel Update
            </Button>
            <Button
              onClick={(e) => {
                this.setupUpdate();
                this.updateBook();
              }}
            >
              Update Details
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default BookUpdate;
