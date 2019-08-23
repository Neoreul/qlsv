import express from 'express';
import fs      from 'fs';
import path    from 'path';

import logger  from '../helpers/logger';

let router = express.Router();

logger.info("# Initial Controllers");
let files  = fs.readdirSync("./src/controllers");
files.forEach((file) => {
    let nameController = path.parse(file).name;
    if(nameController != "index"){
        router.use(require('./'+ nameController));
    }
});

// import UserRouter    from './users';
// import TeacherRouter from './teachers';
// import SubjectRouter from './subjects';
// import StudentRouter from './students';
// import ClassRouter   from './classes';

module.exports = router;