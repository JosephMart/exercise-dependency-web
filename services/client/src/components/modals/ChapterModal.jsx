import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

class ChapterModal extends Component {
  static initialState = {
    title: "Create New Chapter"
  };

  constructor(props) {
    super(props);
    this.state = ChapterModal.initialState;
  }
  componentDidUpdate(prevProps) {
    if (this.props.show && !prevProps.show) {
      this.setState(
        Object.assign({}, ChapterModal.initialState, this.props.data)
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

ChapterModal.propTypes = {
  onlyEdit: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

ChapterModal.defaultProps = {
  onlyEdit: false
};

export default ChapterModal;
