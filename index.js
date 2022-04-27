// Constant Variables
const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./db/index.js');

function runProgram() {
    console.log("WELCOME TO EMPLOYEE MANAGER")
    askQuestions();
}

runProgram();

// Ask the User Questions
function askQuestions () {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "Navigate up or down. Make your choice by pressing the ENTER key.",
            choices: [
                {
                    name: "View All Departments",
                    value: "Departments"
                },
                {
                    name: "View All Roles",
                    value: "Roles"
                },    
                {
                    name: "View All Employees",
                    value: "Employees"
                },
                {
                    name: "Add Department",
                    value: "Add Department"
                },    
                {
                    name: "Add Role",
                    value: "Add Role"
                },  
                {
                    name: "Add Employee",
                    value: "Add Employee"
                },
                {
                    name: "Update Employee Role",
                    value: "Update Employee Role"
                },
                {
                    name: "End Program",
                    value: "End Program"
                }
            ]
        }
    ]).then (answers => {
        // User feedback
        var userChoice = answers.userChoice;
        switch (userChoice) {
            case "Departments":
                showDepartments();
            case "Roles":
                showRoles();
            case "Employees":
                showEmployees();
            case "Add Department":
                addDepartment()
            case "Add Role":
                addRole();
            case "Add Employee":
                addEmployee();
            case "Update Employee Role":
                updateEmployeeRole();
            case "End Program":
                endProgram();
            }
        })

    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    })
};

function showDepartments() {
    db.findDepartments().then(([rows]) => {
        var departments = rows;
        console.table(departments);
    })
    .then(() => askQuestions());
};

function showRoles () {
    console.log ("")
}

function showEmployees () {
    console.log ("")
}

function addDepartment () {
    console.log ("")
}

function addRole () {
    console.log ("")
}

function addEmployee () {
    console.log ("")
}

function updateEmployeeRole () {
    console.log ("")
}

function endProgram () {
    console.log ("")
}