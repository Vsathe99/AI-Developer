import mongoose from 'mongoose';
import projectModel from '../models/project.model.js';


export const createProject = async ({
    name, userId
}) => {
    if(!name || !userId) {
        throw new Error('Missing required fields');
    }

    let project
    try {
        project = await projectModel.create({
            name,
            users: [userId]
        });
    } catch (error) {
        throw new Error('Error creating project');
    }
    
    return project;
}

export const getAllProjectsByUserId = async ({userId}) => {
    if(!userId) {
        throw new Error('Missing required fields');
    }

    let allUserProjects;
    try {
        allUserProjects = await projectModel.find({users: userId});
    } catch (error) {
        throw new Error('Error getting projects');
    }

    return allUserProjects;
}

export const addUserToProject = async ({projectId, users, userId}) => {
    if(!projectId || !users) {
        throw new Error('Missing required fields');
    }

    if(!Array.isArray(users)|| users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error('Users must be an array');
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Invalid project ID');
    }

    if (!userId) {
        throw new Error("userId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId")
    }
     
    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    })

    if(!project) {
        throw new Error('Project not found');
    }
    
    const updatedProject = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    })

    return updatedProject;
}

export const getProjectById = async ({projectId}) => {
    if(!projectId) {
        throw new Error('Missing required fields');
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Invalid project ID');
    }

    const project = await projectModel.findOne({
        _id: projectId,
    }).populate('users');

    return project;
}