import React, { useEffect, useState } from "react";
import Navbar from '../Navbar'
import axios from "axios";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";


function ViewNotes() {
  // const navigate = useNavigate()
  
    const [notes, setNotes] = useState([]);
    
    useEffect(() => {
        const fetchNotes = async () => {
          try {
            const response = await axios.get("http://localhost:5000/note/");
            setNotes(response.data.data);
          } catch (error) {
            console.error("Error fetching notes:", error);
          }
        };
    
        fetchNotes();
      }, []);

      const handleEdit = (id) => {
        // console.log(id);
        // navigate(`/edit-note/${id}`);
        window.location.href=`/edit-note/${id}`
      };

      const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/note/${id}`);
          const response = await axios.get("http://localhost:5000/note/");
          setNotes(response.data.data);
        } catch (error) {
          console.error("Error deleting note:", error);
        }
      };

  return (
    <>
    <Navbar/>
    <Link to={"/dashboard"}>Back to Home</Link>
      <div className="table-responsive container mt-4">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Note</th>
            <th>Owner</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {
          notes?.length !== 0 ?
          notes?.map((note) => (
            <tr key={note.id}>
              <td>{note.title}</td>
              <td>{note.noteBody}</td>
              <td>{note.owner.username}</td>
              <td>
                <Link onClick={() => handleEdit(note._id)} className="text-dark"><FaEdit/></Link>
                <Link onClick={() => handleDelete(note._id)} className="text-dark"><FaTrash/></Link>
              </td>
            </tr>
          )) 
          : <h4 className="text-white mt-3">No Notes Yet !!!</h4>
        }
        </tbody>
      </table>
      </div>
    </>
  )
}

export default ViewNotes