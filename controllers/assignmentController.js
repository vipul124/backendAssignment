const Assignment = require('../models/assignmentModel');
const asyncHandler = require('express-async-handler');

const uploadAssignment = asyncHandler(async (req, res) => {
    const { task, admin } = req.body;

    const assignment = await Assignment.create({
        user: req.user._id,
        task: task,
        admin: admin,
    });
    res.status(201);
    res.json(assignment);
});

const getAssignments = asyncHandler(async (req, res) => {
    const assignments = await Assignment.find({ admin: req.user._id }).populate('user', '_id username').populate('admin', '_id username');
    
    const formattedAssignments = assignments.map(assignment => ({
        assignmentId: assignment._id,
        userId: assignment.user._id,
        username: assignment.user.username,
        task: assignment.task,
        adminId: assignment.admin._id,
        status: assignment.status
    }));
    res.json(formattedAssignments);
});

const updateAssignmentStatus = (status) => asyncHandler(async (req, res) => {
    const assignment = await Assignment.findById(req.params.id);
    if (assignment) {
        if (assignment.admin.equals(req.user._id)) {
            assignment.status = status;
            await assignment.save();
            res.json({ message: `Assignment ${status}` });
        } else {
            res.status(401);
            throw new Error('Unauthorized Access !!');
        }
    } else {
        res.status(401);
        throw new Error('Invalid Assignment ID');
    }
});

module.exports = { uploadAssignment, getAssignments, updateAssignmentStatus };