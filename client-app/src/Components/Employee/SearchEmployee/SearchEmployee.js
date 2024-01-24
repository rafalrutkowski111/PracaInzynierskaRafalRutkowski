import styled from 'styled-components'
import Form from 'react-bootstrap/Form'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Button } from "@mui/material";
import { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { AddEmployeeModal } from './AddEmployeeModal';
import { ConfirmModal } from '../../Global/ConfirmModal';
import Typography from '@mui/joy/Typography';

const H1Container = styled.h1`
    margin-top: 1%;
    display: flex;
    justify-content: center;
`
const TextFieldContaioner = styled.div`
    margin-top: 5%;
    margin-bottom: 1%;
`
const ButtonContainer = styled.div`
  widht:60%;
  margin-top: 2%;
  display: flex;
  justify-content: center;
`
const ButtonBootstrapBack = styled(Form.Control)`
    width:150px;
    background-color: red;
    color: white;
`
const addText = () => {
    return (
        <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
            <p>Dodano poprawnie nowego pracownika.</p>
        </Typography>
    )
}

const SearchEmployee = () => {

    const [dataListEmployee, setDataListEmployee] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchSurname, setSearchSurname] = useState('');
    const [searchSpecialization, setSearchSpecialization] = useState('');
    const [searchExperience, setSearchExperience] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [dataEmployee, setDataEmployee] = useState([{ name: '', surname: '', specializationName: '', experienceName: '', employeeId: '' }]);
    const [confirmModal, setConfirmModal] = useState(false)
    const [message, setMessage] = useState(addText);

    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        axios.get('http://localhost:5000/api/Employee/getEmployeesWithoutEmployer')
            .then(response => {
                setDataListEmployee(response.data)
            })
    }, [])

    const viewEmployee = (id) => {
        axios.get('http://localhost:5000/api/Employee/employeeSearch', { params: { id: id } })
            .then(response => {
                setDataEmployee(response.data)
            })
        setModalOpen(true)
    }
    const back = () => {
        window.location.pathname = '/inzRafalRutkowski/Employee'
    }

    const renderAddEmployeeModal = () => {
        return (
            <AddEmployeeModal modalOpen={modalOpen} setModalOpen={setModalOpen} dataEmployee={dataEmployee} userId={userId}
                setDataListEmployee={setDataListEmployee} setConfirmModal={setConfirmModal}/>
        )
    }
    const renderConfirmModal = () => {
        return (
            <ConfirmModal setConfirmModal={setConfirmModal} confirmModal={confirmModal} message={message}
                nameTitle={"Poziom doświadczenia"} />
        )
    }

    return (
        <>
            {renderConfirmModal()}
            {renderAddEmployeeModal()}

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
                                <th>Dodaj pracownika</th>
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
                                                onClick={() => viewEmployee(item.employeeId)}
                                                startIcon={<PersonAddIcon />}>Podgląd
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Sheet>
            </Container>

            < ButtonContainer >
                <ButtonBootstrapBack
                    type="submit"
                    id="button"
                    value="Powrót"
                    onClick={() => { back(); }}
                />
            </ButtonContainer >
        </>
    )
}

export default SearchEmployee;