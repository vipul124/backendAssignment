const express = require('express');
const { protect, isAdmin } = require('../middleware/oAuth');
const { registerUser, authUser, getAllAdmins } = require('../controllers/userController');
const { uploadAssignment, getAssignments, updateAssignmentStatus } = require('../controllers/assignmentController');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/admins').get(protect, getAllAdmins);
router.route('/upload').post(protect, uploadAssignment);
router.route('/assignments').get(protect, isAdmin, getAssignments);
router.route('/assignments/:id/accept').post(protect, isAdmin, updateAssignmentStatus('accepted'));
router.route('/assignments/:id/reject').post(protect, isAdmin, updateAssignmentStatus('rejected'));

module.exports = router;