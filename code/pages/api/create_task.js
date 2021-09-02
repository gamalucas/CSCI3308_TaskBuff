//Done

//Instructions to use:
//Do: fetch('api/create_task',RequestOptions)
// const requestOptions = {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
// body: JSON.stringify({
//   name: "Put Task Name Here",
//   date: "20200831", // This is where date goes, format like so
//   repeat: "TRUE",   // Put boolean for whether the task repeats or not, write boolean as string like so
//   repeat_days: "0010100", //String representing what days tasks repeat(sunday-saturday) put ones for days it repeats on
//   start_time: "12:05:06 PST",  // Time with timezone, format like so
//   duration: "60",    //Duration put as a string
//   usernames: ["Colman"],    // List of usernames they will share the task with
// }),
// };
// Returns { success: "Successfully added task!" } if successful

import { options } from "./session";

import { applySession } from "next-session";

const pgp = require("pg-promise")({
  noWarnings: true,
});

const db = pgp(`postgres://postgres:pwd@localhost:5432/taskbuff_db`);

const fixer = (obj) => {
  for (var key in obj) {
    if (key != "usernames") {
      obj[key] = obj[key].replace(/[;'"]/g, "");
    } else {
      for (var j = 0; j < obj[key].length; j++) {
        obj[key][j] = obj[key][j].replace(/[;'"]/g, "");
      }
    }
  }
  return obj;
};

export default async (req, res) => {
  await applySession(req, res, options);
  return new Promise((resolve, reject) => {
    try {
      const {
        name,
        date,
        start_time,
        location,
        end_time,
        description,
        usernames,
      } = fixer(req.body);

      if (
        !name ||
        !date ||
        !start_time ||
        !end_time ||
        !description ||
        !location
      ) {
        res
          .status(422)
          .send({ error: ["Missing one or more required fields"] });
        return resolve();
      }

      // const product = await db.any("SELECT * FROM users;");
      var query =
        "INSERT INTO tasks(name,date,start_time,end_time,owner,location,description) VALUES('";
      query += name + "','" + date + "','";
      query +=
        start_time +
        "','" +
        end_time +
        "', (SELECT username from users WHERE id = " +
        req.session.key +
        "),'" +
        location +
        "','" +
        description +
        "') RETURNING id;";

      var get_user_id_query =
        "SELECT id FROM users WHERE username = ANY(ARRAY[";
      if (usernames.length != 0) {
        for (var i = 0; i < usernames.length; i++) {
          get_user_id_query += "'" + usernames[i] + "',";
        }
        get_user_id_query = get_user_id_query.substring(
          0,
          get_user_id_query.length - 1
        );
        get_user_id_query += "]);";
      } else {
        get_user_id_query = "SELECT id FROM users WHERE username = '';";
      }

      var linker_query =
        "INSERT INTO user_task(user_id, task_id) VALUES(" +
        req.session.key +
        ",";

      db.task("get-everything", (task) => {
        return task.batch([task.any(query), task.any(get_user_id_query)]);
      }).then((info) => {
        var task_id = info[0][0].id;
        var user_ids = info[1];
        var linker_query =
          "INSERT INTO user_task(user_id, task_id) VALUES(" +
          req.session.key +
          "," +
          task_id +
          "),(";
        for (var i = 0; i < user_ids.length; i++) {
          linker_query += user_ids[i].id + "," + task_id + "),(";
        }
        linker_query = linker_query.substring(0, linker_query.length - 2) + ";";
        db.any(linker_query).then((data) => {
          res.status(200).json({ success: "Successfully added task!" });
          resolve();
        });
      });
    } catch (error) {
      // console.error(error);
      res
        .status(500)
        .send({ error: ["Error creating on the server"], message: error });
    }
  });
};
