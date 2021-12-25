import  express  from "express";
import { MySqlDataBase } from "../db/db.js";
import {UserAlreadyExits} from "../config/db.config.js"
 import bcrypt from 'bcrypt'
export class UserRoutes
{
    constructor()
    {
        
        this.route=express.Router();
        this.addUser();
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
            }
            const dataObject={};
            dataObject.username=req.body.UserName;
            dataObject.password=req.body.Password;
            dataObject.email=req.body.Email
            MySqlDataBase.getInstance().selectUser(tableName,dataObject.email,async(status)=>{
                if(status)
                {
                    res.send({message:UserAlreadyExits})
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
            })
          
        })
       
    }
}