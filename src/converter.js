const { exec } = require('child_process');
const path = require("path");


const conveter = async (req, res) => {

    const file = req.files.file;
    const tmpDir = req.convertedFilesDir;

    const cmd = `soffice --headless --convert-to pdf ${file.tempFilePath} --outdir ${tmpDir}`;

    exec(cmd, (error, stdout, stderr) => {

        if(error){
            console.error(`exec error: ${error}`);
            return;
        }

        const regex = new RegExp("\/tmp\/tmp\-[0-9A-Za-z]+\/tmp-[0-9]\-[0-9]+\.pdf", "gm");
        const pathFileConverted = regex.exec(stdout)[0];

        // return res.status(200)
        // .json({
        //     stdout,
        //     stderr,
        //     file,
        //     cmd: cmd,
        //     tmpDir: tmpDir,
        //     fileConverted
        // });

        return res.download(pathFileConverted);
        
    });
}

const checkVersion = async (req, res) => {

    exec("soffice --version", (error, stdout, stderr) => {

        if(error){
            console.error(`exec error: ${error}`);
            return res.status(500).json({ msg: "Internal server error" });
        }

        return res.status(200)
        .json({ msg: stdout, tmpPathConveted: req.convertedFilesDir });
        
    });

}

module.exports = {
    conveter,
    checkVersion
};