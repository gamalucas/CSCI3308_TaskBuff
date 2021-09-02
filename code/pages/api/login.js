//Done
//Instructions to use:
//Do: fetch('api/login',RequestOptions)
// const requestOptions = {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
// body: JSON.stringify({
//   username: "Put username Here",
//   password: "Put password Here",
// }),
// };
// Returns { success: "Successful log in!" } if successful, this sets the session key which will be used in other api calls

import { options } from "./session";

import { applySession } from "next-session";

const pgp = require("pg-promise")({
  noWarnings: true,
});

const fixer = (obj) => {
  for (var key in obj) {
    obj[key] = obj[key].replace(/[;'"]/g, "");
  }
  return obj;
};

const db = pgp(`postgres://postgres:pwd@localhost:5432/taskbuff_db`);

export default async (req, res) => {
  await applySession(req, res, options);
  return new Promise((resolve, reject) => {
    try {
      const { username, password } = fixer(req.body);

      if (!username || !password) {
        res.status(422).send({ error: ["Missing one or more fields"] });
        return resolve();
      }

      // const product = await db.any("SELECT * FROM users;");
      var query = "SELECT * FROM users WHERE username = '" + username + "';";

      db.any(query).then((data) => {
        if (data.length != 1 || data[0].password != password) {
          res.status(422).send({ error: ["Incorrect Username or Password"] }); //Look here not sure what the http response should be
          return resolve();
        }
        req.session.key = data[0].id;
        res.status(200).send({ success: "Successful log in!" });
        return resolve();
      });
    } catch (error) {
      res
        .status(500)
        .send({ error: ["Error creating on the server"], message: error });
      return resolve();
    }
  });
};
