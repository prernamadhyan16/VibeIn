//actual code

import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
    return jwt.sign({email, userId}, process.env.JWT_KEY, { expiresIn: maxAge})
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