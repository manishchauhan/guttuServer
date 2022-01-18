import {express,MySqlDataBase,UserAlreadyExits,
    PasswordFail,ErrorCodes,bcrypt,jwt,path,env,authentication,
    authenticationPost} from    '../config/routeHeader.js'
//resolve path
const __dirname = path.resolve();
env.config({path: __dirname + '/.env'});
export class RoomRoutes
{
    constructor()
    {
        this.route=express.Router();
        this.addRoom();
        this.showRoomList();
        this.updateRoom();
        this.deleteRoom();
        this.deleteRooms();
    }

    addRoom()
    {
        const tableName="room"
        this.route.post(`/add`,authenticationPost,(req,res)=>{
            if(!req.body)
            {
                res.status(400).send({
                    message:"Content can be empty!"
                })
                return;
            }
            const dataObject={};
            dataObject.gameid=req.body.gameid;//gameid
            dataObject.userid=req.body.userid;//user id 
            dataObject.roomname=req.body.roomname;//room name
            dataObject.roomdesc=req.body.roomdesc;//room desc
            dataObject.players=req.body.players;//player
            dataObject.parentgame=req.body.parentgame;//parent game
            dataObject.creator=req.body.creator;
            MySqlDataBase.getInstance().add(tableName,dataObject,(msg)=>{
                res.status(201).send({message:"Room added successfully enjoy"});
                return;
            })
          
        })
    }
    //  Show room list for a game
    showRoomList()
    {
        const tableName="room";
        this.route.get(`/roomlist`,authentication,(req,res)=>{
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
    // Update the room
    updateRoom()
    {

        const tableName="room";
        this.route.post(`/update`,authenticationPost,(req,res)=>{
            if(!req.body)
            {
                res.status(400).send({
                    message:"Content can be empty!"
                })
                return;
            }
            const dataObject={};
            dataObject.roomid=req.body.roomid;//room id
            dataObject.roomname=req.body.roomname;//roomname
            dataObject.roomdesc=req.body.roomdesc;//roomdesc
            dataObject.players=req.body.players;//players
            MySqlDataBase.getInstance().updateRoom(tableName,dataObject,(response)=>{
                res.status(201).send({message:"room data updated successfully enjoy"});
                return;
            })
        })
    }
    // Delete the selected room
    deleteRoom()
    {
        const tableName="room";
        this.route.post(`/delete`,authenticationPost,(req,res)=>{
            if(!req.body)
            {
                res.status(400).send({
                    message:"Content can be empty!"
                })
                return;
            }
            
            const idToDelete=req.body.roomid;//room id
            MySqlDataBase.getInstance().delete(tableName,idToDelete,(response)=>{
                res.status(201).send({message:response});
                return;
            },`roomid`)
        })
    }
    // Delete the multiple selected room
    deleteRooms()
    {
        const tableName="room";
        this.route.post(`/deletemany`,authenticationPost,(req,res)=>{
            if(!req.body)
            {
                res.status(400).send({
                    message:"Content can be empty!"
                })
                return;
            }
            
            const idToDelete=req.body.roomids;//room id
            MySqlDataBase.getInstance().deleteRooms(tableName,idsToDelete,(response)=>{
                res.status(201).send({message:response});
                return;
            },`roomid`)
        })
    }
}