require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const uuid = require("uuid");
const tmp = require("tmp");

const convertedFilesDir = tmp.dirSync();
console.log(`Created temp path ${convertedFilesDir.name}`);

const controller = require("./src/converter");

const app = express();
const PORT = process.env.PORT;

app.use(fileUpload({
    limitHandler: { fileSize: process.env.LIMIT_FILE_SIZE },
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    req.tid = uuid.v4();
    console.log(`Transaction ${req.tid}`);
    req.convertedFilesDir = convertedFilesDir.name;
    next();
});

app.get("/api", async (req, res) => {
    return res.status(200)
    .json({
        msg: "conversor pdf api"
    });
});

app.post("/api/converter", controller.conveter);
app.get("/api/version", controller.checkVersion);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on("exit", () => {
    if(process.env.REMOVE_TEMP_ON_EXIT === "true"){
        console.log(`Removing temp dir ${convertedFilesDir.name}`);
        convertedFilesDir.removeCallback();
    }
});