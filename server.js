const express = require("express");

const app = express();
const port = 3000;

// Setting up DB
const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "sport_hub",
  port: 3306, // MAMP MySQL port
});

// Serving static website
app.use("/", express.static("./campus_sport_hub"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ─────────────────────────────────────────
//  CONTACT US ROUTES
// ─────────────────────────────────────────

// Insert contact
app.post("/contact_us/insert", (req, res) => {
  const data = {
    Fname      : req.body.firstname,
    Lname      : req.body.lastname,
    Email      : req.body.email,
    Gender     : req.body.gender,
    Phone      : req.body.number,
    DOB        : req.body.DOB,
    Lang       : req.body.language,
    Msg        : req.body.massege,
  };

  const query = "INSERT INTO contact_us SET ?";
  pool.query(query, data, (error, result) => {
    if (error) throw error;
    res.send("Contact message sent successfully!");
  });
});

// View all contacts
app.get("/contact_us/view", (req, res) => {
  const query = "SELECT * FROM contact_us";
  pool.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});


// ─────────────────────────────────────────
//  EVENT REGISTRATION ROUTES
// ─────────────────────────────────────────

// Insert registration
app.post("/registration/insert", (req, res) => {
  const data = {
    Full_Name   : req.body.Fullname,
    Student_ID  : req.body.StudentID,
    Event       : req.body.sport,
    Skill_Level : req.body.level,
    College     : req.body.college,
    Gender      : req.body.gender,
    Email       : req.body.Email,
  };

  const query = "INSERT INTO registration SET ?";
  pool.query(query, data, (error, result) => {
    if (error) throw error;
    res.send("Registration submitted successfully!");
  });
});

// View all registrations
app.get("/registration/view", (req, res) => {
  const query = "SELECT * FROM registration";
  pool.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});


// Activating server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});