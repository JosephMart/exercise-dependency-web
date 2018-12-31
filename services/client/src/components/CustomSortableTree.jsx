import React, { Component } from "react";
import PropTypes from "prop-types";
import SortableTree from "react-sortable-tree";
import { Glyphicon, Button, ButtonGroup } from "react-bootstrap";

class CustomSortableTree extends Component {
  generateNodeProps = ({ node, path }) => {
    const { isExercise = false } = node;
    const modalName = isExercise ? "exerciseModal" : "chapterModal";
    return {
      buttons: [
        <ButtonGroup>
          <Button bsSize="xsmall" onClick={() => this.props.addChild(path)}>
            Add
          </Button>
          <Button bsSize="xsmall" onClick={() => this.props.removeNode(path)}>
            Remove
          </Button>
          <Button
            bsSize="xsmall"
            onClick={() =>
              this.props.showModal(modalName, { title: node.title })
            }
          >
            <Glyphicon glyph="info-sign" />
          </Button>
        </ButtonGroup>
      ],
      style: { boxShadow: isExercise ? `0 0 0 4px green` : "none" }
    };
  };
  render() {
    return (
      <div style={{ height: 1000, width: 1000 }}>
        <SortableTree
          treeData={this.props.treeData}
          onChange={this.props.handleTreeChange}
          generateNodeProps={this.generateNodeProps}
        />
      </div>
    );
  }
}

CustomSortableTree.propTypes = {
  treeData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleTreeChange: PropTypes.func.isRequired,
  addChild: PropTypes.func.isRequired,
  removeNode: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
};

export default CustomSortableTree;
