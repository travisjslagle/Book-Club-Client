import React from "react";
import { Thread } from "../Threadlist/Threadlist";
import { Card, Button, CardTitle, CardText, Col } from "reactstrap";
import { User } from "../../App";
// import { threadId } from "worker_threads";
// import { userInfo } from "os";

interface ThreadCardProps {
  threads: Thread[];
  sessionToken: string;
  updateActiveThread: Function;
  clearActiveThread: Function;
  deleteThread: Function;
  currentUser: User;
  updateOn: Function;
  selectThreadToUpdate: Function;
}

class ThreadCard extends React.Component<ThreadCardProps> {
  render() {
    return (
      <>
        {this.props.threads.map((thread) => {
          return (
            <Col sm="4">
              <Card key={thread.id} body>
                <CardTitle>{thread.headline}</CardTitle>
                <CardText>
                  <p>{thread.originalPost}</p>
                  <p>Is Flagged?: {!thread.isFlagged ? "Nah" : "Yeah"}</p>
                </CardText>
                <Button onClick={(e) => this.props.updateActiveThread(thread)}>
                  Reply
                </Button>
                {thread.createdBy === this.props.currentUser.id ? (
                  <div>
                    <Button
                      onClick={(e) => {
                        this.props.selectThreadToUpdate(thread);
                        this.props.updateOn();
                      }}
                    >
                      Edit Thread
                    </Button>
                    <Button onClick={(e) => this.props.deleteThread(thread)}>
                      Delete This Thread
                    </Button>
                  </div>
                ) : null}
              </Card>
            </Col>
          );
        })}
      </>
    );
  }
}

export default ThreadCard;
