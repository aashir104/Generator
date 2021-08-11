const fs = require("fs");

//WRITES FILE AND CREATES README FILE
const writeFile = writeFileData => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`./${writeFileData.fileName}.md`, writeFileData.markdownText, err => {
            
            if (err) 
            {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: "File created!"
            })
        })
    });
};

module.exports = writeFile;