const { exec } = require('child_process');

const conveter = async (document, format) => {

    const command1 = "soffice --version";
    const command2 = "echo 'teste' > teste1.txt";

    exec(command2, (error, stdout, stderr) => {

        if(error){
            console.error(`exec error: ${error}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        
    });

}

module.exports = conveter;