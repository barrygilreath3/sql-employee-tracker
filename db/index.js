const connection = require('./connection.js');

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    
    findDepartments() {
    return this.connection.promise().query(
        "SELECT department.id, department.name FROM department;"
        );
    }

    findRoles() {
        return this.connection.promise().query(
            "SELECT * FROM role"
        );
    }

    addDepartment(name) {
        return this.connection.promise().query(
            "INSERT INTO department SET ?", name
        );
    }

    addRole(role) {
        return this.connection.promise().query(
            "INSERT INTO role SET ?", role
        );
    }

    deleteDepartment(id) {
        return this.connection.promise().query(
            "DELETE FROM department WHERE id = ?", id
        );
    }
}

module.exports = new DB(connection);