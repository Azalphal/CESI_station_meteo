const Probe = require("../models/probe.js");
//const models = require('../models');
//const Probe = models.Probe;


const validateProbeInput = (newProbe) => {
    if (!newProbe || typeof newProbe !== "object" ||
        !("name" in newProbe)) {
        throw new Error("Invalid input: Missing required fields.")
    }
};

// Create and Save a new Data
exports.create = (req, res) => {

    validateProbeInput(req);

    const newData = new Probe({
        name: req.body.name
    });

    try {
        Probe.create(newData, (err, result) => {
            return res.status(201).json(result);
        })
    } catch (err) {
        return res.status(400).json({error: "Validation error", details: err.message});
    }


    /*// Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Data
    const data = new data({
        humidity: req.body.humidity,
        temperature: req.body.temperature,
        position: req.body.position
    });

    // Save Data in the database
    Data.create(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Data."
            });
        else res.send(data);
    });*/
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;

    Probe.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

// Find a single Data by Id
exports.findOne = (req, res) => {
    Probe.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Data with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
    Probe.getAllPublished((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

// Update a Data identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Probe.updateById(
        req.params.id,
        new Probe(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Tutorial with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Data with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};