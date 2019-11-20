"use strict";
const config = require("../helpers/config");
const logger = require("../helpers/logger");
const { success, failed } = require("../helpers/utilities");
const tasksContainer = require('../tasks.json');
const fs = require('fs');

const TAG = "note controller > ";
const writeFile = async (jsonContent) => {
    fs.writeFileSync("tasks.json", JSON.stringify(jsonContent), "utf8", function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return false;
        }

        console.log("JSON file has been saved.");
        return true;
    });
}

exports.create = (req, res) => {
    const UNIX_Timestamp = Date.now();

    logger(TAG + req.body);

    const NEW_DOCUMENT = {
        id: UNIX_Timestamp,
        title: req.body.title,
        note: req.body.note,
        is_deleted: false,
        update_at: new Date(UNIX_Timestamp),
        create_at: new Date(UNIX_Timestamp),
    }
    tasksContainer.tasks.push(NEW_DOCUMENT);

    logger(TAG + config.action.CREATE + " > " + tasksContainer.tasks.length);

    writeFile(tasksContainer).then(
        success(res, [NEW_DOCUMENT], config.action.CREATE)
    ).catch(function (error) {
        var err = {
            status: config.statusCode.INTERNAL_SERVER_ERROR,
            message: 'Failed to insert!',
        };
        return failed(res, err, config.action.READ_ALL)
    });
}

exports.readAll = (req, res) => {
    let searchString = req.query.searchString;

    let tasks = tasksContainer.tasks.filter((item) => !item.is_deleted);

    logger(TAG + config.action.READ_ALL + " > " + tasks +":::" +JSON.stringify(tasks, null));

    if(searchString && tasks && tasks.length > 0) {
        // let searchRegex = new RegExp(searchString, "i");
        // searchString = {$or: [
        //     {"q": searchRegex}
        // ]}

        tasks = tasks.filter((item) => (item.title === searchString || item.note === searchString));
    }

    if (tasks) {
        success(res, tasks, config.action.READ_ALL)
    } else {
        var err = {
            status: config.statusCode.NOT_FOUNF,
            message: 'No record found!',
        };
        return failed(res, err, config.action.READ_ALL)
    }
}

exports.readOne = (req, res) => {
    const id = req.params["id"];
    const task = tasksContainer.tasks.find((item) => item.id == id && !item.is_deleted);

    logger(TAG + config.action.READ_ONE + " > " + task);

    if (task) {
        success(res, [task], config.action.READ_ONE)
    } else {
        var err = {
            status: config.statusCode.NOT_FOUNF,
            message: 'No record found!',
        };
        return failed(res, err, config.action.READ_ONE)
    }
}

exports.update = (req, res) => {
    const id = req.params["id"];
    const task = tasksContainer.tasks.find((item) => item.id == id);

    logger(TAG + config.action.UPDATE + " > " + task);
    
    if (task) {
        task.title = req.body.title;
        task.note = req.body.note;
        task.update_at = new Date(Date.now());

        writeFile(tasksContainer).then(
            success(res, [task], config.action.UPDATE)
        ).catch(function (error) {
            var err = {
                status: config.statusCode.INTERNAL_SERVER_ERROR,
                message: 'Failed to update!',
            };
            return failed(res, err, config.action.UPDATE)
        });
    } else {
        var err = {
            status: config.statusCode.NOT_FOUNF,
            message: 'No record found!',
        };
        return failed(res, err, config.action.UPDATE)
    }
}

exports.delete = (req, res) => {
    const id = req.params["id"];
    const task = tasksContainer.tasks.find((item) => item.id == id);

    logger(TAG + config.action.DELETE + " > " + task);

    if (task) {
        task.is_deleted = true;
        task.update_at = new Date(Date.now());

        writeFile(tasksContainer).then(
            success(res, [task], config.action.DELETE)
        ).catch(function (error) {
            var err = {
                status: config.statusCode.INTERNAL_SERVER_ERROR,
                message: 'Failed to delete!',
            };
            return failed(res, err, config.action.DELETE)
        });
    } else {
        var err = {
            status: config.statusCode.NOT_FOUNF,
            message: 'No record found!',
        };
        return failed(res, err, config.action.DELETE)
    }
}