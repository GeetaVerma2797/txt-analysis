const { getFileDetailsByFileId, insertAnalysisTask, getAnalysisByTaskId } = require('../models/queries')

module.exports = {
    analyseTaskByFileId: async function (req, res) {
        try {
            const fileId = req.params.fileId;
            if (req.params.fileId && !isNaN(fileId)) {
                let fileData = await getFileDetailsByFileId(fileId);
                if (fileData && fileData[0]) {
                    let countWords = null;
                    let countUniqueWords = null;
                    let kTopWords = [];
                    const metadata = fileData[0].metadata;
                    let splitData = (metadata.trim().split(/\s+/));
                    if (req.body.countWords) {
                        countWords = splitData.length
                    }
                    if (req.body.countUniqueWords) {
                        let set = new Set(metadata.split(' '));
                        countUniqueWords = set.size;
                    }
                    if (req.body.kTopWords && !isNaN(req.body.kTopWords)) {
                        let mp = new Map();
                        for (let i = 0; i < splitData.length; i++) {
                            if (mp.has(splitData[i])) {
                                mp.set(splitData[i], mp.get(splitData[i]) + 1)
                            } else {
                                mp.set(splitData[i], 1)
                            }
                        }
                        console.log(mp)
                        let mapList = [...mp];
                        // Sort the list
                        mapList.sort((obj1, obj2) => {
                            if (obj1[1] == obj2[1])
                                return obj2[0] - obj1[0];
                            else
                                return obj2[1] - obj1[1];
                        })
                        for (let i = 0; i < req.body.kTopWords; i++) {
                            kTopWords.push(mapList[i][0])
                        }
                    }
                    let params = {
                        fileId: fileId,
                        countWords: countWords,
                        countUniqueWords: countUniqueWords,
                        kTopWords: kTopWords
                    }
                    let insertData = await insertAnalysisTask(params);
                    if (insertData) {
                        if (insertData.insertId > 0) {
                            return res.status(200).json({ "message": "File uplaoded successfully", "code": 200, "taskId": insertData.insertId })
                        }
                    }
                    return res.status(500).json({ "message": "Something went wrong", "code": 500, "error": '' })
                }
            }
            return res.status(500).json({ "message": "File id should be numeric value", "code": 500, "error": '' })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ "message": "Something went wrong", "code": 400, "error": error })
        }
    },
    getAnalysisTaskById: async function (req, res) {
        try {
            const taskId = req.params.taskId;
            if (req.params.taskId && !isNaN(taskId)) {
                let params = [];
                if (req.body.countWords && req.body.countWords == true) {
                    params.push('t.count_words');
                }
                if (req.body.countUniqueWords && req.body.countUniqueWords == true) {
                    params.push('t.count_uique_words');
                }
                if (req.body.kTopWords && req.body.kTopWords == true) {
                    params.push('t.k_words');
                }
                let taskData = await getAnalysisByTaskId(taskId, params);
                if (taskData && taskData[0]) {
                    return res.status(200).json({ "message": "File uplaoded successfully", "code": 200, "data": taskData[0] })
                }
                return res.status(500).json({ "message": "No Data Found", "code": 500, "error": '' })
            }
            return res.status(500).json({ "message": "Task id should be numeric value", "code": 500, "error": '' })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ "message": "Something went wrong", "code": 400, "error": error })
        }
    }
}