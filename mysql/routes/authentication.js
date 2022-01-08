import  express  from "express";
import jwt from 'jsonwebtoken'
import env from 'dotenv'
import path from 'path';
import * as cookieParser from 'cookie-parser';
const __dirname = path.resolve();
env.config({path: __dirname + '/.env'});

export function authentication(req,res,next)
{

     // when you send
      const authHeader=req.headers[`authorization`];
      console.log(authHeader)
    const token=authHeader && authHeader.split(` `)[1];


    if(token===undefined || token===null)
    {
       res.sendStatus(401);
       return;
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,response)=>{
        if(err)
        {
             res.sendStatus(403); 
             return;
        }
        req.response=response;
        next()
    })
}