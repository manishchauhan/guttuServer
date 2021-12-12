import  express  from "express";
import { MySqlDataBase } from "../db/db.js";
export class UserRoutes
{
    constructor()
    {
        
        this.route=express.Router();
        this.addUser();
    }
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
            MySqlDataBase.getInstance().addUser(tableName,dataObject,(msg)=>{
                res.send({message:msg});
                return;
            })
        })
       
    }
}