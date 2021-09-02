import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_info: { yo: "Nothing is here yet" },
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({
      //   username: "Connor",
      // }),
    };
    console.log(requestOptions);
    fetch("api/get_tasks", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ user_info: data });
      })
      .catch(console.log);
  }

  render() {
    return (
      <div>
        <div>{JSON.stringify(this.state.user_info)}</div>
      </div>
    );
  }
}

export default App;
