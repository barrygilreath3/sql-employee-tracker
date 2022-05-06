// Constant Variables
const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./db/index.js');

function runProgram() {
    console.log("WELCOME TO EMPLOYEE MANAGER")
    askQuestions();
}

// Ask the User Questions
function askQuestions () {
    inquirer.prompt([
        {
            name: "userChoice",
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
                    name: "Delete Department",
                    value: "Delete Department"
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
        // User 
        var userChoice = answers.userChoice;
        switch (userChoice) {
            case "Departments":
                showDepartments();
                break;
            case "Roles":
                showRoles();
                break;
            case "Employees":
                showEmployees();
                break;
            case "Add Department":
                addDepartment()
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Delete Department":
                deleteDepartment();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "End Program":
                endProgram();
            }
        })

    // .catch((error) => {
    //     if (error.isTtyError) {
    //         // Prompt couldn't be rendered in the current environment
    //     } else {
    //         // Something else went wrong
    //     }
    // })
};

function showDepartments() {
    db.findDepartments().then(([rows]) => {
        var departments = rows;
        console.table(departments);
    })
    .then(() => askQuestions());
};

function showRoles () {
    db.findRoles().then(([rows]) => {
        var roles = rows;
        console.table(roles);
    })
    .then(() => askQuestions());
}

function showEmployees () {
    db.findEmployees().then(([rows]) => {
        var employees = rows;
        console.table(employees);
    })
    .then(() => askQuestions());
}

function addDepartment () {
    inquirer.prompt({
        type: 'input',
        name: 'dept',
        message: 'What department would you like to add?'
    }).then (answer => {
        var nameObj = {name:answer.dept};
        db.addDepartment(nameObj).then(res => {
            showDepartments();
        });            
    })
}

async function addRole () {
    const [departments] = await db.findDepartments();
    var departmentArray = departments.map(({id, name}) =>({
        name: name,
        value: id
    }))
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What role would you like to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this position?'
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'What is the department for this role?',
            choices: departmentArray
        }
    ]).then (answer => {
        console.log(answer);
        var roleObj = {
            title:answer.role,
            salary:answer.salary,
            department_id:answer.departmentId
        };
        db.addRole(roleObj).then(res => {
            showRoles();
        });            
    })
}

async function addEmployee () {
    const [roles] = await db.findRoles();
    var roleArray = roles.map(({id, title}) =>({
        name: title,
        value: id
    }));

    const [employees] = await db.findEmployees();
    var employeeArray = employees.map(({id, first_name, last_name}) =>({
        name: first_name + " " + last_name,
        value: id
    }));

    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the name of the new employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the new employee?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the role of the new employee?',
            choices: roleArray
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the manager of the new employee?',
            choices: employeeArray
        }
]).then (answer => {
        var newEmp = {first_name:answer.first_name, last_name:answer.last_name, role_id:answer.role, manager_id:1};
        db.addEmployee(newEmp).then(res => {
            showEmployees();
        });
    })
}

function updateEmployeeRole () {
    console.log ("cue employees")
}

async function deleteDepartment() {
    const [departments] = await db.findDepartments();
    var departmentArray = departments.map(({id, name}) =>({
        name: name,
        value: id
    }));
    inquirer.prompt({
        type: 'list',
        message: 'What department would you like to delete?',
        name: 'departmentId',
        choices: departmentArray
    }).then (answer => {
        db.deleteDepartment(answer.departmentId).then(res => showDepartments());
    })
}

runProgram();

function endProgram () {
    process.exit();
}