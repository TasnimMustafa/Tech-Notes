import React,{useEffect,useState} from 'react'
import Navbar from '../Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function EditUser() {
    const {id} = useParams()
    console.log(id)
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        username: "",
        roles: "",
      });

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/user/${id}`);
            setUser(response.data.data); 
            console.log(response.data.data)
            setFormData({
                username: response.data.data.username,
                roles: response.data.data.roles.join(' , '),
                active: response.data.data.active,
              });
          } catch (error) {
            console.error("Error:", error);
          }
        };
    
        fetchUser();
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
          await axios.put(`http://localhost:5000/user/${id}`, formData);
          window.location.href='/view-users'
        } catch (error) {
          console.error("Error:", error);
        }
      };


      
  return (
    <div>
        <Navbar/>
        <div className='container text-white'>
        <h2 className='mt-3'>Edit Data Of {user.username}</h2>
        <form onSubmit={handleSubmit}>   
        <div className='col-md-6 d-flex justify-content-end'>
        <button type='submit' className='btn' style={{"backgroundColor":"rgb(207 174 24)"}}>Update</button>
        </div>
       <div className="row mt-3">
       <label  htmlFor="title">
        Username
        </label>
        <input type="text" id="username" className='col-md-6 py-2'  name="username"
            value={formData.username}
            onChange={handleInputChange}/>
        </div >
        <div className="row mt-3">
            <label>
            Roles
            </label>
            <input type="text" id="roles" className='col-md-6 py-2'  name="roles"
            value={formData.roles}
            onChange={handleInputChange}/>
        </div>
        
        </form>
        <p className='mt-3'>Created at : {user.createdAt}</p>
        <p>Updated at : {user.updatedAt}</p>
        </div>
       </div>
    
  )
}

export default EditUser