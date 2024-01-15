const fs = require("fs");
const { insertFileDetails } = require('../models/queries')

module.exports = {
    uploadFile: async function (req, res) {
        try {
            const url = req.protocol + "://" + req.get("host");
            const filePath = url + '/files/' + req.file.filename;
            fs.readFile(req.file.path, "utf-8", async (err, data) => {
                try {
                    if (err) {
                        throw Error('Error in reading file');
                    } else {
                        let params = {
                            fileName: req.file.filename,
                            filePath: filePath,
                            data: data.replace(/(\r\n|\n|\r)/gm, "")

                        }
                        let insertData = await insertFileDetails(params);
                        if (insertData) {
                            if (insertData.insertId > 0) {
                                return res.status(200).json({ "message": "File uplaoded successfully", "code": 200, "fileId": insertData.insertId })
                            }
                        }
                        return res.status(500).json({ "message": "Something went wrong", "code": 500, "error": '' })
                    }
                } catch (error) {
                    return res.status(500).json({ "message": "Something went wrong", "code": 500, "error": JSON.stringify(error) })
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ "message": "Something went wrong", "code": 400, "error": error })
        }
    }
}