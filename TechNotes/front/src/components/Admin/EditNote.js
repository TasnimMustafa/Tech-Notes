import React,{useEffect,useState} from 'react'
import Navbar from '../Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function EditNote() {
    const {id} = useParams()
    console.log(id)
    const [note, setNote] = useState({});
    const [formData, setFormData] = useState({
        title: "",
        noteBody: "",
        owner: "",
      });

    useEffect(() => {
        const fetchNote = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/note/${id}`);
            setNote(response.data.data); 
            console.log(response.data.data)
            setFormData({
                title: response.data.data.title,
                noteBody: response.data.data.noteBody,
                owner: response.data.data.owner,
              });
          } catch (error) {
            console.error("Error:", error);
          }
        };
    
        fetchNote();
      }, [id]);


      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await axios.put(`http://localhost:5000/note/${id}`, formData);
          window.location.href='/view-notes'
        } catch (error) {
          console.error("Error:", error);
        }
      };


       /* FETCH USERS */
   const [users, setUsers] = useState([]);

   useEffect(() => {
     const fetchUsers = async () => {
       try {
         const response = await axios.get("http://127.0.0.1:5000/user/showusers");
         setUsers(response.data.data); 
         console.log(users)
       } catch (error) {
         console.error("Error:", error);
       }
     };
 
     fetchUsers();
   }, []);
 
  return (
    <div>
        <Navbar/>
        <div className='container text-white'>
        <h2 className='mt-3'>Edit Note #{note.ticket}</h2>
        <form onSubmit={handleSubmit}>   
        <div className='col-md-6 d-flex justify-content-end'>
        <button type='submit' className='btn' style={{"backgroundColor":"rgb(207 174 24)"}}>Update</button>
        </div>
       <div className="row mt-3">
       <label  htmlFor="title">
        Title
        </label>
        <input type="text" id="title" className='col-md-6 py-2'  name="title"
            value={formData.title}
            onChange={handleInputChange}/>
        </div >
        <div className="row mt-3">
            <label>
            Note
            </label>
            <textarea cols="20" rows="5" className='col-md-6' name="noteBody"
            value={formData.noteBody}
            onChange={handleInputChange}></textarea>
        </div>
        <div className="row mt-3">
            <label>
            Assigned to
            </label>
            <select className='col-md-6 py-2' name="owner"
            value={formData.owner._id}
            onChange={handleInputChange}>
            <option value="">select owner</option>
            {
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
              ))
            }
            </select>
        </div>
        </form>
        <p className='mt-3'>Created at : {note.createdAt}</p>
        <p>Updated at : {note.updatedAt}</p>
        </div>
       </div>
    
  )
}

export default EditNote