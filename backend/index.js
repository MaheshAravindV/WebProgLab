const express = require("express");
const pg = require("pg");
const cors = require("cors");

const app = express();
const connectionString = "postgres://postgres:1605@localhost:5432/webdev";
const pool = new pg.Pool({ connectionString });

app.listen(8000);
app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const rows = (
    await pool.query(`SELECT pass from users where uname like '${username}';`)
  ).rows;
  if (rows.length == 0) res.status(401);
  else {
    const { pass } = rows[0];
    if (password == pass) res.status(200);
    else res.status(401);
  }
  res.send();
});
