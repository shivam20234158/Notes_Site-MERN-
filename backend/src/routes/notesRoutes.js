import express from "express";
import { getAllNotes,createNote, updateNote, deleteNote,getNotesById } from "../controllers/notesController.js";

const router=express.Router();

router.get("/",getAllNotes);

router.post("/",createNote);

//must need id to delete or update
router.put("/:id",updateNote)

router.get("/:id",getNotesById);  

router.delete("/:id",deleteNote)

export default router;

