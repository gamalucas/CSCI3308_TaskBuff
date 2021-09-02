import Head from "next/head";
import React, { useEffect, useState } from "react";
import * as rn from "react-bootstrap";
import Calendar from "react-calendar";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import FunTimesWithCards from "./CalendarCard";
import styles from "./calendarMainStyle.module.css";
import TextField from "@material-ui/core/TextField";

const MainCalendarPage = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [friendUser, setFriendUser] = useState("");
  const handleClose = () => {
    setShow(false);
    setFriendError("");
    setFriendAttempted(false);
    setFriendSuccess(false);
    setFriendUser("");
  };
  const handleShow = () => setShow(true);
  const [todayTasks, setTodayTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [friendSuccess, setFriendSuccess] = useState(false);
  const [friendAttempted, setFriendAttempted] = useState(false);
  const [friendError, setFriendError] = useState("");

  const handleSearch = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: friendUser,
      }),
    };
    console.log(friendUser);
    fetch("api/add_friend", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          setFriendSuccess(true);
        } else {
          setFriendError(data.error);
        }
        setFriendAttempted(true);
      });
  };

  const handleFrindChange = ({ target }) => {
    setFriendUser(target.value);
  };

  const getDayFormatted = (d) => {
    var today = d.getFullYear().toString() + "-";
    var month = d.getMonth() + 1;
    if (month < 10) {
      today += "0";
    }
    today += month.toString() + "-";
    if (d.getDate() < 10) {
      today += "0";
    }
    today += d.getDate().toString();
    return today;
  };

  const calanderDayChange = (d) => {
    setDate(d);
    var selectedDateFormatted = getDayFormatted(d);
    var selectedDayTasks = [];
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].day == selectedDateFormatted) {
        selectedDayTasks.push(tasks[i]);
      }
    }
    setSelectedTasks(selectedDayTasks);
  };

  const renderFriendError = () => {
    if (friendAttempted) {
      return <Alert variant="danger">Error! {friendError}</Alert>;
    }
  };

  const renderFriend = () => {
    if (!friendSuccess) {
      return (
        <rn.Modal.Footer>
          {renderFriendError()}
          <rn.Button variant="secondary" onClick={handleClose}>
            Close
          </rn.Button>
          <rn.Button variant="primary" onClick={handleSearch}>
            Search
          </rn.Button>
        </rn.Modal.Footer>
      );
    } else {
      return (
        <rn.Modal.Footer>
          <Alert variant="success">Successfully added friend!</Alert>
          <rn.Button variant="secondary" onClick={handleClose}>
            Close
          </rn.Button>
        </rn.Modal.Footer>
      );
    }
  };

  useEffect(() => {
    fetch("api/get_user_info")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setName(data.username);
      });
    fetch("api/get_tasks")
      .then((resp) => resp.json())
      .then((data) => {
        var today = getDayFormatted(new Date());
        var formattedTasks = [];
        var formattedTasksToday = [];

        for (var i = 0; i < data.length; i++) {
          var usersTemp = [];
          for (var j = 0; j < data[i].usernames.length; j++) {
            if (data[i].usernames[j] != data[i].owner) {
              usersTemp.push(data[i].usernames[j]);
            }
          }
          formattedTasks.push({
            name: data[i].name,
            startTime: data[i].start_time,
            endTime: data[i].end_time,
            notes: data[i].description,
            priority: "high",
            day: data[i].date.substring(0, 10),
            owner: data[i].owner,
            sharedMembers: usersTemp,
          });
          if (formattedTasks[i].day == today) {
            formattedTasksToday.push(formattedTasks[i]);
          }
        }

        calanderDayChange(date);
        setTodayTasks(formattedTasksToday);
        setTasks(formattedTasks);
      });
  }, []);

  return (
    <div id="somethingElse" className={styles.somethingElse}>
      <div id="innerSomethingElse" className={styles.innerSomethingElse}>
        <Head>
          <title>Calendar</title>
          <link rel="icon" href="/geometricT.png" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
            crossorigin="anonymous"
          />
        </Head>
        <div id="navBarStyle" className={styles.navBarStyle}>
          <rn.Navbar bg="dark" expand="xl" variant="dark">
            <div style={{ paddingLeft: "1vw" }}>
              <a href="/taskCreation">
                <rn.Button className="mr-auto" variant="info">
                  Add a Task
                </rn.Button>
              </a>{" "}
            </div>
            <rn.Navbar.Brand
              className="m-auto"
              href="CalendarMain"
              style={{ paddingLeft: "20vw" }}
            >
              <img
                src="/newIcon2.png"
                height="50vw"
                className="d-inline-block align-top"
                id="navBarBrandLogo"
                alt="React Bootstrap logo"
              />
            </rn.Navbar.Brand>
            <rn.Nav className="ml-auto" style={{ paddingRight: ".3vw" }}>
              <rn.Nav.Link>
                <rn.Button variant="info" onClick={handleShow}>
                  Add friends
                </rn.Button>
              </rn.Nav.Link>
              <rn.Nav.Link href="CalendarMain">
                <img
                  src="/refreshIcon2.png"
                  height="40vw"
                  className="d-inline-block align-top"
                  id="navBarBrandLogo"
                  alt="React Bootstrap logo"
                />
              </rn.Nav.Link>
              <rn.Nav.Link
                href="CalendarMain"
                className={styles.nameCornerPanel}
              >
                <h5>{name}</h5>
              </rn.Nav.Link>
            </rn.Nav>
          </rn.Navbar>
        </div>
        <div id="bottomPanelTable" className={styles.bottomPanelTable}>
          <rn.Modal show={show} onHide={handleClose}>
            <rn.Modal.Header closeButton>
              <rn.Modal.Title>Search for Friends</rn.Modal.Title>
            </rn.Modal.Header>
            <rn.Modal.Body>
              <div>
                <TextField
                  name="friends"
                  label="Enter a Username"
                  type="text"
                  variant="outlined"
                  value={friendUser}
                  onChange={handleFrindChange}
                  disabled={friendSuccess}
                />
              </div>
            </rn.Modal.Body>
            {renderFriend()}
          </rn.Modal>
          <rn.Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
            <rn.Row style={{ marginLeft: 0, marginRight: 0 }}>
              <rn.Col style={{ paddingLeft: 0 }}>
                <div
                  id="todayInformationPanel"
                  className={styles.todayInformationPanel}
                >
                  <rn.Container>
                    <rn.Row style={{ paddingLeft: 0 }}>
                      <rn.Col style={{ paddingLeft: 0 }}>
                        <div
                          id="today_checkMarkAndPanel"
                          className={styles.today_checkMarkAndPanel}
                        >
                          <div
                            id="todayBrandTitle"
                            className={styles.todayBrandTitle}
                          >
                            <img
                              src="/checkMarkSmall.png"
                              height="60vh"
                              className="d-inline-block align-top"
                              alt="React Bootstrap logo"
                            />
                          </div>
                          <h1
                            id="todayTextTitle"
                            className={styles.todayTextTitle}
                          >
                            Today:
                          </h1>
                        </div>
                      </rn.Col>
                    </rn.Row>
                    <rn.Row style={{ paddingLeft: 0 }}>
                      <div
                        id="makeShiftLine"
                        className={styles.makeShiftLine}
                      ></div>
                    </rn.Row>
                    <rn.Row style={{ paddingLeft: 0 }}>
                      <rn.Col style={{ paddingLeft: 0, paddingBottom: 5 }}>
                        <div id="taskCards" className={styles.taskCards}>
                          {todayTasks.map((datum, index) => {
                            return (
                              <FunTimesWithCards datum={datum} key={index} />
                            );
                          })}
                        </div>
                        <div
                          id="cardBottomPadding"
                          className={styles.cardBottomPadding}
                        ></div>
                      </rn.Col>
                    </rn.Row>
                  </rn.Container>
                </div>
              </rn.Col>
              <rn.Col>
                <div id="calendarPanel" className={styles.calendarPanel}>
                  <rn.Container>
                    <rn.Row style={{ paddingLeft: 0 }}>
                      <rn.Col style={{ paddingLeft: 0 }}>
                        <div
                          id="calendarTitlePanel"
                          className={styles.calendarTitlePanel}
                        >
                          <h1>Calendar</h1>
                        </div>
                      </rn.Col>
                    </rn.Row>
                    <rn.Row style={{ paddingLeft: 0 }}>
                      <rn.Col style={{ marginLeft: 0, paddingLeft: 0 }}>
                        <div
                          id="calendarActualPanel"
                          className={styles.calendarActualPanel}
                        >
                          <Calendar onChange={calanderDayChange} value={date} />
                        </div>
                      </rn.Col>
                    </rn.Row>
                  </rn.Container>
                </div>
              </rn.Col>
              <rn.Col>
                <div id="selectedDayPanel" className={styles.selectedDayPanel}>
                  <rn.Container>
                    <rn.Row style={{ paddingLeft: 0 }}>
                      <rn.Col style={{ paddingLeft: 0 }}>
                        <div
                          id="selectedTitlePanel"
                          className={styles.selectedTitlePanel}
                        >
                          <h1>Selected Day</h1>
                        </div>
                      </rn.Col>
                    </rn.Row>
                    <rn.Row style={{ paddingLeft: 0 }}>
                      <rn.Col style={{ marginLeft: 0, paddingLeft: 0 }}>
                        <div
                          id="selectedActualPanel"
                          className={styles.selectedActualPanel}
                        >
                          <div
                            id="taskCardsFocused"
                            className={styles.taskCardsFocused}
                          >
                            {selectedTasks.map((datum, index) => {
                              return (
                                <FunTimesWithCards datum={datum} key={index} />
                              );
                            })}
                          </div>
                        </div>
                      </rn.Col>
                    </rn.Row>
                  </rn.Container>
                </div>
              </rn.Col>
            </rn.Row>
          </rn.Container>
        </div>
      </div>
      <footer>hello there</footer>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap");
        html,
        body {
          height: 100%;
          margin: 0;
          // border: 5px solid green;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          font-family: "Nunito", sans-serif;
          background-image: url("/possibleCalendarBackground1.jpg");
          overflow: auto;
        }
      `}</style>
    </div>
  );
};

export default MainCalendarPage;
