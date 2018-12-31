import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

class ExerciseModal extends Component {
  static initialState = {
    title: "Create New Chapter"
  };

  constructor(props) {
    super(props);
    this.state = ExerciseModal.initialState;
  }
  componentDidUpdate(prevProps) {
    if (this.props.show && !prevProps.show) {
      this.setState(
        Object.assign({}, ExerciseModal.initialState, this.props.data)
      );
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.title}</Modal.Title>
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

ExerciseModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ExerciseModal;
