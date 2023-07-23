const express = require("express");
const router = express.Router();
const {createNote,showNotes,showNote,updateNote,deleteNote} = require('../controller/NotesController')
const auth = require("../middleware/auth-Middleware");
const isAdmin = require("../middleware/isAdmin-Middleware");

// notes routes
router.post('/create',createNote);
router.get('/',showNotes);
router.get('/:id',showNote);
router.put('/:id',updateNote);
router.delete('/:id',deleteNote);



module.exports = router



/*
Notes are assigned to specific employees 
 Notes can only be deleted by Managers or Admins
  Anyone can create a note 
  Employees can only view and edit their assigned notes 
  Managers and Admins can view, edit, and delete all notes
*/ 