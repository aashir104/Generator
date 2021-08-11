//-----DECLARATION SECTION-----//
const inquirer = require("inquirer");
//Read image folder
const readFolderfiles = require("./utils/folderfilesReader");
//Generate README template
const generateMarkdown = require("./utils/generateMarkdown");
//Write the template on file
const writeFile = require("./utils/markdown");

//Empty image list array
let ssList = [];

//-----ARRAY FOR INQUIRER - LIST OF QUESTIONS-----//
const questions = [
    {
        type: "input",
        name: "title",
        message: "Please enter the title of your project!!(Required)\n",
        validate: titleInput => {
            if (titleInput) {
                return true;
            }
            else {
                console.log("\nTitle cannot be blank, please try again!!\n");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "description",
        message: "Please provide description for this project (minimum five words)!!\n",
        validate: descriptionInput => {
            if (descriptionInput.split(' ').length > 4) {
                return true;
            }
            else {
                console.log("\nPlease input at least five words!!\n");
                return false;
            }
        }
    },
    {
        type: "editor",
        name: "installation",
        message: "Please provide instructions on how to install this project (minimum five words)!!\n",
        validate: installationInput => {
            if (installationInput.split(' ').length > 4) {
                return true;
            }
            else {
                console.log("\nPlease input at least five words!!\n");
                return false;
            }
        }
    },
    {
        type: "editor",
        name: "usage",
        message: "Please enter the usage information for the project (minimum five words)!!\n",
        validate: usageInput => {
            if (usageInput.split(' ').length > 4) {
                return true;
            }
            else {
                console.log("\nPlease input at least five words!!\n");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "contribution",
        message: "Please provide contribution guidelines for the project (minimum five words)!!\n",
        validate: contributionInput => {
            if (contributionInput.split(' ').length > 4) {
                return true;
            }
            else {
                console.log("\nPlease input at least five words!!\n");
                return false;
            }
        }
    },
    {
        type: "input",
        name: "test",
        message: "Please provide test instructions for the project (minimum five words)!!\n",
        validate: testInput => {
            if (testInput.split(' ').length > 4) {
                return true;
            }
            else {
                console.log("\nPlease input at least five words!!\n");
                return false;
            }
        }
    },
    {
        type: "list",
        name: "license",
        message: "Please select optional data you want to add?",
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
        type: "confirm",
        name: "emailoption",
        message: "Would you like to add an email ",
        default: false
    },
    {
        type: "editor",
        name: "feature",
        message: "Please enter email for the project!!\n",
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
    {
        type: "confirm",
        name: "addSs",
        message: "Would you like to add screenshots to your project?",
        default: false
    }
]



//-----INITIATES THE INQUIRER-----//
function init() 
{
    console.log(`
    
    README GENERATOR - Please follow the instructions.
    
    `)
    return inquirer
        .prompt(questions);
};

//-----MAIN CALL LOGIC-----//
readFolderfiles()
    .then(response => 
    {
        ssList = response;
    })

    .then(init)
    .then(readmeInputs => 
     {
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