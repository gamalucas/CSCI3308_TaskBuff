//Done

//Instructions to use:
//Do: fetch('api/get_tasks',RequestOptions)
// const requestOptions = {
//   method: "GET",
//   headers: { "Content-Type": "application/json" },
// };
// Returns list of tasks for the signed in user if successful with all task attributes

import { options } from "./session";

import { applySession } from "next-session";

const pgp = require("pg-promise")({
  noWarnings: true,
});

const db = pgp(`postgres://postgres:pwd@localhost:5432/taskbuff_db`);

export default async (req, res) => {
  await applySession(req, res, options);
  return new Promise((resolve, reject) => {
    try {
      if (req.session.key == null) {
        res.status(401).send({ error: ["Not logged in."] });
        return resolve();
      }

      var query =
        "SELECT * FROM tasks WHERE id = ANY(SELECT task_id from user_task WHERE user_id = " +
        req.session.key +
        ");";

      db.any(query).then((data) => {
        var queries2 = [];
        for (var i = 0; i < data.length; i++) {
          var temp =
            "SELECT username from users WHERE id = ANY(SELECT user_id FROM user_task WHERE task_id = " +
            data[i].id +
            ");";
          queries2.push(temp);
        }
        db.task("get-everything", (task) => {
          var tasks = [];
          for (var i = 0; i < queries2.length; i++) {
            tasks.push(task.any(queries2[i]));
          }
          return task.batch(tasks);
        }).then((info) => {
          for (var i = 0; i < info.length; i++) {
            var users = [];
            for (var j = 0; j < info[i].length; j++) {
              users.push(info[i][j].username);
            }
            data[i].usernames = users;
          }
          res.status(200).send(data);
          resolve();
        });
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
      return resolve();
    }
  });
};
