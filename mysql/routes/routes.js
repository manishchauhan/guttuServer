import  express  from "express";
import { MySqlDataBase } from "../db/db.js";
import {UserAlreadyExits} from "../config/db.config.js"
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
            MySqlDataBase.getInstance().selectUser(tableName,dataObject.email,(status)=>{
                if(status)
                {
                    res.send({message:UserAlreadyExits})
                    return;
                }
                MySqlDataBase.getInstance().addUser(tableName,dataObject,(msg)=>{
                    res.send({message:msg});
                    return;
                })
            })
          
        })
       
    }
}