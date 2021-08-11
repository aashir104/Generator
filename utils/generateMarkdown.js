//-----GENERATES CLICKABLE LICENSE BADGES - CLICK TO OPEN LICENSE PAGE
function renderLicenseBadge(license, optional) {
    if (optional.badgeOption) 
    {
      if (license === "MIT") 
      {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
      }
      else if (license === "Apache") 
      {
        return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
      }
      else if (license === "GNU") 
      {
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
      }
      else if (license === "ISC") 
      {
        return "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)"
      }
      else if (license === "EPL") 
      {
        return "[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)"
      }
    }
    else {
      return license;
    }
  }
  
  //-----CREATES TABLE OF CONTENT-
  const tableOfContent = (optional) => 
  {
    let table = `
  * [License](#license)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Test](#test)
  * [Contribution](#contribution)`;
    
    if (optional.email) 
    {
      table = table.concat("\n* [email](#email)")
    }
  
    if (optional.credit) 
    {
      table = table.concat("\n* [Credits](#credits)")
    }
    return table;
  }

//-----CHECKS FOR THE OPTIONAL SECTIONS AND ADDS THEM IF THEY EXIST
const generateOptional = optional => {
  let text ="";

  if (optional.feature) 
  {
    text = text.concat(`
## Feature
    
${optional.feature}
    `)
  }

 
  if (optional.credit) 
  {
    text = text.concat(`
## Credits
    
${optional.credit}
    `)
  }
  return text;
}


//-MAIN SECTION THAT GENERATES THE MARKDOWN TEXT
function generateMarkdown(data) 
{
  console.log(data);
  
  const {title, description, installation, contribution, test, license, ...optional} = data;
  
  return `# ${title}
## Version 1.0
## Description

## Table of Contents
${tableOfContent(optional)}
## License
${renderLicenseBadge(license, optional)}
## Test
${test}
## Contribution
${contribution}
${generateOptional(optional)}`;
}

module.exports = generateMarkdown;