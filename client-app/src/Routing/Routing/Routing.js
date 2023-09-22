import * as React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "../../Components/Home/Home";
import Toolbar from "../../Components/Navbar/Navbar";
import Login from "../../Components/Login/Login";
import { useEffect } from 'react';
import axios from 'axios';
import AddJob from "../../Components/Job/AddJob";
import Employee from "../../Components/Employee/Employee";
import AddEmployee from "../../Components/Employee/AddEmployee";
import Specialization from "../../Components/Specialization/Specialization";
import AddSpecialization from "../../Components/Specialization/AddSpecialization";

const Router = () => {

  
  const [isLogged, setIsLogged] = React.useState(false);
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const userHashToken = sessionStorage.getItem("userHashToken")
    if(userId == null || userHashToken == null) setIsLogged(false);

    axios.get('http://localhost:5000/api/Employer/veryfieLogin', {params: {userId: userId, hash: userHashToken}})
    .then(response => {
        setIsLogged(true);
    }).catch(()=>{
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("userHashToken");
      setIsLogged(false); 
    })
  }, []);

  

  return !isLogged ? (
    <Login />
  ) : (
    <>
      <Toolbar />
      <BrowserRouter basename="/inzRafalRutkowski">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/calendar" element={<Home />}></Route>
          <Route path="/addJob" element={<AddJob />}></Route>
          <Route path="/employee" element={<Employee />}></Route>
          <Route path="/addEmployee" element={<AddEmployee />}></Route>
          <Route path="/specialization" element={<Specialization />}></Route>
          <Route path="/addSpecialization" element={<AddSpecialization />}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Router