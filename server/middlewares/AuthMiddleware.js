import { response } from "express";
import jwt from "jsonwebtoken";
import config from "../config.js";

export const verifyToken = (request, response, next) =>{
    // console.log(request.cookies);
    const token = request.cookies.jwt;
    // console.log({ token })
    if(!token) return response.status(401).send("You are not authenticated") 
    jwt.verify(token, config.jwtSecret, async(err, payload) => {
        if(err) return response.status(403).send("Token is not valid!")
    request.userId = payload.userId;
    next();
})
}