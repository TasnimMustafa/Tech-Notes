import {React , useState} from "react";
import { BrowserRouter as Router,Routes, Route, Navigate} from "react-router-dom";
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
import Login from './components/login/Login';
import Dashboard from './components/Admin/Dashboard'
import NotFound from './components/NotFound'; 
import DashboardEmployee from "./components/User/Dashboard";
import ViewNotes from "./components/Admin/ViewNotes";
import EditNote from "./components/Admin/EditNote";
import AddNote from "./components/Admin/AddNote";
import ViewUsers from "./components/Admin/ViewUsers";
import EditUser from "./components/Admin/EditUser";
import AddUser from "./components/Admin/AddUser";
import ViewUserNotes from "./components/User/ViewUserNotes";
import AddUserNote from "./components/User/AddUserNote";


function App() {

  const token = Cookies.get('jwt');
  
     
  return (
    <div className="App">
        <Router>
          <Routes>
          {/* <Route exact path="/" element={!token ? <Login /> : <Navigate to="/dashboard" replace />} /> */}
          <Route exact path="/" element={<Login/>} /> 

          {/* //     Admin routes   // */}
          <Route path="/dashboard" element={token  ? <Dashboard /> : <Navigate to="/" replace />}/>   
          <Route path="/view-notes" element={token ? <ViewNotes /> : <Navigate to="/" replace />}/>   
          <Route path="/edit-note/:id" element={token  ? <EditNote /> : <Navigate to="/" replace />}/>   
          <Route path="/add-note" element={token  ? <AddNote /> : <Navigate to="/" replace />}/>   
          <Route path="/add-user" element={token ? <AddUser /> : <Navigate to="/" replace />}/>   
          <Route path="/view-users" element={token ? <ViewUsers /> : <Navigate to="/" replace />}/>   
          <Route path="/edit-user/:id" element={token ? <EditUser /> : <Navigate to="/" replace />}/>   


          {/* //     user routes   // */}
          <Route path="/dashboard-employee" element={token  ? <DashboardEmployee /> : <Navigate to="/" replace />}/>   
          <Route path="/add-user-note" element={token  ? <AddUserNote /> : <Navigate to="/" replace />}/>   
          <Route path="/view-user-notes" element={token  ? <ViewUserNotes/> : <Navigate to="/" replace />}/>   



        <Route path="*" element={<NotFound />} />     
        </Routes>
       </Router>

    </div>
  );
}

export default App;

