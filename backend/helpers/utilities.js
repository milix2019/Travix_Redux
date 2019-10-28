const config = require("./config");
const logger = require("./logger");

function success(res, result, action) {
    logger({ level: config.level.INFO, message: config.modules.NOTE + " " + action, meta: result });
    res.status(config.statusCode.OK).json({ success: true, result: result, messages: [] });
}

function failed(res, err, action) {
    logger({ level: config.level.ERROR, message: config.modules.NOTE + " " + action, meta: err });
    res.status(err.status ? err.status : config.statusCode.INTERNAL_SERVER_ERROR).json({ success: false, result: [err], messages: [] });
}

module.exports = { success, failed }