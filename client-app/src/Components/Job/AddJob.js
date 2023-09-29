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
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

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
const ButtonContainer = styled.div`
  widht:60%;
  margin-top: 2%;
  display: flex;
  justify-content: center;
`
const AddJob = () => {

    const [dataSpecialization, setDataSpecialization] = useState([]);
    const [dataListSpecialization, setDataListSpecialization] = useState([]);
    const [dataStart, setDataStart] = useState('');
    const [dataEnd, setDataEnd] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [openAddSpecialization, setOpenAddSpecialization] = useState(true);
    const [openRemoveSpecialization, setOpenRemoveSpecialization] = useState(true);
    const [openAddEmployee, setOpenAddEmployee] = useState(true);

    const userId = sessionStorage.getItem("userId");

    //console.log(dataListSpecialization)

    useEffect(() => {
        axios.get('http://localhost:5000/api/Specialization', { params: { EmployerId: userId } })
            .then(response => {
                setDataSpecialization(response.data);
                addSpecialization();
            })
    }, [])
    const back = () => {
        window.location.pathname = '/inzRafalRutkowski/';
    }

    const next = () => {
        if (dataStart > dataEnd) return

        console.log(dataListSpecialization[0])
        axios.post('http://localhost:5000/api/Job/JobSpecialization', { JobSpecialization: dataListSpecialization, EmployerId: userId} )
            .then(response => {
                console.log("test");
            })



        //setModalOpen(true)

        //tu dodać logike dla modali

        // axios.post('http://localhost:5000/api/Job', {
        //     title: "title", desc: "description",
        //     start: dataStart.add(1, "day"), end: dataEnd.add(1, "day"), EmployerId: userId
        // })
        //     .then(response => {
        //         console.log(response)
        //     })
    }
    const addSpecialization = () => {
        setDataListSpecialization([...dataListSpecialization, []])
        setOpenAddSpecialization(true)
        setOpenAddEmployee(true)

        if (dataListSpecialization.length > 0)
            setOpenRemoveSpecialization(false)


        dataSpecialization.map((date, index) => {
            if (date.id === dataListSpecialization[dataListSpecialization.length - 1].SpecializationId)
                date.Disabled = true
        })

        if (dataListSpecialization.length > 0)
            dataListSpecialization[dataListSpecialization.length - 1].Disabled = true

    }

    const changeSpecialization = (e, index) => {
        const list = [...dataListSpecialization];
        list[index] = { SpecializationId: e, Hours: list[index].Hours };
        setDataListSpecialization(list);

        if (dataListSpecialization[dataListSpecialization.length - 1].Hours !== undefined)
            setOpenAddSpecialization(false)

        if (dataListSpecialization[dataListSpecialization.length - 1].Hours !== undefined
            && dataStart !== "" && dataEnd !== "")
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)
    }

    const changeHours = (e, index) => {
        if (e.target.value === '') {
            e.target.value = 1;
        }
        const list = [...dataListSpecialization];
        list[index] = { Hours: e.target.value, SpecializationId: list[index].SpecializationId, Disabled: list[index].Disabled }
        setDataListSpecialization(list);

        if (dataListSpecialization[dataListSpecialization.length - 1].SpecializationId !== undefined)
            setOpenAddSpecialization(false)

        if (dataListSpecialization[dataListSpecialization.length - 1].SpecializationId !== undefined
            && dataStart !== "" && dataEnd !== "")
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)
    }

    const removeLast = () => {
        if (dataListSpecialization.length < 3)
            setOpenRemoveSpecialization(true)

        if (dataListSpecialization.length < 2) return

        dataSpecialization.map((date, index) => {
            if (date.id === dataListSpecialization[dataListSpecialization.length - 2].SpecializationId)
                date.Disabled = false
        })

        dataListSpecialization[dataListSpecialization.length - 2].Disabled = false

        const list = [...dataListSpecialization];
        list.splice(dataListSpecialization.length - 1, 1)
        setDataListSpecialization(list)

        setOpenAddSpecialization(false)
        if (dataStart !== "" && dataEnd !== "")
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)

        if (dataListSpecialization.length <= 1)
            setOpenAddEmployee(true)
    }

    const changeStartDate = (e) => {
        setDataStart(e)

        if (dataListSpecialization[dataListSpecialization.length - 1].SpecializationId !== undefined
            && dataListSpecialization[dataListSpecialization.length - 1].Hours !== undefined
            && e !== "" && dataEnd !== "")
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)
    }

    const changeEndDate = (e) => {
        setDataEnd(e)

        if (dataListSpecialization[dataListSpecialization.length - 1].SpecializationId !== undefined
            && dataListSpecialization[dataListSpecialization.length - 1].Hours !== undefined
            && dataStart !== "" && e !== "")
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)
    }















    const modalTest = () => {

    }

    const startValidation = (date) => {
        const day = date.day();
        return day === 0 || day === 6;
    };

    const endValidation = (date) => {
        const day = date.day();

        if (dataStart !== '') {
            return dataStart.add(1, "day") > date || day === 0 || day === 6;
        }
        return day === 0 || day === 6;
    };
    return (
        <>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        width: 300,
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={3}
                    >
                        Szczegóły pracownika
                    </Typography>
                    <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                        <p>test</p>
                    </Typography>
                    < ButtonContainer >
                        <ButtonBootstrap
                            type="submit"
                            id="button"
                            value="Dodaj"
                            onClick={() => { modalTest() }}
                        />
                    </ButtonContainer >
                </Sheet>
            </Modal>

            <TittleContainer>
                <h1>Dodaj nową prace</h1>
            </TittleContainer>
            <DataContainer>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Data rozpoczęcia projektu"
                        disablePast
                        shouldDisableDate={startValidation}
                        onChange={(e) => changeStartDate(e)}
                    />
                    <DatePicker
                        shouldDisableDate={endValidation}
                        disablePast
                        label="Data zakończenia projektu"
                        onChange={(e) => changeEndDate(e)}
                    />
                </LocalizationProvider>
            </DataContainer>


            {dataListSpecialization.map((data, index) => {
                return (
                    <SelectContainer>
                        <FormControl sx={{ minWidth: 300 }}>
                            <InputLabel>Specjazlizacja</InputLabel>
                            <Select
                                label="Specjazlizacja"
                                disabled={data.Disabled}
                                onChange={(e) => changeSpecialization(e.target.value, index)}
                            >
                                {dataSpecialization.map((choice) => (
                                    <MenuItem
                                        disabled={choice.Disabled}
                                        key={choice.id}
                                        value={choice.id}>
                                        {choice.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            onChange={(e) => changeHours(e, index)}
                            type="number"
                            id="outlined-basic"
                            label="Ilość godzin"
                            variant="outlined"
                            inputProps={{ min: 1 }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </SelectContainer>
                )
            })}
            < ButtonContainer >
                <Button sx={{ mr: 1 }}
                    disabled={openAddSpecialization}
                    variant="contained"
                    onClick={() => {
                        addSpecialization();
                    }}
                >Dodaj kolejny</Button>
                <Button sx={{ mr: 2 }}
                    disabled={openRemoveSpecialization}
                    variant="contained"
                    onClick={() => {
                        removeLast();
                    }}
                >Usuń ostatni</Button>
            </ButtonContainer>

            < ButtonBootstrapContainer >
                <ButtonBootstrap
                    disabled={openAddEmployee}
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