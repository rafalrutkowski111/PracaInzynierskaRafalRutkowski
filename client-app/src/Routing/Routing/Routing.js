import * as React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "../../Components/Home/Home";
import Toolbar from "../../Components/Navbar/Navbar";
import Login from "../../Components/Login/Login";
import { useEffect } from 'react';
import axios from 'axios';
import AddJob from "../../Components/Job/AddJob";

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
          <Route path="/AddJob" element={<AddJob />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Router