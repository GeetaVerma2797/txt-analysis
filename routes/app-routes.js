const express = require('express');
const router = express.Router({mergeParams:true});
const fileUploadHandler = require("../middleware/file-upload-handler")
const { uploadFile } = require('./../controllers/fileUpload');
const { analyseTaskByFileId, getAnalysisTaskById } = require('../controllers/analysis')
// POST requests
router.post('/file/upload', fileUploadHandler, uploadFile);
router.post('/analyseFile/:fileId', analyseTaskByFileId);
router.post('/getAnalysisTask/:taskId', getAnalysisTaskById);

module.exports = router;