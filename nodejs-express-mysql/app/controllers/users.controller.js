const Users = require("../models/Users.model.js");
const bcrypt = require('bcrypt');


// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }


    // Create a Tutorial
    const users = new Users({
        username: req.body.username,
        password: req.body.password,
    });

    // Save Tutorial in the database
    Users.create(users,async (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        else {
            //password comparret
            const comparePassword = await bcrypt.compare(
                users.password,
                data.password
            );
            if (!comparePassword) {
                return next(createError(400, "Wrong password or username!"));
            }
            res
            .status(200)
            .json({ ...data});

            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.jwtkey
            );
            // const { password, isAdmin, ...otherdetails } = ;
            res
                .cookie("access_token", token)
                .status(200)
                .json({ details: { ...otherdetails }, isAdmin });
        }
    });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;

    Users.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

// Find a single Tutorial by Id
exports.findOne = (req, res) => {
    Users.findById(req.params.email, (err, data) => {
        console.log(Users)

       
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id " + req.params.email
                });
            }
        } else res.send(data);
    });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
    Users.getAllPublished((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Users.updateById(
        req.params.id,
        new Tutorial(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Tutorial with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Tutorial with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Users.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Tutorial with id " + req.params.id
                });
            }
        } else res.send({ message: `Tutorial was deleted successfully!` });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Users.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        else res.send({ message: `All Tutorials were deleted successfully!` });
    });
};
