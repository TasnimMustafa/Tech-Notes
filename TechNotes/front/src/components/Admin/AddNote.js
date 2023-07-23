import React, { useState,useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";

const AddNote = () => {
const [errorMessage, setErrorMessage] = useState(""); 
  const [formData, setFormData] = useState({
    title: "",
    noteBody: "",
    owner:"",
  });

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
      await axios.post("http://127.0.0.1:5000/note/create", formData);   
      window.location.href = '/view-notes'
    } catch (error) {
      console.error("Error:", error);
      let errorMessage;
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          setErrorMessage(errorMessage);
          console.log(errorMessage)
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
        
      <form onSubmit={handleSubmit} className="text-white container mt-3">   
      {
          <>
          <span style={{"color":"red","fontSize":"16px","display":"block","marginBottom":"10px"}}>{errorMessage}</span>
          </>
        }
        <div className='col-md-6 d-flex justify-content-end'>
        <button type='submit' className='btn' style={{"backgroundColor":"rgb(207 174 24)"}}>Save</button>
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
    </div>
  );
};

export default AddNote;
