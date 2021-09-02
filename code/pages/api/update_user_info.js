//Done

//Instructions to use:
//Do: fetch('api/update_user_info',RequestOptions)
// const requestOptions = {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
// body: JSON.stringify({
//   name: "Put Name Here",
//   phone_number: "523456789",   //format phone number like so
//   notifications: "10111"       //String with ones and zeros, 1 means the associated notification is turned on, 0 turned off
// }),
// };
// Returns { success: "Successfully signed up!" } if successful, sets session key

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
      const { name, phone_number, notifications } = req.body;

      if (req.session.key == null) {
        res.status(401).send({ error: ["Not logged in."] });
        return resolve();
      }

      if (!name && !phone_number && !notifications) {
        res.status(422).send({ error: ["No fields to update"] });
        return resolve();
      }
      var query = "UPDATE users SET ";

      if (name) {
        query += "name = '" + name + "',";
      }
      if (phone_number) {
        query += "phone_number = '" + phone_number + "',";
      }
      if (notifications) {
        query += "notifications = '" + notifications + "',";
      }
      query = query.substring(0, query.length - 1);
      query += "WHERE id = " + req.session.key + ";";

      db.any(query).then((data) => {
        console.log(data);
        res.status(200).json({ success: "Successfully updated info!" });
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
