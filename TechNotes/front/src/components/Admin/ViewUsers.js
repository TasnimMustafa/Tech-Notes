import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from "react-router-dom";


const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); 


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/user/showusers");
        setUsers(response.data.data);
        console.log(users)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);


  const handleEdit = (id) => {
    console.log(id);
    window.location.href=`/edit-user/${id}`
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/user/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
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
        {
          <div className="container mt-3">
            <Link to={"/dashboard"}>Back To Home</Link>
          <span style={{"color":"red","fontSize":"16px","display":"block","marginBottom":"10px"}}>{errorMessage}</span>
          </div>
        }
      <div className="table-responsive container mt-4">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Username</th>
            <th>Roles</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.roles.join(" , ")}</td>
              <td>
                <Link onClick={() => handleEdit(user._id)} className="text-dark"><FaEdit /></Link>
                <Link onClick={() => handleDelete(user._id)} className="text-dark"><FaTrash /></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      </div>
  )
}

export default ViewUsers
