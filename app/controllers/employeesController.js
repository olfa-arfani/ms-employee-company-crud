"use strict";

const db = require("../models");
const employees = db.employees;
const companees = db.companees;
const Op = db.Sequelize.Op;
const logger = require("log4js").getLogger("employeesController");
// Create and Save a new Tutorial
exports.create = async (req, res) => {
    logger.debug(req);
    const employeeObj = {
        firstName: "toto",
        lastName: "toto",
        phone: "123-234-4567"
    };
    await employees.create(employeeObj);
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    logger.debug(req);
    const result = await employees.findAll();
    logger.debug(result);
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    logger.debug(req);

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    logger.debug(req);

};

//create a new Tutorial: create(object)
//find a Tutorial by id: findByPk(id)
//get all Tutorials: findAll()
//update a Tutorial by id: update(data, where: { id: id })
//remove a Tutorial: destroy(where: { id: id })
//remove all Tutorials: destroy(where: {})
//find all Tutorials by title: findAll({ where: { title: ... } })

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};