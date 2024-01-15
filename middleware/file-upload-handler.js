const multer = require('multer');
// var upload = multer({ dest: 'upload/'});
var fs = require('fs');

const MINE_TYPE_MAP = {
    'text/plain':'txt'
}
const storage =  multer.diskStorage({
    // cb as callback
    filename:(req, file, cb)=>{
        const name = file.originalname.toLocaleLowerCase().split(' ').join("-");
        const ext = MINE_TYPE_MAP[file.mimetype];
        cb(null, name+"-" + Date.now() + '.' + ext);
    },
    destination: (req, file, cb)=>{
        const isValid = MINE_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mine type');
        if(isValid){
            error = null;
        }
        cb(error, 'files');
    }
});

module.exports = multer({storage:storage}).single('file');