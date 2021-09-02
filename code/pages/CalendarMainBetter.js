import Head from 'next/head'
import React from 'react'
import * as rn from "react-bootstrap";
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MainCalendarPage() {
  return (
    <div className="container">
        <Head>
            <title>Calendar</title>
            <link rel="icon" href="/favicon.ico" />
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
                crossorigin="anonymous"
            />
        </Head>

        <rn.Container fluid>
            <rn.Row fluid>
                    <div id="navBarStyle">
                            <rn.Navbar bg="dark" expand="xl" variant="dark">
                                <div style={{paddingLeft: "1vw"}}>
                                    <rn.Button className="mr-auto" variant="info">
                                        Add a Task
                                    </rn.Button>{' '}
                                </div>
                                <rn.Navbar.Brand className="m-auto" href="CalendarMain" style={{paddingLeft: "20vw"}}>
                                    <img
                                        src="/newIcon2.png"
                                        height="50vw"
                                        className="d-inline-block align-top"
                                        id="navBarBrandLogo"
                                        alt="React Bootstrap logo"
                                    />
                                </rn.Navbar.Brand>
                                <rn.Nav className="ml-auto" style={{paddingRight: ".3vw"}}>
                                    <rn.Nav.Link href="CalendarMain">
                                        <img
                                            src="/refreshIcon2.png"
                                            height="30vw"
                                            className="d-inline-block align-top"
                                            id="navBarBrandLogo"
                                            alt="React Bootstrap logo"
                                        />
                                    </rn.Nav.Link>
                                    <rn.Nav.Link href="CalendarMain">
                                        <img
                                            src="/settingsIcon.png"
                                            height="30vw"
                                            className="d-inline-block align-top"
                                            id="navBarBrandLogo"
                                            alt="React Bootstrap logo"
                                        />
                                    </rn.Nav.Link>
                                    <rn.Nav.Link href="CalendarMain">
                                        <img
                                            src="/personIcon.png"
                                            height="30vw"
                                            className="d-inline-block align-top"
                                            id="navBarBrandLogo"
                                            alt="React Bootstrap logo"
                                        />
                                    </rn.Nav.Link>
                                </rn.Nav>
                            </rn.Navbar>
                    </div>
            </rn.Row>
            <rn.Row fluid>
                <rn.Col>
                    <div id="todayInformationPanel">
                        <h1>anything please</h1>
                    </div>
                </rn.Col>
                <rn.Col>
                    <div id="calendarPanel">
                        <h1>please please</h1>
                    </div>
                </rn.Col>
                <rn.Col>
                    <div id="informationPanel">
                        <h1>maybe please</h1>
                    </div>
                </rn.Col>
            </rn.Row>
        </rn.Container>
        <style jsx>{`
            .container {
                padding-left: 0;
                left: 0;
                right: 0;
            }
            #navBarStyle {
                position: absolute;
                width: 100vw;
                height: 10vw;
                left: 0;
            }
            #todayInformationPanel {
                height: 10vw;
                left: 0;
                margin-top: 3.25vw;
                background-color: #4BBEE3; 
            }
            #calendarPanel {
                position: absolute;
                height: 10vw;
                left: 0;
                margin-top: 5vw;
            }
            #informationPanel {
                position: absolute;
                height: 10vw;
                left: 0;
                margin-top: 5vw;
            }
            #mainBodyGridContainer {
                position: relative;
            }
        `}</style>

        <style jsx global>{`
            html,
            body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            background-image: url("/image.jpg");
            }

        `}</style>
    </div>
  )
}
