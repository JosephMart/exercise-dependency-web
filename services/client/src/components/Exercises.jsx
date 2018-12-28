import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import SortableTree from "react-sortable-tree";
import {
  ButtonGroup,
  Button,
  DropdownButton,
  MenuItem,
  ButtonToolbar
} from "react-bootstrap";

import "react-sortable-tree/style.css";
import NewExercise from "./modals/NewExercise";
import NewChapter from "./modals/NewChapter";

// Dropdown Constants
const ADD_CHAPTER = 1;
const ADD_EXERCISE = 2;

class Exercises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newExerciseVisible: false,
      newChapterVisible: false
    };
  }

  componentDidMount() {
    this.props.getExercises(this.props.match.params.textbookID);
  }

  validModal(name) {
    return ["newExercise", "newChapter"].includes(name);
  }

  hideModal = name => {
    if (!this.validModal(name)) {
      console.error(`${name} is not a valid modal name`);
    }
    this.setState({
      [`${name}Visible`]: false
    });
  };

  showModal = name => {
    if (!this.validModal(name)) {
      console.error(`${name} is not a valid modal name`);
    }
    this.setState({
      [`${name}Visible`]: true
    });
  };

  handleAddDropdown = e => {
    switch (e) {
      case ADD_EXERCISE:
        return this.showModal("newExercise");
      case ADD_CHAPTER:
        return this.showModal("newChapter");
      default:
        console.error(`No modal for key ${e}`);
    }
  };

  render() {
    const modals = [
      <NewExercise
        key="addExercise"
        show={this.state.newExerciseVisible}
        handleClose={() => {
          this.hideModal("newExercise");
        }}
      />,
      <NewChapter
        key="addChapter"
        show={this.state.newChapterVisible}
        handleClose={() => {
          this.hideModal("newChapter");
        }}
      />
    ];
    return (
      <div>
        <h1>Exercises</h1>
        <hr />
        <ButtonToolbar>
          <ButtonGroup>
            <Button bsSize="small" bsStyle="success" onClick={() => {}}>
              Commit
            </Button>
            <Button bsSize="small" bsStyle="info" onClick={() => {}}>
              View Diff
            </Button>
            <Button
              bsSize="small"
              bsStyle="warning"
              onClick={this.props.undoTree}
            >
              Undo
            </Button>
            <Button
              bsSize="small"
              bsStyle="danger"
              onClick={this.props.resetTree}
            >
              Reset
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <DropdownButton
              title="Add"
              id="add-item"
              onSelect={this.handleAddDropdown}
            >
              <MenuItem eventKey={ADD_CHAPTER}>Chapter</MenuItem>
              <MenuItem eventKey={ADD_EXERCISE}>Exercise</MenuItem>
            </DropdownButton>
          </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar>
          <ButtonGroup>
            <Button
              bsSize="small"
              bsStyle="primary"
              onClick={() => this.props.toggleNodeExpansion(true)}
            >
              Expand All
            </Button>
            <Button
              bsSize="small"
              bsStyle="default"
              onClick={() => this.props.toggleNodeExpansion(false)}
            >
              Collapse all
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <div style={{ height: 1000 }}>
          <SortableTree
            treeData={this.props.treeData}
            onChange={this.props.handleTreeChange}
          />
        </div>
        {modals}
      </div>
    );
  }
}

Exercises.propTypes = {
  treeData: PropTypes.arrayOf(PropTypes.shape()),
  getExercises: PropTypes.func.isRequired,
  handleTreeChange: PropTypes.func.isRequired,
  toggleNodeExpansion: PropTypes.func.isRequired,
  resetTree: PropTypes.func.isRequired,
  undoTree: PropTypes.func.isRequired
};

Exercises.defaultProps = {
  treeData: []
};

export default withRouter(Exercises);
