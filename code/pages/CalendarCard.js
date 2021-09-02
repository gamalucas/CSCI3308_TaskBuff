import Head from "next/head";
import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import * as rn from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./calendarCard.module.css";

const FunTimesWithCards = (props) => {
  useEffect(() => {
    // if(props.datum){
    //     console.log(props.datum)
    // }
    // console.log('Hello im inside component')
  }, [props.datum]);

  const elements = props.datum.sharedMembers;

  const items = [];

  for (const [index, value] of elements.entries()) {
    items.push(<li key={index}>{value}</li>);
  }
  return (
    <div id="parentDiv" className={styles.root}>
      <div id="title" className={styles.titleContainer}>
        <input className={styles.buttonRound} name="isGoing" type="checkbox" />
        <h2 className={styles.taskTitle}>{props.datum.name}</h2>
      </div>
      <div id="description" className={styles.taskNameAndDesc}>
        <h5 className={styles.taskTime}>
          {props.datum.startTime} - {props.datum.endTime}
        </h5>
        <p className={styles.taskDesc}>{props.datum.notes}</p>
      </div>
      <div id="ownedBy" className={styles.ownedByContainer}>
        <h5 className={styles.ownedByLiteral}>Owned by: </h5>
        <h5 className={styles.ownedByTitle}>{props.datum.owner}</h5>
      </div>
      <div id="sharedWith" className={styles.sharedWithContainer}>
        <h5>Shared with: </h5>
        <h5 className={styles.sharedWithList}>{items}</h5>
      </div>
    </div>
  );
};

export default FunTimesWithCards;
