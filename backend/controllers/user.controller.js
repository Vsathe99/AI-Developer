import userModel from '../models/user.model.js';
import * as userService from '../services/user.service.js';
import { validationResult } from 'express-validator';
import redisClient from '../services/redis.service.js';


export const createUserController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await userService.createUser(req.body);
        const token = user.generateJWT();
        delete user._doc.password;
        res.status(201).json({user, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const loginUserController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email}).select('+password');

        if(!user){
            throw new Error("User not found");
        }

        const isValid = await user.isValidPassword(password);

        if(!isValid){
            throw new Error("Invalid password");
        }

        const token = user.generateJWT();
        delete user._doc.password;
        res.status(200).json({user, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const profileUserController = async (req, res) => {
    console.log(req.user);
    res.status(200).json({user: req.user});
}

export const logoutUserController = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        redisClient.set(token, 'logout', 'EX', 60*60*24);
        res.status(200).json({message: "User logged out"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const getAllUsersController = async (req, res) => {
    try {

        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })

        const allUsers = await userService.getAllUsers({userId: loggedInUser._id});
        res.status(200).json({users: allUsers});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
}