# Text analysis

## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Local Port: 3000
command: npm i
run: nodemon
 
## 3 apis created:
1. uploadFile: /api/file/upload
    payload : form-data
2. Analysis text: /api/analyseFile/:fileId
    payload: {
        countWords: true, //optional
        countUniqueWords: true, //optional
        kTopWords: 2 //optional (numeric number)
    } //plain json
3. Get analysis task details: /api/getAnalysisTask/:taskId
    payload : {
        countWords: true, //optional (boolean)
        countUniqueWords: true, //optional (boolean)
        kTopWords: true //optional (boolean)
    } //plain json

Note: Database and table queries path: txt-analysis/models/db.sql
