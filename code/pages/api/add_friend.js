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
      const username = req.body.username.replace(/[;'"]/g, "");

      if (!username) {
        res
          .status(422)
          .send({ error: ["Enter a username you want to add as a friend."] });
        return resolve();
      }

      // const product = await db.any("SELECT * FROM users;");
      var query1 = "SELECT id from users WHERE username = '" + username + "';";

      //   console.log(query);

      db.any(query1).then((data) => {
        console.log(data);
        if (data.length == 0) {
          console.log("in here");
          res
            .status(422)
            .send({ error: ["No user matching the username you gave."] });
          return resolve();
        }
        var query2 =
          "INSERT INTO friends(user_id,friend_id) VALUES(" +
          req.session.key +
          "," +
          data[0].id +
          ") ON CONFLICT DO NOTHING;";
        db.any(query2).then((data) => {
          res.status(200).json({ success: "Successfully added friend!" });
          return resolve();
        });
      });

      //   db.any(query).then((data) => {
      //     console.log(data);
      //     res.status(200).json({ success: "Successfully added friend!" });
      //     resolve();
      //   });
    } catch (error) {
      // console.error(error);
      res
        .status(500)
        .send({ error: ["Error creating on the server"], message: error });
      return resolve();
    }
  });
};
