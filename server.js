const inquirer = require("inquirer");
const cTable = require("console.table");
const sql = require('./db/query_lib');
const cHelper = require('./db/choiceHelper');


const newDept = async () => {  
const deptartment = await inquirer.prompt([
    {
    type: "input",
    name: "name",
    message: "What is the name of the Department",
    validate: (name) =>{
        if (name) {
        return true;
        } else {
        console.log("Enter a Department Name!")
        return false;
        }
    },
    },
]);

await sql.addDept(deptartment);
chooseRequest();
}
const newEmp = async () => {
const roleArr = await cHelper.roleChoices();
const mgmtArr = await cHelper.mgmtChoices();
const emp = await inquirer.prompt([
    {
        type: "input",
        name: "first",
        message: "What is the Employees First Name?",
        validate: (first) =>{
        if (first && isNaN(first)) {
            return true;
        } else {
            console.log("Enter a Name!")
            return false;
        }
        },
    },
    {
    type: "input",
    name: "last",
    message: "What is the Employees Last Name?",
    validate: (last) =>{
        if (last && isNaN(last)) {
        return true;
        } else {
        console.log("Enter a Name!")
        return false;
        }
    },
    },
    {
    type: "list",
    name: 'role_id',
    message: "What is the Employees Role?",
    choices: roleArr,
    loop: false,
    },
    {
    type: "list",
    name: 'manager_id',
    message: "Who is the Employees Manager?",
    choices: mgmtArr,
    loop: false,
    }
]);
await sql.addEmp(emp);
chooseRequest();  
}

const newRole = async () => {
const choicesArr = await cHelper.deptChoices();
const role = await inquirer.prompt([
    {
        type: "input",
        name: "title",
        message: "What is the name of the Role?",
        validate: (title) =>{
        if (title) {
            return true;
        } else {
            console.log("Enter a Role Name!")
            return false;
        }
        },
    },
    {
    type: "input",
    name: 'salary',
    message: "What is the Salary of the Role?",
    validate: (salary) =>{
        if(salary && !isNaN(salary)){
        return true;
        } else {
        console.log("Enter a Role Salary");
        }
    }
    },
    {
    type: "list",
    name: 'department_id',
    message: "What Department is the Role associated with?",
    choices: choicesArr,
    loop: false,
    }
]);
await sql.addRole(role);
chooseRequest();  
}



const updateEmpRole = async () => {
const roleArr = await cHelper.roleChoices();
const empArr = await cHelper.empChoices();
const emp = await inquirer.prompt([
    {
    type: "list",
    name: "emp_id",
    message: "What is the Employee do you want to update?",
    choices: empArr,
    loop: false,
    },
    {
    type: "list",
    name: 'role_id',
    message: "What is the Employees Role?",
    choices: roleArr,
    loop: false,
    }
]);
await sql.updateEmpRoleById(emp);
chooseRequest();  
}

