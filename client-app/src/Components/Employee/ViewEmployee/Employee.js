import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

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
const H1Container = styled.h1`
    margin-top: 1%;
    display: flex;
    justify-content: center;
`
const TextFieldContaioner = styled.div`
    margin-top: 5%;
    margin-bottom: 1%;
`

const Employee = () => {

  const [dataListEmployee, setDataListEmployee] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchSurname, setSearchSurname] = useState('');
  const [searchSpecialization, setSearchSpecialization] = useState('');
  const [searchExperience, setSearchExperience] = useState('');

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    axios.get('http://localhost:5000/api/Employee/getEmployees', { params: { employerId: userId } })
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

  const removeEmployee = (id) => {
    //usunąć pracownika

    //trzeba tu wysłać id pracownika i sprawdzić czy nie jest gdzieś zatrudniony (żeby to zrobić trzeba dokończyć dodawanie praconików do pracy)
    //następnie okno modalne z potwierdzeniem. Jeżeli gdzieś pracuje to o tym poinformować z ewentualnymi nazwami rpac gdzie
    //jeżeli potwierdzi to trzeba dla tych prac zrobić edycje. (trzbea pomyśleć jaką, albo tylko usunąć osobę, albo usunąć osobę i dać do algorytmu
    // ale tylko z tymi osobami co byli - ta osoba, albo to i to, ale nie wiem czy mam aż tyle czasu na robienie)
    // na końcu informacja o pomyślnej edycji. Jeżeli edytowaliśmy prace to inforamcja o tym z ewentuanymi nazwami gdzie
  }
  const editEmployee = (id) => {
    // albo zrobienie okna modalnego, albo przejście do nowej strony
    // wygląd edycji tak jak w dodaniu, ale z uzupełnionymi danymi
    // edytujemy pracownika

    // przy edycji będzie trzeba sprawdzać czy zrobiliśmy coś poza edycją nazw, jeżeli tak to zrobić to poniżej, jeżlei tylko nazwy to tylko potwierdzenie

    //trzeba tu wysłać id pracownika i sprawdzić czy nie jest gdzieś zatrudniony (żeby to zrobić trzeba dokończyć dodawanie praconików do pracy)
    //następnie okno modalne z potwierdzeniem. Jeżeli gdzieś pracuje to o tym poinformować z ewentualnymi nazwami rpac gdzie
    //jeżeli potwierdzi to trzeba dla tych prac zrobić edycje. (trzbea pomyśleć jaką, albo tylko usunąć osobę, albo usunąć osobę i dać do algorytmu
    // ale tylko z tymi osobami co byli - ta osoba, albo to i to, ale nie wiem czy mam aż tyle czasu na robienie)
    // na końcu informacja o pomyślnej edycji. Jeżeli edytowaliśmy prace to inforamcja o tym z ewentuanymi nazwami gdzie
  }

  return (
    <>
      <TittleContainer>
        <h1>Pracownicy</h1>
      </TittleContainer>
      
      <Container>
        <H1Container>Szukaj pracownika</H1Container>
        <TextFieldContaioner>
          <TextField
            onChange={(e) => setSearchName(e.target.value)}
            id="outlined-basic"
            label="Imie"
            variant="outlined" />
          <TextField
            onChange={(e) => setSearchSurname(e.target.value)}
            id="outlined-basic"
            label="Nazwisko"
            variant="outlined" />
          <TextField
            onChange={(e) => setSearchSpecialization(e.target.value)}
            id="outlined-basic"
            label="Specjalizacja"
            variant="outlined" />
          <TextField
            onChange={(e) => setSearchExperience(e.target.value)}
            id="outlined-basic"
            label="Doświadczenie"
            variant="outlined" />
        </TextFieldContaioner>

        <Sheet sx={{ height: 300, overflow: 'auto' }}>
          <Table
            stickyHeader
            stripe="odd"
            variant="outlined">
            <thead>
              <tr>
                <th>Imie</th>
                <th>Nazwisko</th>
                <th>Specjalizacja</th>
                <th>Doświadczenie</th>
                <th>Edycja</th>
                <th>Usuń</th>
              </tr>
            </thead>
            <tbody>
              {dataListEmployee.filter((item) => {
                return searchName.toLowerCase() === ''
                  ? item
                  : item.name.toLowerCase().includes(searchName)
              })
                .filter((item) => {
                  return searchSurname.toLowerCase() === ''
                    ? item
                    : item.surname.toLowerCase().includes(searchSurname) || item.surname.includes(searchSurname)
                }).filter((item) => {
                  return searchSpecialization.toLowerCase() === ''
                    ? item
                    : item.specializationName.toLowerCase().includes(searchSpecialization) || item.specializationName.includes(searchSpecialization)
                }).filter((item) => {
                  return searchExperience.toLowerCase() === ''
                    ? item
                    : item.experienceName.toLowerCase().includes(searchExperience) || item.experienceName.includes(searchExperience)
                }).map((item) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.specializationName}</td>
                    <td>{item.experienceName}</td>
                    <td>
                      <Button
                        disabled={item.employerId === null ? true : false}
                        onClick={() => editEmployee(item.id)}
                        startIcon={<ManageAccountsIcon />}>Edycja
                      </Button>
                    </td>
                    <td>
                      <Button
                        disabled={item.employerId === null ? true : false}
                        onClick={() => removeEmployee(item.id)}
                        startIcon={<PersonRemoveIcon />}>Usuń
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Sheet>
      </Container>

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