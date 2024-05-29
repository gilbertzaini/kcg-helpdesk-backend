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
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

// var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
var uploadFile = multer({ storage: storage });

// Employees routes
// Get all employees
app.get("/employees", async (req, res) => {
  try {
    const response = await Employees.findAll();

    console.log(response);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e.message);
  }
});

// Get employees by division
app.get("/employees/:employee_id", async (req, res) => {
  try {
    const tickets = await Tickets.findAll();
    const user = await Employees.findByPk(req.params.employee_id);
    const employees = await Employees.findAll({
      where: { division: user.division },
    });
    const response = [];

    employees.forEach((employee) => {
      const newEmpBody = {
        employee_id: employee.employee_id,
        name: employee.name,
        division: employee.division,
        newTicket: 0,
        pendingTicket: 0,
        QCTicket: 0,
        doneTicket: 0,
      };

      tickets.forEach((ticket) => {
        if (ticket.assigned_by === employee.employee_id) {
          if (ticket.status === "new") newEmpBody.newTicket += 1;
          if (ticket.status === "pending") newEmpBody.pendingTicket += 1;
          if (ticket.status === "QC") newEmpBody.QCTicket += 1;
          if (ticket.status === "done") newEmpBody.doneTicket += 1;
        }
      });

      response.push(newEmpBody);
    });

    return res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e.message);
  }
});

// Create employee
app.post("/employees", async (req, res) => {
  try {
    console.log(req.body);
    const newEmp = await Employees.create(req.body);

    console.log(response);
    return res.status(201).json({ msg: "Employee Created", Employees: newEmp });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e.message);
  }
});

// get employee by ID
app.get("/employees/:id", async (req, res) => {
  try {
    const response = await Employees.findByPk(req.params.id);

    console.log(response);
    return res.status(201).json({ msg: "Employee Data", Employees: response });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e.message);
  }
});

// Tickets routes
// Get all tickets
app.get("/tickets", async (req, res) => {
  try {
    const response = await Tickets.findAll();

    console.log(response);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e.message);
  }
});

// Get tickets by status
app.get("/tickets/:status", async (req, res) => {
  try {
    const response = await Tickets.findAll({
      where: { status: req.params.status },
    });

    console.log(response);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e.message);
  }
});

// Get ticket by ID
app.get("/tickets/:id", async (req, res) => {
  try {
    const response = await Tickets.findByPk(req.params.id);

    console.log(response);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e.message);
  }
});

// Create ticket
app.post(
  "/tickets/:request_id",
  uploadFile.single("file_path"),
  async (req, res) => {
    try {
      const reqUser = await Employees.findByPk(req.params.request_id);
      req.body.assigned_by = reqUser.employee_id;
      req.body.divisi = reqUser.division;

      if (req.file) {
        req.body.file_path = `uploads/${req.file.filename}`;
      }
      const newTicket = await Tickets.create(req.body);

      console.log(response);
      return res
        .status(201)
        .json({ msg: "Ticket Created", Tickets: newTicket });
    } catch (e) {
      console.log(e.message);
      return res.status(500).send(e.message);
    }
  }
);

// Update ticket
app.patch("/tickets/:id/:user_id", async (req, res) => {
  try {
    console.log(req.body);
    const user = await Employees.findByPk(req.params.user_id);
    const selectedTicket = await Tickets.findByPk(req.params.id);

    // Authorization & patch
    if (
      (selectedTicket.status === "pending" ||
        selectedTicket.status === "process") &&
      selectedTicket.assigned_to === user.employee_id
    ) {
      if (selectedTicket.status === "pending") req.body.status = "process";
      else req.body.status = "QC";
      const response = await Tickets.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      console.log(response);
      return res.status(200).json({ msg: "Ticket Updated", Tickets: response });
    }

    if (
      (user.role === "Assigner" && selectedTicket.status === "new") ||
      (user.role === "QC" && selectedTicket.status === "QC")
    ) {
      if (user.role === "Assigner") req.body.status = "pending";
      else if (user.role === "QC") req.body.status = "done";

      const response = await Tickets.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      console.log(response);
      return res.status(200).json({ msg: "Ticket Updated", Tickets: response });
    }

    return res.status(400).json({
      msg: `${user.name}(${user.employee_id}) doesn't have the authority`,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e.message);
  }
});

// Delete ticket
app.delete("/tickets/:id", async (req, res) => {
  try {
    const response = await Tickets.destroy({
      where: {
        id: req.params.id,
      },
    });

    console.log(response);
    if (response === 0)
      return res.status(404).json({ msg: "Ticket not found" });
    else return res.status(200).json({ msg: "Ticket Deleted" });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e.message);
  }
});

// start server
app.listen(8000, () => {
  console.log("Running on port 8000");
});
