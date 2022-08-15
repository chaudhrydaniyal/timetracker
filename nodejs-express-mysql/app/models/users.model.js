const sql = require("./db.js");

// constructor
const User = function (user) {
    this.username = user.username;
    this.password = user.password;
};


User.create = (newTutorial, result) => {
    console.log(newTutorial)
    sql.query(`SELECT * FROM users WHERE username = "${newTutorial.username}"`,  (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("res", res)
        if (res.length) {
            console.log("found tutorial: ", res[0]);
                  result(null, res[0]);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};


User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE username = "${id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("res", res)
        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};



User.getAll = (title, result) => {
    let query = "SELECT * FROM users";
    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("tutorials: ", res);
        result(null, res);
    });
};


User.getAllPublished = result => {
    sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("tutorials: ", res);
        result(null, res);
    });
};


User.updateById = (id, tutorial, result) => {
    sql.query(
        "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
        [tutorial.title, tutorial.description, tutorial.published, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated tutorial: ", { id: id, ...tutorial });
            result(null, { id: id, ...tutorial });
        }
    );
};


User.remove = (id, result) => {
    sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted tutorial with id: ", id);
        result(null, res);
    });
};


User.removeAll = result => {
    sql.query("DELETE FROM tutorials", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} tutorials`);
        result(null, res);
    });
};

module.exports = User;
