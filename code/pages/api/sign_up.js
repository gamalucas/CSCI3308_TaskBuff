//Done

//Instructions to use:
//Do: fetch('api/sign_up',RequestOptions)
// const requestOptions = {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
// body: JSON.stringify({
//   username: "Put user Name Here",
//   password: "Put password here",
//   email: "Put email here"
// }),
// };
// Returns { success: "Successfully signed up!" } if successful, sets session key

import { options } from "./session";

import { applySession } from "next-session";

const pgp = require("pg-promise")({
  noWarnings: true,
});

const db = pgp(`postgres://postgres:pwd@localhost:5432/taskbuff_db`);

const fixer = (obj) => {
  for (var key in obj) {
    obj[key] = obj[key].replace(/[;'"]/g, "");
  }
  return obj;
};

export default async (req, res) => {
  await applySession(req, res, options);
  return new Promise((resolve, reject) => {
    try {
      const { username, email, password } = fixer(req.body);

      if (!username || !password || !email) {
        res.status(422).send({ error: ["Missing one or more fields"] });
        return resolve();
      }

      // const product = await db.any("SELECT * FROM users;");
      var checkUser =
        "SELECT * FROM users WHERE username = '" + username + "';";
      var checkEmail = "SELECT * FROM users WHERE email = '" + email + "';";

      db.task("get-everything", (task) => {
        return task.batch([task.any(checkEmail), task.any(checkUser)]);
      }).then((info) => {
        if (info[0].length != 0) {
          res.status(422).send({ error: ["Email already in use"] }); //Look here not sure what the http response should be
          return resolve();
        }
        if (info[1].length != 0) {
          console.log(info[1]);
          res.status(422).send({ error: ["Username already in use"] }); //Look here not sure what the http response should be
          return resolve();
        }
        var insert_query =
          "INSERT INTO users(username,password,email) VALUES('" +
          username +
          "','" +
          password +
          "','" +
          email +
          "');";
        var check_query =
          "SELECT id FROM users WHERE username = '" + username + "';";
        db.any(insert_query).then((e) => {
          db.any(check_query).then((data) => {
            if (data.length != 1) {
              res.status(422).send({ error: ["Sign up failure"] }); //Look here not sure what the http response should be
              return resolve();
            }
            req.session.key = data[0].id;
            res.status(200).json({ success: "Successfully signed up!" });
            resolve();
          });
        });
      });
    } catch (error) {
      res
        .status(500)
        .send({ error: ["Error creating on the server"], message: error });
      return resolve();
    }
  });
};
