// Add express cors
import  express  from "express";
import { MySqlDataBase } from "./mysql/db/db.js";
import cors from 'cors';
import {UserRoutes} from "./mysql/routes/routes.js"
const app = express();
// If needed

class App {
    constructor() {
        app.use(express.urlencoded({ extended: true }));
       
        app.use(express.json());
        //  If neeed
        app.use(cors({
            methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
        }));
        // Test route
        app.get("/", (req, res) => {
            res.json({ message: "Test server is working...222222" })
        });

        // Server Port to listen
        app.listen(4040, () => {
            console.log("Server is running on port 4040.")
        })
        MySqlDataBase.getInstance();
        // add user Routes
        this.addUserRoutes();
        // Handle all errors
        /*
        app.use((req,res,next)=>{
            const err=new Error(`404: Not Found `+req.originalUrl);
            err.status=404;
            next(err);
            return;
        })*/
    }
    addUserRoutes()
    {
        const userRoutes=new UserRoutes();
        app.use("/user",userRoutes.route);
    }
}


const guttu=new App();
