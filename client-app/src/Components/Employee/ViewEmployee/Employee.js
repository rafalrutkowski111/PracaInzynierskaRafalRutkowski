import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ButtonContainer = styled.div`
  widht:60%;
  margin-top: 2%;
  display: flex;
  justify-content: center;
`
const ButtonBootstrap = styled(Form.Control)`
  width:150px;
  background-color: green;
  color: white;
`
const TittleContainer = styled.div`
    margin-top:2%;
    display: flex;
    justify-content: center;
    margin-bottom:5%;
`
const Employee = () => {

  const [dataListEmployee, setDataListEmployee] = useState([]);

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
      axios.get('http://localhost:5000/api/Employee/getEmployees',  { params: { employerId: userId }})
          .then(response => {
              setDataListEmployee(response.data)
              console.log(response.data)
          })
  }, [])

  const addNewEmployee = () => {
    window.location.pathname = '/inzRafalRutkowski/employee/addEmployee';
  }
  const searchNewEmployee = () => {
    window.location.pathname = '/inzRafalRutkowski/employee/searchEmployee';
  }

  return (
    <>
      <TittleContainer>
        <h1>Pracownicy</h1>
      </TittleContainer>

      < ButtonContainer >
        <ButtonBootstrap
          type="submit"
          id="button"
          value="Dodaj pracownika"
          onClick={() => { addNewEmployee(); }}
        />
        <ButtonBootstrap
          type="submit"
          id="button"
          value="Szukaj pracownika"
          onClick={() => { searchNewEmployee(); }}
        />
      </ButtonContainer >
    </>
  )
}

export default Employee;