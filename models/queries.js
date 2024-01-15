const config = require('config');
const DB = require('./DbQuery');
const DefaultDB = new DB(config.get('DATABASE'));

exports.insertFileDetails = async (params) => {
    if(params && params != ''){
        params = [
            params.fileName,
            params.filePath,
            params.data
        ];
        const sqlStr = `INSERT INTO files(file_name, file_path, metadata, created_at) VALUES(?,?,?,now())`;
        return await DefaultDB.query(sqlStr, params);
    }
    return false;    
}   

exports.getFileDetailsByFileId = async (fileId) => {
    if(fileId && fileId != ''){
        const sqlStr = `SELECT metadata FROM files WHERE id=?`;
        return await DefaultDB.query(sqlStr, fileId);
    }
    return false;    
} 

exports.insertAnalysisTask = async (params) => {
    if(params && params != ''){
        params = [
            params.fileId,
            params.countWords,
            params.countUniqueWords,
            JSON.stringify(params.kTopWords)
        ];
        const sqlStr = `INSERT INTO tasks(file_id, count_words, count_uique_words, k_words, created_at) VALUES(?,?,?,?,now())`;
        return await DefaultDB.query(sqlStr, params);
    }
    return false;    
}

exports.getAnalysisByTaskId = async (taskId, params) => {
    if(taskId && taskId != ''){
        params = params.toString();
        const sqlStr = `SELECT f.file_name, ${params ? params+",": ''} t.created_at FROM files f inner join tasks t on t.file_id=f.id WHERE t.id=?`;
        console.log(sqlStr)
        return await DefaultDB.query(sqlStr, taskId);
    }
    return false;    
}