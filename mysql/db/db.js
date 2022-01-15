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
    //  Select all from table not best when table is really big
    selectAll(tableName,callBack=null)
    {
        const query= `SELECT * FROM ${tableName}`;
        this.connection.query(query,(err,res)=>{
            if(err)
            {
                throw new Error(err);
            }
            if(callBack)
            {
   
                callBack(res);
            }
        })
    }
   //   Add a user based on table
   add(tableName,dataObject,callBack=null)
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
   select(tableName,objectString,callBack=null,fieldName=`email`)
   {
        const query=`SELECT * FROM ${tableName} WHERE ${fieldName} = ?`
        this.connection.query(query,objectString,(err,res)=>{
            if(err)
            {
                throw new Error(err);
            }
            if(callBack)
            {
                res.length>0?callBack(true,res):callBack(false,res);
            }
        })
   }
   // update room only query
   updateRoom(tableName,object,callBack=null,fieldName=`roomid`)
   {
       const RoomName=object.roomname; // roomname
       const RoomDesc=object.roomdesc; // roomdesc
       const Player=object.players;// players
       const Roomid=object.roomid;// roomid
       const records=[RoomName,RoomDesc,Player,Roomid]
       const query=`UPDATE ${tableName} SET roomname = ?,roomdesc = ?, players = ? WHERE ${fieldName} = ?`;
       this.connection.query(query,records,(err,res)=>{
        if(err)
        {
            throw new Error(err);
        }
        if(callBack)
        {
            res.length>0?callBack(true,res):callBack(false,res);
        }
    })
   }
}
	