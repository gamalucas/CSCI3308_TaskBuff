import React, { Component } from "react";

// import styles from "./createAccount.css";

class App extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    fetch("api/createAccount")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ contacts: data });
      })
      .catch(console.log);
  }

  render() {
    return (
      <div>
        <section>
          <h1>Create Account</h1>
          <h2>sign up to get started</h2>

          <div>
            <form action="">
              <div class="input-block">
                <label for="createAccount-email">Email</label>
                <input type="email" id="createAccount-email" />
              </div>
              <div class="input-block">
                <label for="createAccount-username">Username</label>
                <input type="text" id="createAccount-username" />
              </div>
              <div class="input-block">
                <label for="createAccount-password">Password</label>
                <input type="password" id="createAccount-password" />
              </div>
              <div class="input-block">
                <label for="createAccount-name">Name (optional)</label>
                <input type="text" id="createAccount-name" />
              </div>
              <button type="submit" class="btn-login">
                Sign up
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
