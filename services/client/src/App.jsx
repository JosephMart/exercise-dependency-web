import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import UsersList from "./components/UsersList";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Form from "./components/forms/Form";
import Logout from "./components/Logout";
import Message from "./components/Message";
import Footer from "./components/Footer";
import Exercises from "./components/Exercises";
import Textbooks from "./components/Textbooks";
import { toggleExpandedForAll } from "react-sortable-tree";

import MOCK_EXERCISES from "./components/ExerciseMockData";
import { cleanTree, deepEqual } from "./utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Exercise Dependency Web",
      messageName: "",
      messageType: "",
      textbooks: [],
      initialExercises: [],
      exercisesHistory: [],
      treeData: [],
      user: {
        id: 1
      }
    };
  }

  removeMessage = () => {
    this.setState({
      messageName: "",
      messageType: ""
    });
  };

  getExercises = textbookID => {
    // TODO: actually fetch textbooks for a particular user
    this.setState({
      initialExercises: MOCK_EXERCISES,
      exercisesStates: [MOCK_EXERCISES],
      treeData: MOCK_EXERCISES
    });
  };

  getTextbooks = () => {
    // TODO: actually fetch textbooks for a particular user
    this.setState({
      textbooks: [
        {
          id: 1,
          name: "MYMathApps: Calculus",
          topics: ["interactive", "wizardly"]
        }
      ]
    });
  };

  exercisesUtils = {
    toggleNodeExpansion: expanded =>
      this.setState(prevState => ({
        treeData: toggleExpandedForAll({
          treeData: prevState.treeData,
          expanded
        })
      })),
    handleTreeChange: treeData => {
      this.setState(prevState => {
        const newState = { treeData };
        // Determine whether this change should be added to the history
        if (!deepEqual(cleanTree(prevState.treeData), cleanTree(treeData))) {
          newState.exercisesHistory = [...prevState.exercisesHistory, treeData];
        }
        return newState;
      });
    },
    resetTree: () => {
      this.setState(prevState =>
        deepEqual(
          cleanTree(prevState.treeData),
          cleanTree(prevState.initialExercises)
        )
          ? null
          : {
              treeData: prevState.initialExercises,
              exercisesHistory: [
                ...prevState.exercisesHistory,
                prevState.initialExercises
              ]
            }
      );
    },
    undoTree: () => {
      this.setState(prevState => {
        if (
          deepEqual(
            cleanTree(prevState.treeData),
            cleanTree(prevState.initialExercises)
          )
        ) {
          return;
        }
        const exercisesHistory = [
          prevState.initialExercises,
          ...prevState.exercisesHistory.slice(
            1,
            prevState.exercisesHistory.length - 1
          )
        ];
        return {
          exercisesHistory,
          treeData: exercisesHistory[exercisesHistory.length - 1]
        };
      });
    }
  };

  render() {
    return (
      <div>
        <NavBar title={this.state.title} isAuthenticated />
        <div className="container">
          {this.state.messageName && this.state.messageType && (
            <Message
              messageName={this.state.messageName}
              messageType={this.state.messageType}
              removeMessage={this.removeMessage}
            />
          )}
          <div className="row">
            <div className="col-md-6">
              <br />
              <Switch>
                <Route exact path="/" component={About} />
                <Route
                  exact
                  path="/textbooks"
                  render={() => (
                    <Textbooks
                      isAuthenticated={this.state.isAuthenticated}
                      textbooks={this.state.textbooks}
                      getTextbooks={this.getTextbooks}
                    />
                  )}
                />
                <Route
                  path="/textbooks/:textbookID/exercises"
                  render={() => (
                    <Exercises
                      getExercises={this.getExercises}
                      treeData={this.state.treeData}
                      {...this.exercisesUtils}
                    />
                  )}
                />
                <Route
                  exact
                  path="/register"
                  render={() => (
                    <Form
                      formType={"register"}
                      isAuthenticated={this.state.isAuthenticated}
                      loginUser={this.loginUser}
                      createMessage={this.createMessage}
                      getUsers={this.getUsers}
                    />
                  )}
                />
                <Route
                  exact
                  path="/login"
                  render={() => (
                    <Form
                      formType={"login"}
                      isAuthenticated={this.state.isAuthenticated}
                      loginUser={this.loginUser}
                      createMessage={this.createMessage}
                      getUsers={this.getUsers}
                    />
                  )}
                />
                <Route
                  exact
                  path="/all-users"
                  render={() => <UsersList users={this.state.users} />}
                />
                <Route
                  exact
                  path="/logout"
                  render={() => (
                    <Logout
                      logoutUser={this.logoutUser}
                      isAuthenticated={this.state.isAuthenticated}
                    />
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
