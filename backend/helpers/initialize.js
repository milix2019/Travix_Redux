const config = require("./config");
const logger = require("./logger");
var fs = require("fs");

const TAG = "initializing data > ";

logger(TAG);

function createDatabase() {
    logger(TAG + 'createDatabase');

    fs.open(path, "task.json", function (err, fd) {

        logger({ level: config.level.WARNING, message: "createDatabase", meta: err });

        // handle error
        fs.close(fd, function (err) {

            logger({ level: config.level.WARNING, message: "createDatabase", meta: err });
            // handle error
        });
    });
}

createDatabase;