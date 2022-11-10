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

    selectPhase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projectphases'
    },

    assignedTo:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

}, { timestamps: true },)

module.exports = mongoose.model("assignedTasks", assignedTasks);
