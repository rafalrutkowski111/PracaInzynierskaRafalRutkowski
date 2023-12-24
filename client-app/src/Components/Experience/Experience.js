import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import { Button } from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import * as dayjs from 'dayjs'
import { InformationModal } from './InformationModal';
import Typography from '@mui/joy/Typography';

const ButtonContainer = styled.div`
    widht:60%;
    margin-top: 2%;
    display: flex;
    justify-content: center;
`
const ButtonBootstrap = styled(Form.Control)`
    width:250px;
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
const removeText = () => {
    return (
        <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
            <p>Element został poprawnie usunięty.</p>
        </Typography>
    )
}
const editText = () => {
    return (
        <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
            <p>Zmiany zostały poprawanie dodane do systemu.</p>
        </Typography>
    )
}
const errotText = () => {
    return (
        <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
            <p>Przynajmniej jeden z pracowników ma ustawiony ten poziom doświadczenia.</p>
            <p>W przypadku chęci zmiany wartości należy poszukać go wśród pracowników oraz go zmienić, aby nikt nie.</p>
        </Typography>
    )
}

const Experience = () => {

    const [listExperiances, setListExperiances] = useState([])
    const [searchName, setSearchName] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [informationModal, setInformationModal] = useState(false)
    const [message, setMessage] = useState();

    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        axios.get('http://localhost:5000/api/experience', { params: { employerId: userId } })
            .then(response => {
                setListExperiances(response.data)
                console.log(response.data)
            })
    }, [])

    const addNewExperience = () => {
        window.location.pathname = '/inzRafalRutkowski/experience/addExperience';
    }

    const editExperiance = (name, value, experianceId) => {

        let item = listExperiances.find(x => x.id === experianceId)
        if (item.errorValue === true || item.errorName === true) return

        axios.get('http://localhost:5000/api/experience/checkCanModify', { params: { experianceId: experianceId, employerId: userId, value: value, edit: true } })
            .then(response => {

                if (response.data === true) {
                    axios.post('http://localhost:5000/api/experience', { name: name, value: value, experianceId: experianceId })
                        .then(
                            setInformationModal(true),
                            setMessage(editText)
                        )
                }
                else {
                    setInformationModal(true)
                    setMessage(errotText)
                }
            })
    }

    const removeExperiance = (experianceId) => {
        axios.get('http://localhost:5000/api/experience/checkCanModify', { params: { experianceId: experianceId, employerId: userId, value: 0, edit: false } })
            .then(response => {

                if (response.data === true) {
                    axios.delete('http://localhost:5000/api/experience', { params: { experianceId: experianceId } })
                        .then(
                            setInformationModal(true),
                            setMessage(removeText)
                        )
                    let index = listExperiances.findIndex(x => x.id === experianceId);
                    let updateListExperiances = listExperiances.slice(0, index).concat(listExperiances.slice(index + 1))
                    setListExperiances(updateListExperiances)
                }
                else {
                    setInformationModal(true)
                    setMessage(errotText)
                }
            })
    }

    const changeName = (e, itemChange) => {
        const updateListExperiances = listExperiances.map(item => {
            if (item.id === itemChange.id) {
                item.experienceName = e.target.value
                if (e.target.value === '') {
                    item.errorName = true
                    item.helperTextName = "Nazwa nie może być pusta"
                }
                else {
                    item.errorName = false
                    item.helperTextName = ""
                }
            }

            return item
        })
        setListExperiances(updateListExperiances)
    }

    const changeValue = (e, itemChange) => {
        const updateListExperiances = listExperiances.map(item => {
            if (item.id === itemChange.id) {
                item.experienceValue = e.target.value
                if (e.target.value === '' || e.target.value < 31) {
                    item.errorValue = true
                    item.helperTextValue = "Liczba większa od 30"
                }
                else {
                    item.errorValue = false
                    item.helperTextValue = ""
                }
            }

            return item
        })
        setListExperiances(updateListExperiances)
    }

    const renderInformationModal = () => {
        return (
            <InformationModal setInformationModal={setInformationModal} informationModal={informationModal} message={message} />
        )
    }

    return (
        <>

            {renderInformationModal()}

            <TittleContainer>
                <h1>Poziomy doświaczenia</h1>
            </TittleContainer>

            <Container>
                <TextFieldContaioner>
                    <TextField
                        onChange={(e) => setSearchName(e.target.value)}
                        id="outlined-basic"
                        label="Nazawa"
                        variant="outlined" />
                    <TextField
                        onChange={(e) => setSearchValue(e.target.value)}
                        id="outlined-basic"
                        label="Wartość"
                        variant="outlined" />
                </TextFieldContaioner>

                <Sheet sx={{ height: 300, overflow: 'auto' }}>
                    <Table
                        stickyHeader
                        stripe="odd"
                        variant="outlined">
                        <thead>
                            <tr>
                                <th>Nazwa</th>
                                <th>Wartość</th>
                                <th>Edycja</th>
                                <th>Usuń</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listExperiances.filter((item) => {
                                return searchName.toLowerCase() === ''
                                    ? item
                                    : item.experienceName.toLowerCase().includes(searchName) || item.experienceName.includes(searchName)
                            })
                                .filter((item) => {
                                    return searchValue.toLowerCase() === ''
                                        ? item
                                        : String(item.experienceValue).toLowerCase().includes(searchValue)
                                }).map((item) => (
                                    <tr>
                                        <td>
                                            <TextField
                                                error={item.errorName}
                                                helperText={item.helperTextName}
                                                disabled={item.employerId === null ? true : false}
                                                value={item.experienceName}
                                                onChange={(e) => changeName(e, item)}
                                                id="outlined-basic"
                                                variant="outlined"
                                                size="small"
                                                inputProps={{ min: 1, style: { textAlign: 'center' } }}
                                                style={{ width: 200 }}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                error={item.errorValue}
                                                helperText={item.helperTextValue}
                                                disabled={item.employerId === null ? true : false}
                                                value={item.experienceValue}
                                                onChange={(e) => changeValue(e, item)}
                                                id="outlined-basic"
                                                type='number'
                                                variant="outlined"
                                                size="small"
                                                inputProps={{ min: 31, style: { textAlign: 'center' } }}
                                                style={{ width: 200 }}
                                            />
                                        </td>
                                        <td>
                                            <Button
                                                disabled={item.employerId === null ? true : false}
                                                onClick={() => editExperiance(item.experienceName, item.experienceValue, item.id)}
                                                startIcon={<ManageAccountsIcon />}>Edycja
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                disabled={item.employerId === null ? true : false}
                                                onClick={() => removeExperiance(item.id)}
                                                startIcon={<PersonRemoveIcon />}>Usuń
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Sheet>
            </Container >




            < ButtonContainer >
                <ButtonBootstrap
                    type="submit"
                    id="button"
                    value="Dodaj poziom doświaczenia"
                    onClick={() => { addNewExperience(); }}
                />
            </ButtonContainer >
        </>


    )
}

export default Experience;