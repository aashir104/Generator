const inquirer = require("inquirer");
const readFolderfiles = require("./utils/folderfilesReader");
const generateMarkdown = require("./utils/generateMarkdown");
const writeFile = require("./utils/markdown");

let ssList = [];

//ARRAY FOR INQUIRER - LIST OF QUESTIONS
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the title of your project!!(Required)\n",
        validate: titleInput => {
            if (titleInput) 
            {
                return true;
            }
            else {
                console.log("\n please try again!! Title cannot be blank. \n");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "description",
        message: "What is the description for this project!!\n",
        validate: descriptionInput => {
            if (descriptionInput.split(' ').length > 4) 
            {
                return true;
            }
            else {
                console.log("\nPlease enter atleast five words!!\n");
                return false;
            }
        }
    },
    {
        type: "editor",
        name: "installation",
        message: "How to install this project!!\n",
        validate: installationInput => {
            if (installationInput.split(' ').length > 4) 
            {
                return true;
            }
            else {
                console.log("\nPlease enter atleast five words!!\n");
                return false;
            }
        }
    },
    {
        type: "editor",
        name: "usage",
        message: "What is the usage information for the project!!\n",
        validate: usageInput => {
            if (usageInput.split(' ').length > 4) 
            {
                return true;
            }
            else {
                console.log("\nPlease enter atleast five words!!\n");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "contribution",
        message: "What are the contribution guidelines for the project (minimum five words)!!\n",
        validate: contributionInput => {
            if (contributionInput.split(' ').length > 4) 
            {
                return true;
            }
            else {
                console.log("\nPlease enter atleast five words!!\n");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "test",
        message: "What are the test instructions for the project!!\n",
        validate: testInput => {
            if (testInput.split(' ').length > 4) 
            {
                return true;
            }
            else {
                console.log("\Please enter atleast five words!!\n");
                return false;
            }
        }
    },
    {
        type: "list",
        name: "license",
        message: "Data you would want to add?",
        choices: [
            "MIT", "Apache","GNU", "ISC", "EPL"
        ]
    },
    {
        type: "confirm",
        name: "badgeOption",
        message: " Would you like to add badge for your license?",
        default: false
    },
    {
        type: "confirm",
        name: "emailoption",
        message: " Would you like to add an email?",
        default: false
    },
    {
        type: "input",
        name: "email",
        message: "Please enter your email!!\n",
        when: ({emailoption}) => {
            if (emailoption) {
                return true;
            } else {
                return false;
            }
        },
        validate: input => {
            if (input) {
                return true;
            }
            else {
                console.log("\ncannot be blank, please try again!!\n");
                return false;
            }
        }
    },
    {
        type: "confirm",
        name: "creditOption",
        message: "Would you like to add credits for your project?",
        default: false
    },
    {
        type: "editor",
        name: "credit",
        message: "Please enter credits for your project!!\n",
        when: ({creditOption}) => {
            if (creditOption) {
                return true;
            } else {
                return false;
            }
        },
        validate: input => {
            if (input) {
                return true;
            }
            else {
                console.log("\nEntry cannot be blank, please try again!!\n");
                return false;
            }
        }
    },

    {
        type: "editor",
        name: "feature",
        message: "Please enter features for your project!!\n",
        when: ({creditOption}) => {
            if (creditOption) {
                return true;
            } else {
                return false;
            }
        },
        validate: input => {
            if (input) {
                return true;
            }
            else {
                console.log("\nEntry cannot be blank, please try again!!\n");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "fileName",
        message: "Please enter name of the Read Me file!!",
        default: "README"
    },
    
]


//-----INITIATES THE INQUIRER-----//
function init() {
    console.log(`
    
    README GENERATOR - Welcome to the README generator,
    Please follow the instructions.
    
    `)
    return inquirer
        .prompt(questions);
};

//-----MAIN CALL LOGIC-----//
readFolderfiles()
    .then(response => {
        ssList = response;
    })
    .then(init)
    .then(readmeInputs => {
        return {
            markdownText: generateMarkdown(readmeInputs), 
            fileName: readmeInputs.fileName
        };
    })
    .then(writeFileData => {
        return writeFile(writeFileData);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
    })
    .catch(err => {
        console.log(err);
    })