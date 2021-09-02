import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./viewLogin";

class App extends Component {
  state = {
    contacts: [],
  };

  render() {
    return <Login />;
  }
}

export default App;
