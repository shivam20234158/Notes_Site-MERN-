import Note from '../models/Note.js';

export async function getAllNotes(_, res) {
    try{
        const notes=await Note.find().sort({createdAt:-1});//latest note first
        res.status(200).json(notes);
    }
    catch(error){
        console.error("error in getAllNotes controller",error);
        res.status(500).json({message:"internal server error"});
    }
}   
export async function getNotesById(req, res) {
    try{
        const note=await Note.findById(req.params.id);

        if(!note){
            return res.status(404).json({message:"note not found"});
        }

        res.status(200).json(note);
    }
    catch(error){
        console.error("error in getNotesById controller",error);
        res.status(500).json({message:"internal server error"});
    }
}
export async function createNote(req, res) {
    try{
        const {title,content}=req.body;
        const newNote=new Note({title,content});

        const saveNote=await newNote.save();
        // res.status(201).json({message:"note created successfully"});
        res.status(201).json(saveNote); 
    }
    catch(error){
        console.error("error in createNote controller",error);
        res.status(500).json({message:"internal server error"});
    }
}   

export async function updateNote(req, res) {
    try{
        const {title,content}=req.body;
        const updated_note=await Note.findByIdAndUpdate(req.params.id,{title,content},{
            new:true
        });

        if(!updated_note){
            return res.status(404).json({message:"note not found"});
        }

        res.status(200).json(updated_note);
    }

    catch{
        console.error("error in updateNote controller",error);
        res.status(500).json({message:"internal server error"});
    }
}

export async function deleteNote(req,res){
    try{
        // const {title,content}=req.body;
        const deleted_note=await Note.findByIdAndDelete(req.params.id);

        if(!deleted_note){
            return res.status(404).json({message:"note not found"});
        }
        res.status(200).json({message:"note deleted successfully"});
    }
    catch{
        console.error("error in deleteNote controller",error);
        res.status(500).json({message:"internal server error"});
    }
}