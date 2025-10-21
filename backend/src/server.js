import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

dotenv.config();

if (process.env.NODE_ENV === "development") {
    app.use(cors({
        origin: "http://localhost:5173",
    }
    ));
}
app.use(express.json());//this will parse the incoming request body to json
app.use(rateLimiter);

//simple middleware example 
// app.use((req,res,next)=>{
//     console.log("got a request");
//     next();
// })

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    })
}

// app.get("/api/notes",(req,res)=>{
//     res.status(200).send("you have some notes"); 
// })

// app.post("api/nodes",(req,res)=>{
//     res.status(201).json({message:"note created"});
// })

// //must need id to delete or update
// app.put("api/nodes/:id",(req,res)=>{
//     res.status(200).json({message:"note updated"});
// })
// app.delete("api/nodes/:id",(req,res)=>{
//     res.status(200).json({message:"note deleted"});
// })


//first connect to db then start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on PORT:", PORT);
    });
});




// mongodb+srv://shivampanwar491_db_user:ftXrBD8VcMCqBRaF@cluster0.4vgthsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0