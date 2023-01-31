const mongoose = require("mongoose");

const projectphases = mongoose.model(
    "projectphases",
    new mongoose.Schema({

        phase: String,
        ExpectedStartDate: Date,
        ExpectedEndDate: Date,
        
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "projects"
        }

    })
);

module.exports = projectphases;