const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const fileUpload = require("express-fileupload");

const cloudinaryConnect = require("./config/couldinary")
cloudinaryConnect();

const mongodb = require("./config/database");
mongodb();

app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use("/api/v1/upload",require("./routes/fileUpload"));


app.listen(PORT,()=>{
    console.log(`Server is listen at ${PORT}`);
})
