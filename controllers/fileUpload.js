const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// define te handler
exports.localFileUpload = async (req,res) => {
    try{
        // fetch file
        const file = req.files.file;
        console.log("File fetch successfully",file);

        //create path where the data need to be stored
        const path = __dirname + "/files/" + Date.now() + "." + file.name.split(".")[1];

        // add path to the move function
        file.mv(path,(err)=>{
            console.log(err);
        })

        res.status(201).json({
            success : true,
            message : 'File uploaded successfully'
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Server error'
        })
    }
}

function isFileTypeMatch(type,supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder){
    const options = {folder};
    await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload = async (req,res) => {
    try{
        // fetch the data
        const {name, tags, email} = req.body;
        const file = req.files.imageFile;
        console.log(file);

        const supportedType = ["jpg","jpeg","png"];
        const fileType = file.name.split(".")[1];

        if(!isFileTypeMatch(fileType,supportedType)){
            return res.status(400).json({
                success : false,
                message : "file type not match"
            })
        }

        const response = await uploadFileToCloudinary(file,"codehelp");

        // upload the file in the cloudinary
        res.status(200).json({
            success : true,
            data : response,
            message : 'You image is uploaded successfully'
        })
        
    }catch(err){
        console.error(err);
        res.status(500).json({
            success : false,
            message : 'You image is not uploaded successfully'
        })
    }
}
