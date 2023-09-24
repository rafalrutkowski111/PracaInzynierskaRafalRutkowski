import { useState, useEffect } from "react"
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';

const TextFieldContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1%;
`
const SelectContainer = styled.div`
    margin-top: 1%;
    display: flex;
    justify-content: center;
`
const ButtonBootstrapContainer = styled.div`
    widht:60%;
    margin-top: 2%;
    display: flex;
    justify-content: center;
`
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
const ButtonBootstrapBack = styled(Form.Control)`
    width:150px;
    background-color: red;
    color: white;
`
const AddEmployee = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [dataSpecialization, setDataSpecialization] = useState([]);
    const [dataExperience, setDataExperience] = useState([]);
    const [dataListSpecializationAndExperience, setDataListSpecializationAndExperience] = useState([]);
    const [openAddSpecialization, setOpenAddSpecialization] = useState(true);
    const [openAddEmployee, setOpenAddEmployee] = useState(true);
    const userId = sessionStorage.getItem("userId");


    console.log(dataListSpecializationAndExperience)

    useEffect(() => {
        axios.get('http://localhost:5000/api/Specialization', { params: { EmployerId: userId } })
            .then(response => {
                setDataSpecialization(response.data);
                addSpecializationAndExperience();
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/api/Experience', { params: { EmployerId: userId } })
            .then(response => {
                setDataExperience(response.data);
            })
    }, [])

    const back = () => {
        window.location.pathname = '/inzRafalRutkowski/Employee';
    }
    const add = () => {
        axios.post('http://localhost:5000/api/Employee', { EmployerId: userId, Name: name, Surname: surname, IsEmployed: true, SpecializationAndExperience: dataListSpecializationAndExperience })
            .then(window.location.pathname = '/inzRafalRutkowski/Employee')
    }

    const addSpecializationAndExperience = () => {
        setDataListSpecializationAndExperience([...dataListSpecializationAndExperience, []])
        setOpenAddSpecialization(true)
        setOpenAddEmployee(true)


        dataSpecialization.map((date, index) => {
            if (date.id === dataListSpecializationAndExperience[dataListSpecializationAndExperience.length - 1].SpecializationId)
                date.Disabled = true
        })

        if (dataListSpecializationAndExperience.length > 0)
            dataListSpecializationAndExperience[dataListSpecializationAndExperience.length - 1].Disabled = true
    }

    const changeSpecialization = (e, index) => {
        const list = [...dataListSpecializationAndExperience];
        list[index] = { SpecializationId: e, ExperienceId: list[index].ExperienceId };
        setDataListSpecializationAndExperience(list);

        if (dataListSpecializationAndExperience[dataListSpecializationAndExperience.length - 1].ExperienceId !== undefined)
            setOpenAddSpecialization(false)

        if (dataListSpecializationAndExperience[dataListSpecializationAndExperience.length - 1].ExperienceId !== undefined
            && e !== "" && surname !== "")
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)

    }
    const changeExperience = (e, index) => {
        const list = [...dataListSpecializationAndExperience];
        list[index] = { ExperienceId: e.target.value, SpecializationId: list[index].SpecializationId, Disabled: list[index].Disabled }
        setDataListSpecializationAndExperience(list);

        if (dataListSpecializationAndExperience[dataListSpecializationAndExperience.length - 1].SpecializationId !== undefined)
            setOpenAddSpecialization(false)

        if (dataListSpecializationAndExperience[dataListSpecializationAndExperience.length - 1].SpecializationId !== undefined
            && e !== "" && surname !== "")
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)
    }
    const removeLast = () => {

        dataSpecialization.map((date, index) => {
            if (date.id === dataListSpecializationAndExperience[dataListSpecializationAndExperience.length - 2].SpecializationId)
                date.Disabled = false
        })

        dataListSpecializationAndExperience[dataListSpecializationAndExperience.length - 2].Disabled = false

        const list = [...dataListSpecializationAndExperience];
        list.splice(dataListSpecializationAndExperience.length - 1, 1)
        setDataListSpecializationAndExperience(list)

        setOpenAddSpecialization(false)
        if (name !== "" && surname !== "")
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)

        if (dataListSpecializationAndExperience.length <= 1)
            setOpenAddEmployee(true)
    }

    const changeName = (e) => {
        setName(e);
        if (dataListSpecializationAndExperience[dataListSpecializationAndExperience.length - 1].SpecializationId !== undefined
            && dataListSpecializationAndExperience[dataListSpecializationAndExperience.length - 1].ExperienceId !== undefined
            && e !== "" && surname !== "")
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)
    }

    const changeSurname = (e) => {
        setSurname(e);

        if (dataListSpecializationAndExperience[dataListSpecializationAndExperience.length - 1].SpecializationId !== undefined
            && dataListSpecializationAndExperience[dataListSpecializationAndExperience.length - 1].ExperienceId !== undefined
            && name !== "" && e !== "")
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)
    }



    return (<>
        <TextFieldContainer>
            <TextField onChange={(e) => changeName(e.target.value)} sx={{ minWidth: 250 }} id="outlined-basic"
                label="Podaj imie pracownika" variant="outlined" />
        </TextFieldContainer>
        <TextFieldContainer>
            <TextField onChange={(e) => changeSurname(e.target.value)} sx={{ minWidth: 250 }} id="outlined-basic"
                label="Podaj nazwisko pracownika" variant="outlined" />
        </TextFieldContainer>

        {dataListSpecializationAndExperience.map((data, index) => {
            return (
                <SelectContainer key={index}>
                    <FormControl sx={{ minWidth: 300, mr: 1 }}>
                        <InputLabel>Specjazlizacja</InputLabel>
                        <Select label="Specjazlizacja"
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

                    <FormControl sx={{ minWidth: 300, m: 0 }}>
                        <InputLabel>Doświadczenie</InputLabel>
                        <Select label="Doświadczenie"
                            onChange={(e) => changeExperience(e, index)}
                        >
                            {dataExperience.map((choice) => (
                                <MenuItem
                                    key={choice.id}
                                    value={choice.id}>
                                    {choice.experienceName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </SelectContainer>
            )
        })}
        < ButtonContainer >
            <Button sx={{ mr: 1 }}
                disabled={openAddSpecialization}
                variant="contained"
                onClick={() => {
                    addSpecializationAndExperience();
                }}
            >Dodaj kolejny</Button>
            <Button sx={{ mr: 2 }}
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
                value="Zapisz"
                onClick={() => { add(); }}
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

export default AddEmployee