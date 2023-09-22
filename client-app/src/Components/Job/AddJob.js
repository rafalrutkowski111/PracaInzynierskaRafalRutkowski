import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { useState, useEffect } from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ButtonBootstrapContainer = styled.div`
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
const ButtonBootstrapBack = styled(Form.Control)`
    width:150px;
    background-color: red;
    color: white;
`
const TittleContainer = styled.div`
    margin-top:2%;
    display: flex;
    justify-content: center;
`
const DataContainer = styled.div`
    margin-top:2%;
    margin-bottom:5%;
    display: flex;
    justify-content: center;
`

const SelectContainer = styled.div`
    margin-top: 1%;
    display: flex;
    justify-content: center;
`

const AddJob = () => {

    // const today = dayjs(); aktualny dzień biblioteka do tego jeżeli bede tego chciał użyć
    // const yesterday = dayjs().subtract(1, 'day');

    const [specialization, setSpecialization] = useState([]);
    const [listSpecialization, setListSpecialization] = useState([]);
    const [dataStart, setDataStart] = useState([]);
    const [dataEnd, setDataEnd] = useState([]);

    const userId = sessionStorage.getItem("userId");
    useEffect(() => {
        axios.get('http://localhost:5000/api/Specialization')
            .then(response => {
                setSpecialization(response.data);
                addSpecialization();
            })
    }, [])
    const back = () => {
        window.location.pathname = '/inzRafalRutkowski/';
    }

    const next = () => {
        axios.post('http://localhost:5000/api/Job',{title: "title", description: "description",
         start: dataStart.add(1, "day"), end: dataEnd.add(1, "day"), EmployerId: userId})
        .then(response => {
            console.log(response)
        })
    }
    const addSpecialization = () => {
        setListSpecialization([...listSpecialization, []])
    }

    return (
        <>
            <TittleContainer>
                <h1>Dodaj nową prace</h1>
            </TittleContainer>
            <DataContainer>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Data rozpoczęcia projektu"
                        disablePast
                        onChange={(e) => setDataStart(e)}
                    />
                    <DatePicker
                        disablePast
                        label="Data zakończenia projektu"
                        onChange={(e) => setDataEnd(e)}
                    />
                </LocalizationProvider>
            </DataContainer>

            {listSpecialization.map((data, i) => {
                return (
                    <SelectContainer>
                        <FormControl sx={{ minWidth: 300 }}>
                            <InputLabel>Specjazlizacja</InputLabel>
                            <Select
                                label="Specjazlizacja"
                            >
                                {specialization.map((choice) => (
                                    <MenuItem key={choice.id} value={choice.id}>
                                        {choice.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField id="outlined-basic" label="Ilość godzin" variant="outlined" />
                    </SelectContainer>
                )
            })}
            <Button
                variant="contained"
                onClick={() => {
                    addSpecialization();
                }}
            >Dodaj kolejny</Button>

            < ButtonBootstrapContainer >
                <ButtonBootstrap
                    type="submit"
                    id="button"
                    value="Dalej"
                    onClick={() => { next(); }}
                />
                <ButtonBootstrapBack
                    type="submit"
                    id="button"
                    value="Powrót"
                    onClick={() => { back(); }}
                />
            </ButtonBootstrapContainer >
        </>
    )
}

export default AddJob;