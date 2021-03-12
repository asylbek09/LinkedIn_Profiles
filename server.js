// server created and called
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const server = express();

// body-parser should be before CRUD operations
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// create port and listen to it
const PORT = "8080";
server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

// access to DB
const profiles = require("./db");
server.use(express.static((__dirname, 'public')));

// GET request, return all the students 
server.get("/profiles", (req, res) => res.send(profiles));
server.get("/", function (req, res) { res.sendFile(__dirname + '/public/index.html') });

server.get("/add", (req, res) => res.send(profiles));
// POST request, send data to db
server.get("/:id", (req, res) => {
    let result = "";
    for (let i = 0; i < profiles.length; i++) {
        if ((profiles[i].id).toString() === req.params.id) {
            result = profiles[i];
            break;
        }
    }
    res.send(result);
});

server.put("/", (req, res) => {
    console.log(req.body.name);
    // profiles.forEach
    for (let i = 0; i < profiles.length; i++) {
        if ((profiles[i].id).toString() === req.body.id) {
            profiles[i].name = req.body.name;
            profiles[i].company = req.body.company;
            profiles[i].role = req.body.role;
            profiles[i].linkedIn = req.body.linkedIn;
            profiles[i].picture = req.body.picture;
            break;
        }
    }
    res.send({ result: "success"});
});

server.post("/add", (req, res) => {
    const { id, name, company, linkedIn, picture, role } = req.body;

    if (!name || !company || !linkedIn || !picture || !role) {
        return res.status(400).json({
            error: "name, company, linkedIn, picture, role are required"
        })
    }
    req.body.id = profiles.length;
    profiles.push(req.body);
});

server.delete("/", (req, res) => {
    console.log("request id: " + req.body.id);
    let id = profiles.findIndex((el) => el.id == req.body.id);
    console.log(id);
    profiles.splice(id, 1);
    console.log(req.body);
    res.send({ success: true })

    // let { id } = req.body;
    // profiles = profiles.filter((student) => student.id !== id);
    // res.status(200).json({ status: "success" });
});