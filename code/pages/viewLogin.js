import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@material-ui/core/Grid";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class viewLogin extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loggedin: false,
      attempted: false,
    };
  }
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleLogInButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    };
    fetch("api/login", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          this.setState({ loggedin: true });
        }
        this.setState({ attempted: true });
      });
  };

  renderAttempted = () => {
    if (this.state.attempted) {
      return <Alert variant="danger">Incorrect Login! Please Try Again!</Alert>;
    }
  };

  renderButtons = () => {
    if (this.state.loggedin) {
      return (
        <div>
          <Alert variant="success">
            Login was a Success! Click button below to go to your homepage!
          </Alert>
          <a
            className="btn btn-primary"
            href="/CalendarMain"
            role="button"
            style={{
              marginBottom: "2.5rem",
            }}
          >
            Home
          </a>
        </div>
      );
    } else {
      return (
        <div>
          {this.renderAttempted()}
          <br></br>
          <Button onClick={this.handleLogInButtonPressed}>Login</Button>
          <br></br>
          <br></br>
          <a
            className="btn btn-primary"
            href="/viewAccount"
            role="button"
            style={{
              marginBottom: "2.5rem",
            }}
          >
            Create Account
          </a>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <img
            src="/newIcon2.png"
            height="50vw"
            className="d-inline-block align-top"
            id="navBarBrandLogo"
            alt="React Bootstrap logo"
          />
        </Navbar>
        <div
          style={{
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Card style={{ width: "20rem" }}>
            <CardContent>
              <h2
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  marginBottom: "2.5rem",
                }}
              >
                Login
              </h2>
              <Grid container direction={"column"} spacing={2}>
                <Grid item>
                  <TextField
                    name="username"
                    label="Enter Username"
                    type="text"
                    variant="outlined"
                    value={this.state.username}
                    onChange={this.handleChange}
                    disabled={this.state.loggedin}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="password"
                    label="Enter Password"
                    type="password"
                    variant="outlined"
                    value={this.state.password}
                    onChange={this.handleChange}
                    disabled={this.state.loggedin}
                  />
                </Grid>
              </Grid>
            </CardContent>
            {this.renderButtons()}
          </Card>
        </div>
        <style jsx global>{`
          html,
          body {
            height: 100%;
            margin: 0;
            // border: 5px solid green;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
            background-image: url("/mountain.jpg");
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
        `}</style>
      </div>
    );
  }
}

export default viewLogin;
