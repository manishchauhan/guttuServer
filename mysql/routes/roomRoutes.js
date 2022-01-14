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
            MySqlDataBase.getInstance().add(tableName,dataObject,(msg)=>{
                res.send({message:"Room added successfully enjoy"});
                return;
            })
          
        })
    }
}