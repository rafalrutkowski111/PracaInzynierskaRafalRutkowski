import * as React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "../../Components/Home/Home";
import Toolbar from "../../Components/Navbar/Navbar";
import Login from "../../Components/Login/Login";
import { useEffect } from 'react';
import axios from 'axios';
import Specialization from "../../Components/Specialization/Specialization";
import AddSpecialization from "../../Components/Specialization/AddSpecialization";
import Experience from "../../Components/Experience/Experience";
import AddExperience from "../../Components/Experience/AddExperience";
import SearchEmployee from "../../Components/Employee/SearchEmployee/SearchEmployee";
import AddJob from "../../Components/Job/AddJob/AddJob";
import UpdateJob from "../../Components/Job/UpdateJob/UpdateJob";
import StoryJob from "../../Components/Job/StoryJob/StoryJob";
import AddEmployee from "../../Components/Employee/AddEmployee/AddEmployee";
import Employee from "../../Components/Employee/ViewEmployee/Employee";
import ShowJob from "../../Components/Job/ShowJob/ShowJob";
import Registration from "../../Components/Registration/Registration";

const Router = () => {


  const [isLogged, setIsLogged] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [test111, setTest111] = React.useState(false);
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const userHashToken = sessionStorage.getItem("userHashToken")
    if (userId == null || userHashToken == null) setIsLogged(false);

    axios.get('http://localhost:5000/api/Employer/veryfieLogin', { params: { userId: userId, hash: userHashToken } })
      .then(response => {
        setIsLogged(true);
      }).catch(() => {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userHashToken");
        setIsLogged(false);
      })
    //moglbym zrobic getEmployer jako varyfilogin i sprawdzac czy istnieje token
    // po testach wychodzi ze lepiej nie przechowywac nic w sesji bo to stracimimy otwierajac nowa karte
    // jak zmieni sie sposób pozyskiwania id (albio pobierania podobnie jak gerEmployer, albo robienie tego bezposrednio w backu )
    // to wywali się rzeczy z sesji i , usunie niepotrzebne rzeczy w logowaniu i usunie veryfieLogin na becku i tu i zamiast isLogged uzyje test111
    axios.get('http://localhost:5000/api/Employer', { withCredentials: true })
      .then(response => {
        setUserName(response.data.name + " " + response.data.surname)
        console.log(response)
        setTest111(true);
      }).catch(() => {
        setTest111(false);
      })
  }, []);


  return (
    <BrowserRouter basename="/inzRafalRutkowski">
      {isLogged ? (
        <>
          <Toolbar userName={userName} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Home />} />
            <Route path="/calendar/addJob" element={<AddJob />} />
            <Route path="/calendar/updateJob/:id" element={<UpdateJob />} />
            <Route path="/calendar/storyJob/:id" element={<StoryJob />} />
            <Route path="/calendar/showJob/:id" element={<ShowJob />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/employee/addEmployee" element={<AddEmployee />} />
            <Route path="/employee/searchEmployee" element={<SearchEmployee />} />
            <Route path="/specialization" element={<Specialization />} />
            <Route path="/specialization/addSpecialization" element={<AddSpecialization />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/experience/addExperience" element={<AddExperience />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
export default Router