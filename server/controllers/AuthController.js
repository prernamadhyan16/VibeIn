//actual code

import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { renameSync, unlinkSync } from "fs"
import config from "../config.js";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
    return jwt.sign({email, userId}, config.jwtSecret, { expiresIn: config.jwtExpiresIn})
};

export const signup = async (request, response, next) => {
    try{
        const {email, password} = request.body ;
        if(!email || !password){
            return response.status(400).send("Email ans Password is required.")
        }
        const user = await User.create({email, password});
        let x = createToken(email, user.id);
        console.log(x);
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite : "None",
        });
        console.log(user.id)
        return response.status(201).json({
            user:{
                id: user.id,
                email: user.email,
            // firstName: user.firstName,
            // lastName: user.lastName,
            // image: user.image,
                profileSetup: user.profileSetup,

        }});
    }catch(error){
        console.log({error});
        // console.log("Fuck you")
        return response.status(500).send("Internal Server Error");
    }
};

export const login = async (request, response, next)=>{
    try{
        const {email, password} = request.body ;
        if(!email || !password){
            return response.status(400).send("Email and Password is required.")
        }
        const user = await User.findOne({ email });
        if(!user){
            return response.status(404).send("User with the given email not found.")
        }
        // let x = createToken(email, user.id);
        // console.log(x);
        const auth = await compare(password, user.password);
        if(!auth){
            return response.status(400).send("Password is incorrect.")
        }
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite : "None",
        });
        console.log(user.id)
        return response.status(200).json({
            user:{
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
                profileSetup: user.profileSetup,

        }});
    }catch(error){
        console.log({error});
        return response.status(500).send("Internal Server Error");
    }
};

export const getUserInfo = async (request, response, next)=>{
    try{
        const userData = await User.findById(request.userId);
        if(!userData){
            return response.status(404).send("User with the given if not found.")
        }
        return response.status(200).json({
            
            id: userData.id,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
            profileSetup: userData.profileSetup,

        });
    }catch(error){
        console.log({error});
        
        return response.status(500).send("Internal Server Error");
    }
};

export const updateProfile = async (request, response, next)=>{
    try{
        const { userId } = request;
        const { firstName, lastName, color } = request.body;
        if(!firstName || !lastName ){
            return response.status(400).send("Please fill the details!");
        }
        const userData = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName, 
            color,
            profileSetup:true,
        }, {new:true, runValidators:true}); 
        return response.status(200).json({
            
            id: userData.id,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
            profileSetup: userData.profileSetup,

        });
    }catch(error){
        console.log({error});
        
        return response.status(500).send("Internal Server Error");
    }
};

export const addProfileImage = async (request, response, next)=>{
    try{
        if(!request.file){
            console.log("File not found in request.")
            return response.status(400).send("File is required!")
        }

        const date = Date.now();
        let fileName = "uploads/profiles/" + date + request.file.originalname;
        renameSync(request.file.path, fileName);

        const updatedUser = await User.findByIdAndUpdate(request.userId, { image:fileName }, { new:true, runValidators:true });

        return response.status(200).json({
            image: updatedUser.image,
        });
    }catch(error){
        console.log({error});
        
        return response.status(500).send("Internal Server Error");
    }
};

export const removeProfileImage = async (request, response, next)=>{
    try{
        const { userId } = request;
        const user = await User.findById(userId);
        if(!user){
            return response.status(404).send("User not Found!")
        }
        if(user.image){
            unlinkSync(user.image);
        }
        user.image = null;
        await user.save();
        return response.status(200).send("Profile image removed")
    }catch(error){
        console.log({error});
        
        return response.status(500).send("Internal Server Error");
    }
};

export const logout = async (request, response) => {
    try {
        response.cookie("jwt", "", {
            maxAge: 1, 
            secure: true, 
            sameSite: "None" 
        });
        console.log("hello3")
        return response.status(200).send("Logout Successful.");
    } catch (error) {
        console.error({ error });
        return response.status(500).send("Internal Server Error");
    }
};