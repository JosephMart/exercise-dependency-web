import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import JSONTree from "react-json-tree";
import {
  ButtonGroup,
  Button,
  DropdownButton,
  MenuItem,
  ButtonToolbar
} from "react-bootstrap";

import ExerciseModal from "./modals/ExerciseModal";
import ChapterModal from "./modals/ChapterModal";

import "./Exercises.scss";
import CustomSortableTree from "./CustomSortableTree";

// Dropdown Constants
const ADD_CHAPTER = 1;
const ADD_EXERCISE = 2;

class Exercises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseModalVisible: false,
      exerciseModalData: {},
      chapterModalData: {},
      chapterModalVisible: false
    };
  }

  componentDidMount() {
    this.props.getExercises(this.props.match.params.textbookID);
  }

  validModal(name) {
    return ["exerciseModal", "chapterModal"].includes(name);
  }

  hideModal = name => {
    if (!this.validModal(name)) {
      console.error(`${name} is not a valid modal name`);
    }
    this.setState({
      [`${name}Visible`]: false
    });
  };

  showModal = (name, d) => {
    if (!this.validModal(name)) {
      console.error(`${name} is not a valid modal name`);
    }
    this.setState({
      [`${name}Visible`]: true,
      [`${name}Data`]: d === undefined ? {} : d
    });
  };

  handleAddDropdown = e => {
    switch (e) {
      case ADD_EXERCISE:
        return this.showModal("exerciseModal");
      case ADD_CHAPTER:
        return this.showModal("chapterModal");
      default:
        console.error(`No modal for key ${e}`);
    }
  };

  hideChapterModal = () => this.hideModal("chapterModal");
  hideExerciseModal = () => this.hideModal("exerciseModal");

  render() {
    return (
      <div id="Exercises">
        <h1>Exercises</h1>
        <hr />
        <JSONTree
          data={this.props.treeData}
          getItemString={(type, data, itemType, itemString) => {
            return <span className="new-exercise">{data.title}</span>;
          }}
          valueRenderer={raw => <em className="new-exercise">{raw}</em>}
          labelRenderer={raw => (
            <span className="new-exercise">{`${raw[0]}:`}</span>
          )}
          shouldExpandNode={(keyName, data, level) => level % 2 === 0}
          theme={{
            scheme: "chalk",
            author: "chris kempson (http://chriskempson.com)",
            base00: "#151515",
            base01: "#202020",
            base02: "#303030",
            base03: "#505050",
            base04: "#b0b0b0",
            base05: "#d0d0d0",
            base06: "#e0e0e0",
            base07: "#f5f5f5",
            base08: "#fb9fb1",
            base09: "#eda987",
            base0A: "#ddb26f",
            base0B: "#acc267",
            base0C: "#12cfc0",
            base0D: "#6fc2ef",
            base0E: "#e1a3ee",
            base0F: "#deaf8f"
          }}
          hideRoot
        />
        <ButtonToolbar>
          <ButtonGroup>
            <Button
              bsSize="small"
              bsStyle="success"
              onClick={() => {}}
              disabled={this.props.hasHistory}
            >
              Commit
            </Button>
            <Button
              bsSize="small"
              bsStyle="info"
              onClick={() => {}}
              disabled={this.props.hasHistory}
            >
              View Diff
            </Button>
            <Button
              bsSize="small"
              bsStyle="warning"
              onClick={this.props.undoTree}
              disabled={this.props.hasHistory}
            >
              Undo
            </Button>
            <Button
              bsSize="small"
              bsStyle="danger"
              onClick={this.props.resetTree}
              disabled={this.props.hasHistory}
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
        <CustomSortableTree
          treeData={this.props.treeData}
          handleTreeChange={this.props.handleTreeChange}
          removeNode={this.props.removeNode}
          addChild={this.props.addChild}
          showModal={this.showModal}
        />
        <ExerciseModal
          key="exerciseModal"
          show={this.state.exerciseModalVisible}
          data={this.state.exerciseModalData}
          handleClose={this.hideExerciseModal}
        />
        <ChapterModal
          key="addChapter"
          show={this.state.chapterModalVisible}
          handleClose={this.hideChapterModal}
          data={this.state.chapterModalData}
        />
      </div>
    );
  }
}

Exercises.propTypes = {
  treeData: PropTypes.arrayOf(PropTypes.shape()),
  hasHistory: PropTypes.bool,
  getExercises: PropTypes.func.isRequired,
  handleTreeChange: PropTypes.func.isRequired,
  toggleNodeExpansion: PropTypes.func.isRequired,
  resetTree: PropTypes.func.isRequired,
  undoTree: PropTypes.func.isRequired,
  removeNode: PropTypes.func.isRequired,
  addChild: PropTypes.func.isRequired
};

Exercises.defaultProps = {
  treeData: [],
  hasHistory: false
};

export default withRouter(Exercises);
