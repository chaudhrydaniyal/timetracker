const mongoose = require("mongoose")

const assignedTasks = mongoose.Schema({

    date: {
        type: Date,
    },

    title: {
        type: String,
    },

    description: {
        type: String,
    },

    startDate: {
        type: Date,
    },

    endDate: {
        type: Date,
    },

    phase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projectphases'
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects'
    },

    assignedTo:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    status: {
        type: String,
    },

}, { timestamps: true },)

module.exports = mongoose.model("assignedTasks", assignedTasks);
