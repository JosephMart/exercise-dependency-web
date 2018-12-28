import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

class NewExercise extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Text in a modal</h4>
          <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </Modal.Body>
      </Modal>
    );
  }
}

NewExercise.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default NewExercise;
