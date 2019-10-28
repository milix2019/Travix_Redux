const config = require("../helpers/config");
const Note = require('../models/note');

exports.create = function (req, res, next) {
    req.check('title',"title is required").notEmpty().isString();
    req.check('note',"note is required").notEmpty().isString();
    respond(req, res, next)
}

exports.readAll = function (req, res, next) {
    respond(req, res, next)
}

exports.readOne = function (req, res, next) {
    req.check('id',"id is required").notEmpty().isString();
    respond(req, res, next)
}

exports.update = function (req, res, next) {
    req.check('id',"id is required").notEmpty().isString();
    req.check('title',"title is required").notEmpty().isString();
    req.check('note',"note is required").notEmpty().isString();
    respond(req, res, next)
};

exports.delete = function (req, res, next) {
    req.check('id',"id is required").notEmpty().isString();
    respond(req, res, next)
};


function respond(req, res, next) {
    const errors = req.validationErrors();
    if(errors) {
        res.status().send({ success: false, result: [], messages: errors });
    } else {
        next();
    }
}