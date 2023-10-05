import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import AddSpecializationAndHours from "./AddSpecializationAndHours";
import ViewSpecializationAndHours from "./ViewSpecializationAndHours";
import Table from '@mui/joy/Table';

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
    margin-bottom:3%;
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
    const [modalSpecializationListEmpltyOpen, setModalSpecializationListEmpltyOpen] = useState(false);
    const [openAddSpecialization, setOpenAddSpecialization] = useState(true);
    const [openAddEmployee, setOpenAddEmployee] = useState(true);
    const [dataEmployeeWithSpecialization, setDataEmployeeWithSpecialization] = useState([]); //{searchEmployee:[]}
    const [specializationValue, setSpecializationValue] = useState('');
    const [hoursValue, setHoursValue] = useState('');
    const [changeValueHours, setChangeValueHours] = useState(false);
    const [searchEmployee, setSearchEmployee] = useState([]);
    const [listEmployeeSpecializationListEmplty, setListEmployeeSpecializationListEmplty] = useState([])

    const userId = sessionStorage.getItem("userId");

    //console.log(dataListSpecialization)
    //console.log("aa")
    //console.log(searchEmployee)

    useEffect(() => {
        axios.get('http://localhost:5000/api/Specialization', { params: { EmployerId: userId } })
            .then(response => {
                setDataSpecialization(response.data);
            })
    }, [])
    const back = () => {
        // window.location.pathname = '/inzRafalRutkowski/';
        setModalOpen(true)
    }

    const next = () => {

        if (dataEnd.$d == "Invalid Date" || dataStart.$d == "Invalid Date" || dataStart > dataEnd) return

        axios.post('http://localhost:5000/api/Job/JobSpecialization',
            { JobSpecialization: dataListSpecialization, EmployerId: userId, start: dataStart.add(1, "day"), end: dataEnd.add(1, "day") })
            .then(response => {
                setDataEmployeeWithSpecialization(response.data.specializationList)
                setSearchEmployee(response.data.searchEmployee)
                setListEmployeeSpecializationListEmplty(response.data.listEmployeeSpecializationListEmplty)

                console.log("wwwww")
                console.log(response.data.listEmployeeSpecializationListEmplty )
                console.log("wwwww")

                if(response.data.listEmployeeSpecializationListEmplty.length != 0)setModalSpecializationListEmpltyOpen(true)
                 else setModalOpen(true)
            })

        

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
        const list = [...dataListSpecialization];
        list.push({ SpecializationId: specializationValue, Hours: hoursValue })

        const SpecializationName = dataSpecialization.find(x => x.id == specializationValue);
        SpecializationName.Disabled = true;

        setDataListSpecialization(dataListSpecialization => [...dataListSpecialization,
        { SpecializationId: specializationValue, Hours: hoursValue, SpecializationName: SpecializationName.name }])

        var tempDataSpecialization = [...dataSpecialization];
        const i = tempDataSpecialization.findIndex(x => x.id == specializationValue)
        tempDataSpecialization.splice(i, 1)
        setDataSpecialization(tempDataSpecialization)

        setChangeValueHours(true);
        setHoursValue('');
        setSpecializationValue('');

        setOpenAddSpecialization(true)

        if (dataStart !== "" && dataEnd !== "")
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)
    }

    const changeSpecialization = (e, index) => {
        setSpecializationValue(e);

        if (e !== '' && hoursValue !== '') setOpenAddSpecialization(false)

    }

    const changeHours = (e, index) => {
        if (e.target.value === '') {
            e.target.value = 1;
        }

        if (specializationValue !== '' && e !== '') setOpenAddSpecialization(false)

        setChangeValueHours(false);
        setHoursValue(e.target.value);
    }

    const changeStartDate = (e) => {
        setDataStart(e)

        if (dataListSpecialization.length - 1 >= 0 && e !== "" && dataEnd !== "")
            setOpenAddEmployee(false)
        else setOpenAddEmployee(true)
    }

    const changeEndDate = (e) => {
        setDataEnd(e)

        if (dataListSpecialization.length - 1 >= 0 && dataStart !== "" && e !== "")
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

    const removeSpecializationAndHours = (indexSpecialization) => {
        if (dataListSpecialization.length - 1 == 0)
            setOpenAddEmployee(true)

        const list = [...dataListSpecialization];
        const specializationRemove = list.find(x => x.SpecializationId == indexSpecialization)

        setDataSpecialization(dataSpecialization => [...dataSpecialization, { name: specializationRemove.SpecializationName, id: specializationRemove.SpecializationId }])
        const i = list.findIndex(x => x.SpecializationId == indexSpecialization)
        list.splice(i, 1)
        setDataListSpecialization(list)
    }

    const renderAddSpecializationAndHours = () => {
        return (
            <AddSpecializationAndHours changeSpecialization={changeSpecialization}
                data={dataListSpecialization} changeValueHours={changeValueHours}
                dataSpecialization={dataSpecialization} changeHours={changeHours} />
        )
    }

    const renderViewSpecializationAndHours = () => {
        return (
            <ViewSpecializationAndHours dataListSpecialization={dataListSpecialization}
                removeSpecializationAndHours={removeSpecializationAndHours} />
        )
    }
    return (
        <>

<Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={modalSpecializationListEmpltyOpen}
                onClose={() => setModalSpecializationListEmpltyOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        width: 450,
                        maxWidth: 600,
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
                        Brak wyspecjalizowanych pracowników
                    </Typography>
                    <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                        <p>Brak wyspecjalizowanych pracowników, których nie ma w naszej bazie:
                         {listEmployeeSpecializationListEmplty.map((data, index) => {
                            return (" " + data)
                        }
                        )}</p>
                        <p>Chcąc przejść dalej należy wykonać jedą z poniższych rzeczy.</p>
                        <p>1. Anulowac powyżesze specjalizacje. <br />                    
                        2. Dodać w zakładce pracownicy takich specjalistów. <br />
                        3. Poczekać aż będą dostępni specjaliliści poszukujacy pracy. </p>


                    </Typography>
                    < ButtonContainer >
                        <ButtonBootstrapBack
                            type="submit"
                            id="button"
                            value="Wróć"
                            onClick={() => { modalTest() }}
                        />
                    </ButtonContainer >
                </Sheet>
            </Modal >










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
                        width: 450,
                        maxWidth: 600,
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
                        Brak wyspecjalizowanych pracowników
                    </Typography>
                    <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                        <p>Każde specjalizacja musi mieć przynajmniej jedenego wyspecjalizowanego pracownika.</p>
                        <p>Specjalizacje bez doświadczonego pracownika: {dataEmployeeWithSpecialization.map((data, index) => {
                            return (data.haveSpecialist === false ? " " + data.specializationName + " " : null)
                        }
                        )}</p>
                        <p>Z wprowadzonymi danymi brakuje wyspecjalizowaneo pracownika. Możesz go dodać w zakłądce Pracownicy,
                        lub jeżeli jest dodać z listy poniżej.</p>


                        {searchEmployee.map((item) => {

                            return (
                                <>
                                    <td>{item.specializationName}</td>
                                    < Table
                                        stickyHeader
                                        stripe="odd"
                                        variant="outlined" >
                                        <thead>
                                            <tr>
                                                <th>Specjalizacja</th>
                                                <th>ilość godzin</th>
                                                <th>Usuń</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr>
                                                {/* <td>{item.specializationId}</td>
                                            <td>{item.specializationName}</td> */}
                                                <td>
                                                    <Button>
                                                        {/* //onClick={() => props.removeSpecializationAndHours(item.SpecializationId)}
                                                //</td>startIcon={<DeleteIcon />}>Usuń */}
                                                    </Button>
                                                </td>
                                            </tr>


                                        </tbody>
                                    </Table>
                                </>

                            )
                        })}

                    </Typography>
                    < ButtonContainer >
                        <ButtonBootstrap
                            type="submit"
                            id="button"
                            value="Dalej"
                            onClick={() => { modalTest() }}
                        />
                    </ButtonContainer >
                </Sheet>
            </Modal >

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

            {renderAddSpecializationAndHours()}

            < ButtonContainer >
                <Button sx={{ mr: 1 }}
                    disabled={openAddSpecialization}
                    variant="contained"
                    onClick={() => {
                        addSpecialization();
                    }}
                >Dodaj kolejny</Button>
            </ButtonContainer>

            {renderViewSpecializationAndHours()}

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