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
      // const product = await db.any("SELECT * FROM users;");
      var query1 =
        "SELECT username from users WHERE id = ANY(SELECT friend_id FROM friends WHERE user_id = " +
        req.session.key +
        ");";

      //   console.log(query);

      db.any(query1).then((data) => {
        console.log(data);
        var users = [];
        for (var i = 0; i < data.length; i++) {
          users.push(data[i].username);
        }
        res.status(200).json(users);
        return resolve();
      });
    } catch (error) {
      // console.error(error);
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
      return resolve();
    }
  });
};
