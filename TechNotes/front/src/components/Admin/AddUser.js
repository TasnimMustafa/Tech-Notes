import React, { useState,useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const AddUser = () => {
  const [errorMessage, setErrorMessage] = useState(""); 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    roles:[],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (e.target.type === "checkbox") {
      const roles = formData.roles;

      if (e.target.checked) {
        roles.push(value);
      } else {
        const index = roles.indexOf(value);
        if (index !== -1) {
          roles.splice(index, 1);
        }
      }

      setFormData({
        ...formData,
        roles,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:5000/user/register", formData);
      window.location.href = '/view-users'
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

  
  return (
    <div>
        <Navbar/> 
        <div className="container">     
      <form onSubmit={handleSubmit} className="text-dark mt-3">   
      {
          <>
          <span style={{"color":"red","fontSize":"16px","display":"block","marginBottom":"10px"}}>{errorMessage}</span>
          </>
        }
        <div className='col-md-6 d-flex justify-content-end'>
        <button type='submit' className='btn' style={{"backgroundColor":"rgb(207 174 24)"}}>Save</button>
        </div>
       <div className="row mt-3">
       <label  htmlFor="username">
        username
        </label>
        <input type="text" id="username" className='col-md-6 py-2'  name="username"
            value={formData.username}
            onChange={handleInputChange}/>
        </div >
        <div className="row mt-3">
            <label>
            password
            </label>
            <input type="password" id="password" className='col-md-6 py-2'  name="password"
            value={formData.password}
            onChange={handleInputChange}/>
        </div>
        <div className="row mt-3">
            <label>
            Roles
            </label>
            <div className="col-md-6 py-2">
            <label>
              <input
                type="checkbox"
                name="roles"
                value="Admin"
                checked={formData.roles.includes("Admin")}
                onChange={handleInputChange}
              />
              Admin
            </label>
            <label className="mx-3">
              <input
                type="checkbox"
                name="roles"
                value="Employee"
                checked={formData.roles.includes("Employee")}
                onChange={handleInputChange}
              />
              Employee
            </label>
            <label>
              <input
                type="checkbox"
                name="roles"
                value="Manager"
                checked={formData.roles.includes("Manager")}
                onChange={handleInputChange}
              />
              Manager
            </label>
          </div>
            
        </div>
        </form>
        </div>
    </div>
  );
};

export default AddUser;
