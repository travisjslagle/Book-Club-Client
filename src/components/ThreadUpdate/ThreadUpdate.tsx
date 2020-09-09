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
import { Thread } from "../Threadlist/Threadlist";

interface ThreadUpdateProps {
  sessionToken: string;
  updateOff: Function;
  threadToUpdate: Thread;
  fetchThreads: Function;
}

interface ThreadUpdateState {
  updateHeadline: string;
  updateOriginalPost: string;
}

class ThreadUpdate extends React.Component<
  ThreadUpdateProps,
  ThreadUpdateState
> {
  constructor(props: ThreadUpdateProps) {
    super(props);

    this.state = {
      updateHeadline: "",
      updateOriginalPost: "",
    };
  }
  handleHeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ updateHeadline: e.target.value });
  };

  handleOriginalPostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ updateOriginalPost: e.target.value });
  };

  setupUpdate = () => {
    this.setState({
      updateHeadline: this.props.threadToUpdate.headline,
      updateOriginalPost: this.props.threadToUpdate.originalPost,
    });
  };

  updateThread = () => {
    const updateThread = {
      thread: {
        headline: this.state.updateHeadline,
        originalPost: this.state.updateOriginalPost,
      },
    };
    fetch(
      `http://localhost:3001/thread/update/${this.props.threadToUpdate.id}`,
      {
        method: "PUT",
        body: JSON.stringify(updateThread),
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.props.sessionToken,
        },
      }
    )
      .then(this.props.updateOff())
      .then(this.props.fetchThreads())
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
                placeholder={this.props.threadToUpdate.headline}
                value={this.state.updateHeadline}
                onChange={this.handleHeadlineChange}
                required
              >
                Edit Headline
              </Input>
              <Input
                name="updateAuthorFirst"
                placeholder={this.props.threadToUpdate.originalPost}
                value={this.state.updateOriginalPost}
                onChange={this.handleOriginalPostChange}
                required
              >
                Edit Original Post
              </Input>
            </FormGroup>
            <Button onClick={(e) => this.props.updateOff()}>
              Cancel Update
            </Button>
            <Button
              onClick={(e) => {
                this.setupUpdate();
                this.updateThread();
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

export default ThreadUpdate;
