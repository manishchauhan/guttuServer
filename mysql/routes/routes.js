import  express  from "express";
import { MySqlDataBase } from "../db/db.js";
import {UserAlreadyExits,PasswordFail,ErrorCodes} from "../config/db.config.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
import path from 'path';
const __dirname = path.resolve();
env.config({path: __dirname + '/.env'});

export class UserRoutes
{
    constructor()
    {
        
        this.route=express.Router();
        env.config();
        this.addUser();
        this.loginUser();
    }
    // with callback
    addUser()
    {
        const tableName="user"
        this.route.post(`/add`,(req,res)=>{
            if(!req.body)
            {
                res.status(400).send({
                    message:"Content can be empty!"
                })
                return;
            }
            const dataObject={};
            dataObject.username=req.body.UserName;
            dataObject.password=req.body.Password;
            dataObject.email=req.body.Email
            const fieldName=`username`
       
            MySqlDataBase.getInstance().selectUser(tableName,dataObject.username,async(status)=>{
                if(status)
                {
                     res.status(ErrorCodes.UserAlreadyExits).send({message:UserAlreadyExits,errorCode:ErrorCodes.UserAlreadyExits})
                    return;
                }
                // 10 rounds is more than enough 
                const rounds=10;
                const safePassword=await bcrypt.hash(dataObject.password,rounds);
                dataObject.password=safePassword;
                MySqlDataBase.getInstance().addUser(tableName,dataObject,(msg)=>{
                    res.send({message:msg});
                    return;
                })
            },fieldName)
          
        })
       
    }
    //  Login user
    loginUser()
    {
        const tableName="user"
        this.route.post(`/login`,(req,res)=>{
            if(!req.body)
            {
                res.status(400).send({
                    message:"Content can be empty!"
                })
                return;
            }
            const dataObject={};
            dataObject.username=req.body.UserName;
            dataObject.password=req.body.Password;
            const fieldName=`username`
            MySqlDataBase.getInstance().selectUser(tableName,dataObject.username,async(status,response)=>{
                if(response.length<1)
                {
                    res.status(ErrorCodes.PasswordFail).send({message:PasswordFail,errorCode:ErrorCodes.PasswordFail})
                    return;
                }
                const user=response[0];
                const hashedPassword=user.password;
                const passWordStatus=await bcrypt.compare(dataObject.password,hashedPassword)
                if(passWordStatus)
                {
                    // Create a jwt toke
                    const payLoadObject={};
                    payLoadObject.user=user.username;
                    payLoadObject.email=user.email;
                    payLoadObject.isLogin=true;
                    const accessToken=jwt.sign(payLoadObject,process.env.ACCESS_TOKEN_SECRET);
                    res.send({message:accessToken,userData:payLoadObject});
                    return;
                }else
                {
                    res.status(ErrorCodes.PasswordFail).send({message:PasswordFail,errorCode:ErrorCodes.PasswordFail})
                    return;
                }
            },fieldName)
        })
    }
}