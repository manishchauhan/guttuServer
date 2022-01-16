// Add express cors
import  express  from "express";
import { MySqlDataBase } from "./mysql/db/db.js";
import cors from 'cors';
import {UserRoutes} from "./mysql/routes/userRoutes.js"
import {RoomRoutes} from "./mysql/routes/roomRoutes.js"
import  cookieParser from 'cookie-parser';
const app = express();
// If needed

class App {
    constructor() {
        app.use(express.urlencoded({ extended: true }));
        
        app.use(express.json());
        //  If neeed
        const whitelist = ['http://localhost:3000',`http://localhost:4040`];
        const corsOptions = {
            credentials: true, // This is important.
            origin: (origin, callback) => {
              if(whitelist.includes(origin))
                return callback(null, true)
                callback(new Error('Not allowed by CORS'));
            }
          }
        app.use(cors(corsOptions));
        // Test route
        app.get("/", (req, res) => {
            res.json({ message: "Test server is working...222222" }).find(row => row.startsWith('test2='))
        });

        // Server Port to listen
        app.listen(4040, () => {
            console.log("Server is running on port 4040.")
        })
        this.addMysqlConfig();
        // Handle all errors
        
        app.use((req,res,next)=>{
            const err=new Error(`404: Not Found `+req.originalUrl);
            err.status=404;
            next(err);
            return;
        })
    }
    /*when your database is mysql*/
    addMysqlConfig()
    {
        MySqlDataBase.getInstance();
        // add user Routes
        app.use(cookieParser());
        this.addUserRoutes();
        this.addRoomRoutes();
    }
    //  adding all routes for user
    addUserRoutes()
    {
        const userRoutes=new UserRoutes();
        app.use("/user",userRoutes.route);
     
    }

    // adding all routes for user
    addRoomRoutes()
    {
        const roomRoutes=new RoomRoutes();
        app.use("/room",roomRoutes.route)
    }

    
     /*when your database is mangoDB*/
}


const guttu=new App();
