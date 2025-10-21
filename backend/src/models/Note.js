import mongoose from "mongoose";

// 1: create a schema
// 2: create a model(Note here) and export it
const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
},{
    timestamps:true,//give createdAt and updatedAt fields
});

const Note=mongoose.model("Note",noteSchema);

export default Note;