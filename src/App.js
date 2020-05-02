// import React from 'react';
import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Router } from 'react-router-dom';
import history from './services/history';
import Routes from './routes';

// import { simpleAction } from "./actions/simpleAction";
// import CarCard from "./components/carcard";
import { Input, Button } from 'reactstrap';
// const mapStateToProps = (state) => ({
//   ...state,
// });
// const mapDispatchToProps = (dispatch) => ({
//   simpleAction: () => dispatch(simpleAction()),
// });
class App extends Component {
  // simpleAction = (event) => {
  //   this.props.simpleAction();
  // };

  render() {
    return (
      <div className="App">
        {/* hello i am nitish
       <Input placeholder= "hii">ddds </Input> */}
        <Router history={history}>
      <Routes />
    </Router>
        {/* <Button color="danger" type="submit"> hello </Button> */}
        {/* <button onClick={this.simpleAction}>Test redux action</button> */}
        {/* <pre>{JSON.stringify(this.props)}</pre> */}
      </div>
    );
  }
}
export default App;
