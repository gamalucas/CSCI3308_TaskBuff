import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import CardContent from "@material-ui/core/CardContent";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class taskCreation extends Component {
  constructor() {
    super();
    this.state = {
      taskName: "",
      location: "",
      date: "2021-04-15",
      startTime: "12:00",
      endTime: "13:00",
      description: "",
      users: [],
      successful: false,
      attempted: false,
      error: "",
      friends: [],
      backgroundColorsUsers: [],
    };
  }

  componentDidMount = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("api/get_friends", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        var backG = [];

        for (var i = 0; i < data.length; i++) {
          backG.push("#ffffff");
        }
        this.setState({ friends: data, backgroundColorsUsers: backG });
      })
      .catch(console.log);
  };

  friendsHandleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    var backG = [];
    for (var i = 0; i < this.state.backgroundColorsUsers.length; i++) {
      if (target.value.indexOf(this.state.friends[i]) === -1) {
        backG.push("#ffffff");
      } else {
        backG.push("#bbbbff");
      }
    }
    this.setState({
      [target.name]: target.value,
      backgroundColorsUsers: backG,
    });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  handleTaskButton = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.taskName,
        date: this.state.date, // This is where date goes, format like so
        location: this.state.location,
        start_time: this.state.startTime,
        end_time: this.state.endTime,
        description: this.state.description,
        usernames: this.state.users,
      }),
    };
    fetch("api/create_task", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          this.setState({ successful: true });
        } else {
          this.setState({ error: data.error });
        }
        this.setState({ attempted: true });
      })
      .catch(console.log);
  };

  renderAttempted = () => {
    if (this.state.attempted) {
      return <Alert variant="danger">Error! {this.state.error}</Alert>;
    }
  };

  renderButtons = () => {
    if (this.state.successful) {
      return (
        <div>
          <Alert variant="success">
            Task Creation was a Success! Click button below to return to your
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
          {this.renderAttempted()}{" "}
          <Button onClick={this.handleTaskButton}>Create Task</Button>
          <br></br>
          <br></br>
          <a
            class="btn btn-primary"
            href="/CalendarMain"
            role="button"
            style={{
              marginBottom: "0.5rem",
              marginTop: "0.5rem",
            }}
          >
            Cancel
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
            marginTop: "2.0rem",
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
                  marginBottom: "1.0rem",
                }}
              >
                Task Info
              </h2>
              <Grid container direction={"column"} spacing={1}>
                <Grid item>
                  <TextField
                    name="taskName"
                    label="Task Name"
                    type="text"
                    variant="outlined"
                    value={this.state.taskName}
                    onChange={this.handleChange}
                    disabled={this.state.successful}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="description"
                    label="Description of Task"
                    type="search"
                    variant="outlined"
                    value={this.state.description}
                    onChange={this.handleChange}
                    disabled={this.state.successful}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="location"
                    label="Location"
                    type="search"
                    variant="outlined"
                    value={this.state.location}
                    onChange={this.handleChange}
                    disabled={this.state.successful}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="date"
                    label="Date"
                    type="date"
                    margin="normal"
                    fullWidth={true}
                    value={this.state.date}
                    onChange={this.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled={this.state.successful}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="startTime"
                    id="newStartTime"
                    label="Start Time"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    value={this.state.startTime}
                    onChange={this.handleChange}
                    fullWidth={true}
                    disabled={this.state.successful}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="endTime"
                    id="newEndTime"
                    label="End Time"
                    type="time"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    value={this.state.endTime}
                    onChange={this.handleChange}
                    fullWidth={true}
                    disabled={this.state.successful}
                  />
                </Grid>

                <Grid item>
                  <FormControl style={{ width: 250 }}>
                    <InputLabel id="demo-mutiple-chip-label">
                      Share With Friends
                    </InputLabel>
                    <Select
                      name="users"
                      labelId="demo-mutiple-chip-label"
                      id="demo-mutiple-chip"
                      multiple
                      value={this.state.users}
                      onChange={this.friendsHandleChange}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={(selected) => (
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                      disabled={this.state.successful}
                    >
                      {this.state.friends.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={{
                            background: this.state.backgroundColorsUsers[
                              this.state.friends.indexOf(name)
                            ],
                          }}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
            background-image: url("/mountain1.jpg");
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
        `}</style>
      </div>
    );
  }
}
export default taskCreation;
