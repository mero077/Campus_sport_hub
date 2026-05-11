const express = require("express");
const { check, validationResult } = require("express-validator");

const app = express();
const port = 4000;

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
app.use("/", express.static("./"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/HTML/index.html");
});

app.get("/page4", (req, res) => {
  res.sendFile(__dirname + "/HTML/page4.html");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function getContactValidation() {
  return [

    check("firstname")
      .notEmpty().withMessage("First name is required")
      .isLength({ min: 2, max: 20 }).withMessage("First name must be between 2 and 20 characters")
      .trim()
      .escape(),

    check("lastname")
      .notEmpty().withMessage("Last name is required")
      .isLength({ min: 2, max: 20 }).withMessage("Last name must be between 2 and 20 characters")
      .trim()
      .escape(),

    check("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Invalid email format")
      .normalizeEmail(),

    check("number")
      .notEmpty().withMessage("Phone number is required")
      .isNumeric().withMessage("Phone number must contain numbers only")
      .isLength({ min: 10, max: 10 }).withMessage("Phone number must be 10 digits"),

    check("message")
      .notEmpty().withMessage("Message is required")
      .isLength({ min: 5, max: 200 }).withMessage("Message must be between 5 and 200 characters")
      .trim()
      .escape()

  ];
}

function getRegistrationValidation() {
  return [

    check("Fullname")
      .notEmpty().withMessage("Full name is required")
      .isLength({ min: 3, max: 50 }).withMessage("Full name must be 3-50 characters")
      .trim()
      .escape(),

    check("StudentID")
      .notEmpty().withMessage("Student ID is required")
      .isNumeric().withMessage("Student ID must be numbers only"),

    check("sport")
      .notEmpty().withMessage("Sport is required"),

    check("level")
      .notEmpty().withMessage("Skill level is required"),

    check("college")
      .notEmpty().withMessage("College is required"),

    check("Email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Invalid email format")
      .normalizeEmail()

  ];
}


// Insert contact
app.post("/contact_us/insert" , getContactValidation(), (req, res) => {
  const errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.status(400).json({
    success: false,
    errors: errors.array()
  });
}
  const data = {
    firstname  : req.body.firstname,
    lastname   : req.body.lastname,
    email      : req.body.email,
    gender     : req.body.gender,
    number     : req.body.number,
    DOB        : req.body.DOB,
    language   : req.body.language,
    message    : req.body.message,
  };

  const query = "INSERT INTO contact_us SET ?";
  pool.query(query, data, (error, result) => {
    if (error) throw error;
    res.json({ status : true});
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


// Insert registration
app.post("/registration/insert", getRegistrationValidation(), (req, res) => {
  const errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.status(400).json({
    success: false,
    errors: errors.array()
  });
}
  const data = {
    Fullname   : req.body.Fullname,
    StudentID  : req.body.StudentID,
    sport      : req.body.sport,
    level      : req.body.level,
    college    : req.body.college,
    gender     : req.body.gender,
    Email      : req.body.Email,
  };

  const query = "INSERT INTO registration SET ?";
  pool.query(query, data, (error, result) => {
    if (error) throw error;
    res.json({ status: true });
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