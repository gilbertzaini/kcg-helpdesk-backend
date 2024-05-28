const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const { Tickets, Employees } = require("./models");

const app = express();

// cors
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);

// Routes
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.status(200).send({ message: "Server is running." })
);

// Multer Config
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });

// Employees routes
app.get("/employees", async (req, res) => {
  try {
    const response = await Employees.findAll();
    res.status(200).json(response);
    console.log(response);
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/employees", async (req, res) => {
  try {
    console.log(req.body);
    const newEmp = await Employees.create(req.body);
    res.status(201).json({ msg: "Employee Created", Employees: newEmp });
    console.log(response);
  } catch (e) {
    console.log(e.message);
  }
});

// Tickets routes
app.get("/tickets", async (req, res) => {
  try {
    const response = await Tickets.findAll();
    res.status(200).json(response);
    console.log(response);
  } catch (e) {
    console.log(e.message);
  }
});

app.post("/tickets", uploadFile.single('file_path'), async (req, res) => {
  try {
    if (req.file) {
        req.body.file_path = `uploads/${req.file.filename}`;
      }
    const newTicket = await Tickets.create(req.body);
    res.status(201).json({ msg: "Ticket Created", Tickets: newTicket });
    console.log(response);
  } catch (e) {
    console.log(e.message);
  }
});

app.patch("/tickets/:id", uploadFile.single('file_path'), async (req, res) => {
  try {
    const { assigned_by, status, file_path } = req.body;
    const assigner = await Employees.findByPk(assigned_by);

    // Authorization & patch
    if (
      (assigner.role === "Assigner" && status === "pending") ||
      (assigner.role === "QC" && status === "done")
    ) {
      if (req.file) {
        req.body.file_path = `uploads/${req.file.filename}`;
      }

      const response = await Tickets.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({ msg: "Ticket Updated", Tickets: response });
      console.log(response);
    } else {
      res.status(400).json({
        msg: `${assigner.name}(${assigned_by}) doesn't have the authority`,
      });
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.delete("/tickets/:id", async (req, res) => {
  try {
    await Tickets.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Ticket Deleted" });
    console.log(response);
  } catch (e) {
    console.log(e.message);
  }
});

// start server
app.listen(8000, () => {
  console.log("Running on port 8000");
});
