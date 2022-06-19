const express = require('express');

// Controllers
const {
	getAllRegistrations,
	createRegistration,
	getRegistrationById,
	updateRegistration,
	deleteRegistration,
} = require('../controllers/registrations.controller');

const RegistrationsRouter = express.Router();

RegistrationsRouter.get('/', getAllRegistrations);

RegistrationsRouter.post('/', createRegistration);

RegistrationsRouter.get('/:id', getRegistrationById);

RegistrationsRouter.patch('/:id', updateRegistration);

RegistrationsRouter.delete('/:id', deleteRegistration);

module.exports = { RegistrationsRouter };