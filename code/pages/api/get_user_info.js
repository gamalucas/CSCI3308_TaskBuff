// Done

//Instructions to use:
//Do: fetch('api/get_user_info',RequestOptions)
// const requestOptions = {
//   method: "GET",
//   headers: { "Content-Type": "application/json" },
// };
// Returns JSON object of all user data except password and id if successful

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

      var query = "SELECT * FROM users WHERE id = " + req.session.key + ";";

      db.any(query).then((data) => {
        if (data.length != 1) {
          res.status(400).send({ error: ["No matching data to user id"] }); //Look here not sure what the http response should be
        }
        var response = {
          username: data[0].username,
          name: data[0].name,
          email: data[0].email,
          phone_number: data[0].phone_number,
          notifications: data[0].notifications,
        };
        res.status(200).json(response);
        resolve();
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
      return resolve();
    }
  });
};
