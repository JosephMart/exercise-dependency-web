import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Table, Button, ButtonToolbar, Breadcrumb } from "react-bootstrap";

class Textbooks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getTextbooks();
  }

  viewTextbook = textbookID => {
    this.props.history.push(`/textbooks/${textbookID}/exercises`);
  };
  render() {
    return (
      <div>
        <h1>Textbooks</h1>
        <hr />
        <Breadcrumb>
          <Breadcrumb.Item active>Textbooks</Breadcrumb.Item>
        </Breadcrumb>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Topics</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.textbooks.map(book => {
              return (
                <tr key={book.id}>
                  <td>
                    <i>{book.name}</i>
                  </td>
                  <td>{String(book.topics)}</td>
                  <td>
                    <ButtonToolbar>
                      <Button
                        bsSize="small"
                        bsStyle="primary"
                        onClick={() => this.viewTextbook(book.id)}
                      >
                        View
                      </Button>
                      <Button bsSize="small" bsStyle="warning">
                        Edit
                      </Button>
                      <Button bsSize="small" bsStyle="danger">
                        Remove
                      </Button>
                    </ButtonToolbar>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

Textbooks.propTypes = {
  getTextbooks: PropTypes.func.isRequired,
  textbooks: PropTypes.arrayOf(PropTypes.shape())
};

Textbooks.defaultProps = {
  textbooks: []
};

export default withRouter(Textbooks);
