const { exec } = require('child_process');
const path = require("path");

const FILES_PATH = path.resolve(__dirname, `../${process.env.FILES_FOLDER}`);

const conveter = async (req, res) => {

    return res.json(req.files.teste);

    // const file_name = "teste1.odt";

    // const cmd = `soffice --headless --convert-to pdf ${FILES_PATH}/${file_name}`;

    // exec(cmd, (error, stdout, stderr) => {

    //     if(error){
    //         console.error(`exec error: ${error}`);
    //         return;
    //     }

    //     console.log(stderr);

    //     return res.status(200)
    //     .json({
    //         stdout,
    //         stderr,
    //         path: FILES_PATH
    //     });
        
    // });
}

const checkVersion = async (req, res) => {

    exec("soffice --version", (error, stdout, stderr) => {

        if(error){
            console.error(`exec error: ${error}`);
            return res.status(500).json({ msg: "Internal server error" });
        }

        return res.status(200)
        .json({ msg: stdout });
        
    });

}

module.exports = {
    conveter,
    checkVersion
};