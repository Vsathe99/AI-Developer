import projectModel from '../models/project.model.js';
import * as projectService from '../services/project.service.js';
import {validationResult} from 'express-validator';
import userModel from '../models/user.model.js';

export const createProject = async (req, res) => {
    const error = validationResult(req);

    if(!error.isEmpty()) {
        return res.status(400).json({error: error.array()});
    }

    try {
        const {name} = req.body;
        const loggedInUser = await userModel.findOne({email: req.user.email});
        const userId = loggedInUser._id;

        const newProject = await projectService.createProject({name, userId});

        res.status(201).json({project: newProject});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
    
}

export const getAllProjects = async (req, res) => {
    try {
        
        const loggedInUser = await userModel.findOne({email: req.user.email});
        
        const allUserProjects= await projectService.getAllProjectsByUserId({userId: loggedInUser._id});

        res.status(200).json({allUserProjects});

    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

export const addUserToProject = async (req, res) => {
    const error = validationResult(req);

    if(!error.isEmpty()) {
        return res.status(400).json({error: error.array()});
    }

    try {
        
        const {projectId, users} = req.body;
        const loggedInUser = await userModel.findOne({email: req.user.email});

        const project = await projectService.addUserToProject({projectId, users, userId: loggedInUser._id});

        res.status(200).json({project});

    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
}

export const getProjectById = async (req, res) => {

    const {projectId} = req.params;

    try {
        const project = await projectService.getProjectById({projectId});
        res.status(200).json({project});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
        
    }
} 