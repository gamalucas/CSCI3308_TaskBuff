import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@material-ui/core/Grid";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

class viewAccount extends Component {
  constructor() {
    super();
    this.state = {
      //username: "",
      //email: "",
      //password: "",
      fields: {},
      errors: {},
      valid: false,
      loggedin: false,
      attempted: false,
      error: "",
    };
  }
  //handleChange = ({ target }) => {
  //  this.setState({ [target.name]: target.value });
  //};
  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }
  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "Cannot be empty";
    } else if (typeof fields["username"] !== "undefined") {
      let length = fields["username"].length;
      if (length < 8) {
        formIsValid = false;
        errors["username"] = "Username must have at least 8 characters";
      }
    }
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    } else if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");
      //checks for email having @ and .
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    } else if (typeof fields["password"] !== "undefined") {
      let length = fields["password"].length;
      if (
        !fields["password"].match(
          "^(?=.*[a-z])(?=." + "*[A-Z])(?=.*\\d)" + "(?=.*[-+_!@#$%^&*., ?]).+$"
        )
      ) {
        formIsValid = false;
        errors["password"] =
          "Password must contain at least one lowercase character, one uppercase character, one number, and one special character";
      } else if (length < 8) {
        formIsValid = false;
        errors["password"] = "Password must have at least 8 characters";
      }
    }
    this.setState({ errors: errors });
    this.setState({ valid: formIsValid });
    return formIsValid;
  }

  renderError = (name) => {
    if (this.state.errors[name]) {
      return <Alert variant="danger">{this.state.errors[name]}</Alert>;
    }
  };

  contactSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      alert("Account passed checks");
    } else {
      alert("Account contains errors.");
    }
  }
  handleCreateAccount = () => {
    if (this.handleValidation()) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          //username: this.state.username,
          //password: this.state.password,
          //email: this.state.email,
          username: this.state.fields["username"],
          password: this.state.fields["password"],
          email: this.state.fields["email"],
        }),
      };
      fetch("api/sign_up", requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data.success) {
            this.setState({ loggedin: true });
          } else {
            this.setState({ error: data.error });
          }
          this.setState({ attempted: true });
        });
    }
  };
  renderAttempted = () => {
    if (this.state.attempted) {
      return <Alert variant="danger">Error! {this.state.error}</Alert>;
    }
  };
  renderButtons = () => {
    if (this.state.loggedin) {
      return (
        <div>
          <Alert variant="success">
            Signup and Login was a Success! Click button below to go to your
            homepage!
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
          <Button onClick={this.handleCreateAccount}>Create Account</Button>
          <br></br>
          <br></br>
          <a
            className="btn btn-primary"
            href="/viewLogin"
            role="button"
            style={{
              marginBottom: "2.5rem",
            }}
          >
            Return to Login
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
                Create Account
              </h2>
              <Grid container direction={"column"} spacing={2}>
                <Grid item>
                  <TextField
                    name="username"
                    label="Enter a Username"
                    type="text"
                    variant="outlined"
                    //onChange={this.handleChange}
                    onChange={this.handleChange.bind(this, "username")}
                    //value={this.state.username}
                    value={this.state.fields["username"]}
                    disabled={this.state.loggedin}
                  />
                  <br></br>
                  {this.renderError("username")}
                  {/* <span style={{ color: "red" }}>
                    {this.state.errors["username"]}
                  </span> */}
                </Grid>
                <Grid item>
                  <TextField
                    name="email"
                    label="Enter an Email"
                    type="search"
                    variant="outlined"
                    //value={this.state.email}
                    //onChange={this.handleChange}
                    onChange={this.handleChange.bind(this, "email")}
                    value={this.state.fields["email"]}
                    disabled={this.state.loggedin}
                  />
                  <br></br>
                  {this.renderError("email")}
                  {/* <span style={{ color: "red" }}>
                    {this.state.errors["email"]}
                  </span> */}
                </Grid>
                <Grid item>
                  <TextField
                    name="password"
                    label="Enter a Password"
                    type="password"
                    variant="outlined"
                    onChange={this.handleChange.bind(this, "password")}
                    value={this.state.fields["password"]}
                    //value={this.state.password}
                    //onChange={this.handleChange}
                    disabled={this.state.loggedin}
                  />
                  <br></br>
                  {this.renderError("password")}
                  {/* <span style={{ color: "red" }}>
                    {this.state.errors["password"]}
                  </span> */}
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
            background-image: url("/mountain2.jpg");
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
        `}</style>
      </div>
    );
  }
}
export default viewAccount;
