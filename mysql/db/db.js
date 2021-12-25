import mysql from "mysql"
import {MySqlConfig} from "../config/db.config.js"
export class MySqlDataBase
{
    static mysqlInstance=null;
    constructor()
    {
        this.connection=mysql.createConnection({
            host:MySqlConfig.HOST,
            user:MySqlConfig.USER,
            password:MySqlConfig.PASSWORD,
            database:MySqlConfig.DB
        })
        // Try to connect with my sql
         this.connection.connect(error=>{
            if(error)
            {
                console.warn("Not able to connect with db");
                return;
            }
            console.log("Successfully connect with the database");
        })
        
        
    }

    static getInstance()
    {
        if(this.mysqlInstance===null)
        {
            this.mysqlInstance=new MySqlDataBase();       
        }
        return this.mysqlInstance;
    }
   //   Add a user based on table
   addUser(tableName,dataObject,callBack=null)
   {
        const query=`INSERT INTO ${tableName} SET ?`;
        this.connection.query(query,dataObject,(err,res)=>{
            if(err)
            {
                throw new Error(err);
            }
            if(callBack)
            {
                callBack(`Data Inserted to the Table`);
            }
        })
   }
   
   // Select user based on where
   selectUser(tableName,objectString,callBack=null)
   {
        const query=`SELECT * FROM ${tableName} WHERE email = ?`
        this.connection.query(query,objectString,(err,res)=>{
            if(err)
            {
                throw new Error(err);
            }
            if(callBack)
            {
                res.length>0?callBack(true):callBack(false);
            }
        })
   }
}
