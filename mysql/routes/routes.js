import  express  from "express";
import { MySqlDataBase } from "../db/db.js";
import {UserAlreadyExits,PasswordFail,ErrorCodes} from "../config/db.config.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
import path from 'path';

import {authentication,authenticationPost} from './authentication.js'
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
        this.selectAll();
        this.logOut();
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
    //  Select all
    selectAll()
    {
        const tableName="fungames";
        this.route.get(`/fungames`,authentication,(req,res)=>{
            if(!req.body)
            {
                res.status(400).send({
                    message:"Content can be empty!"
                })
                return;
            }
            MySqlDataBase.getInstance().selectAll(tableName,(response)=>{

                res.send(response);
                return;
            })
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
                    payLoadObject.accessToken=accessToken;
                    res.cookie('accessToken',accessToken,{httpOnly:false,secure: false,domain:`localhost`}).status(200).send({AuthData:payLoadObject});
                    
                     // (WHEN YOU ARE COOKIE GUY)
                    //  (WHEN U BELIVE IN LOCAL STORAGE) res.send({authToken:accessToken,AuthData:payLoadObject});
                    return;
                }else
                {
                    res.status(ErrorCodes.PasswordFail).send({message:PasswordFail,errorCode:ErrorCodes.PasswordFail})
                    return;
                }
            },fieldName)
        })
    }

    // logout user 
    logOut()
    {
        this.route.get("/logout", authenticationPost, (req, res) => {
            return res
              .clearCookie("accessToken")
              .status(200)
              .send({logout:true,message:"You have Logged Out successfully"});
          });
    }
    
}