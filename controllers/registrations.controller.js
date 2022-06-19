// Models
const { Registration } = require("../models/registrations.model");

const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.findAll();

        res.status(200).json({
            status: "success",
            registrations,
        });
    } catch (err) {
        console.log(err);
    }
};

const createRegistration = async (req, res) => {
    try {
        const { entranceTime, exitTime } = req.body;

        const newRegistration = await Registration.create({
            entranceTime,
            exitTime,
            status: "working",
        });

        res.status(201).json({
            status: "success",
            newRegistration,
        });
    } catch (err) {
        console.log(err);
    }
};

const getRegistrationById = async (req, res) => {
    const { id } = req.params;

    const registration = await Registration.findOne({ where: { id } });

    if (!registration) {
        return res.status(404).json({
            status: "error",
            message: "Registration not found",
        });
    }
	
    res.status(200).json({
        status: "success",
        registration,
    });
};

const updateRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const { exitTime } = req.body;

        const registration = await Registration.findOne({ where: { id }  });

        if (!registration) {
            return res.status(404).json({
                status: "error",
                message: "Registration not found",
            });
        }

        await registration.update({ exitTime });
        await registration.update({ status: "out" });

        res.status(204).json({
            status: "success",
            message: "Registration updated" + exitTime,
        });

		console.log(registration);
		console.log(res.status);
    } catch (error) {
        console.log(error);
    }
};

const deleteRegistration = async (req, res) => {
    const { id } = req.params;

    const registration = await Registration.findOne({ where: { id } });

    if (!registration) {
        return res.status(404).json({
            status: "error",
            message: "Registration not found",
        });
    }

    //await registration.destroy();
    await registration.update({ status: 'deleted' });

    res.status(201).json({ status: "success delete" });
};

module.exports = {
    getAllRegistrations,
    createRegistration,
    getRegistrationById,
    updateRegistration,
    deleteRegistration,
};
