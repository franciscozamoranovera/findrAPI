const express = require("express");
const router = express.Router();
const { getDoctors, getSingleDoctor, createDoctorProfile, updateDoctorProfile, deleteDoctorProfile } = require('../controllers/doctorProfile.controller');



router.get('/', getDoctors);
router.get('/:id', getSingleDoctor)
router.post('/', createDoctorProfile)
router.put('/:id', updateDoctorProfile)
router.delete('/:id', deleteDoctorProfile)

module.exports = router;