import styled from "styled-components"
import Sheet from '@mui/joy/Sheet';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';
import { jsPDF } from "jspdf";
import Table from '@mui/joy/Table';
import autoTable from 'jspdf-autotable'
import * as dayjs from 'dayjs'
import axios from "axios";

const ButtonContainer = styled.div`
    widht:60%;
    margin-top: 5%;
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
const MoneyPerHourContainer = styled.div`
    margin-top:2%;
    display: flex;
    justify-content: center;
    margin-bottom:2%;
`

const MoneyPerHour = (props) => {

    const changeMoneyPerHour = (e) => {
        props.setMoneyPerHour(e)
        if (e === '') {
            props.setErrorMoneyPerHour(true)
            props.setErrorMoneyPerHourLabel("Pole nie może być puste")
        }
        else if (e < 0) {
            props.setErrorMoneyPerHour(true)
            props.setErrorMoneyPerHourLabel("Stawka nie może być ujemna")
        }
        else {
            props.setErrorMoneyPerHour(false)
            props.setErrorMoneyPerHourLabel("")
        }
    }
    const validation = () => {
        if (props.moneyPerHour === '') {
            props.setErrorMoneyPerHour(true)
            props.setErrorMoneyPerHourLabel("Pole nie może być puste")
        }
        else if (props.moneyPerHour < 0) {
            props.setErrorMoneyPerHour(true)
            props.setErrorMoneyPerHourLabel("Stawka nie może być ujemna")
        }
        else {
            props.setErrorMoneyPerHour(false)
            props.setErrorMoneyPerHourLabel("")
        }
    }
    const next = () => {
        var cost = 0;
        const updateListEmployeeAddToJob = props.listEmployeeAddToJob.map(x => {
            x.cost = parseInt((x.employeeInJobList.length * props.moneyPerHour * x.hoursStart).toFixed(0))
            cost += x.cost
            return x
        })
        props.setListEmployeeAddToJob(updateListEmployeeAddToJob)
        props.setFullCost(cost.toFixed(0))

        props.setModalOpenEstimate(true)
    }

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalOpenMoneyPerHour}
            onClose={() => props.setModalOpenMoneyPerHour(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    width: 600,
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
                    Kosztorys
                </Typography>

                Kosztorys można wykonać tylko w przypadku kiedy format pracy jest oparty płaceniem na godziny, a meteriały kupuje zleceniodawca.
                <br />
                <br />
                <br />


                <MoneyPerHourContainer>
                    <TextField
                        error={props.errorMoneyPerHour}
                        helperText={props.errorMoneyPerHourLabel}
                        value={props.moneyPerHour}
                        InputLabelProps={{ shrink: true }}
                        onChange={e => changeMoneyPerHour(e.target.value)}
                        type="number"
                        InputProps={{ inputProps: { min: 1 } }}
                        id="outlined-basic"
                        label="PLN"
                        variant="outlined" />*
                </MoneyPerHourContainer>
                *Stawka w jakiej zleceniodawca płaci za usługę świadczoną przez pracownika za godzinę gracy


                < ButtonContainer >
                    <ButtonBootstrap
                        type="submit"
                        id="button"
                        value="Dalej"
                        onClick={props.moneyPerHour != '' && props.moneyPerHour > 0 ? () => { next() } : () => { validation() }}
                    />
                    <ButtonBootstrapBack
                        type="submit"
                        id="button"
                        value="Anuluj"
                        onClick={() => props.setModalOpenMoneyPerHour(false)}
                    />
                </ButtonContainer >

            </Sheet>
        </Modal >
    )
}

const Estimate = (props) => {
    let currentDate = new Date().toJSON().slice(0, 10);

    const back = () => {
        props.setModalOpenEstimate(false)
        props.setModalOpenMoneyPerHour(false)
    }
    const add = () => {
        if (props.notShow === true) {
            props.setIsEstimate(true)
            props.setModalOpenEstimate(false)
            props.setModalOpenMoneyPerHour(false)
        }
        else {
            var updateEstimate = props.estimate

            updateEstimate.moneyPerHour = props.moneyPerHour
            updateEstimate.createDate = dayjs(currentDate)
            updateEstimate.fullCost = props.fullCost

            updateEstimate.listCost = []

            props.listEmployeeAddToJob.map(item => {
                updateEstimate.listCost.push({ specializationName: item.specializationName, cost: item.cost })
            })
            props.setEstimate(updateEstimate)
            props.setIsEstimate(true)

            axios.post('http://localhost:5000/api/Job/editJob', {
                title: props.title, desc: "description", listEmployeeAddToJob: props.listEmployeeAddToJob, color: "",
                start: dayjs(props.dataStart), end: dayjs(props.dataEnd), EmployerId: props.userId, currentEnd: dayjs(props.endDayWork),
                jobId: props.jobId, city: props.city, street: props.street, number: props.number, zip: props.zip,
                name: props.nameInvestor, surname: props.surnameInvestor, estimate: props.estimate, isEstimate: true
            })

            props.setModalOpenEstimate(false)
            props.setModalOpenMoneyPerHour(false)
            props.setConfirmModal(true)
        }

    }

    const generatePDF = () => {
        var pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a5',
            putOnlyUsedFonts: true
        });
        pdf.setFontSize(22).setFont(undefined, 'bold')
        pdf.text("KOSZTORYS", 75, 30, 'center')

        pdf.setFontSize(10).setFont(undefined, 'normal')
        pdf.text(currentDate, 120, 10)
        pdf.text(props.title, 38, 50)
        pdf.text(props.city + " " + props.street + " " + props.number + " " + props.zip, 37, 55)
        pdf.text(props.nameInvestor + " " + props.surnameInvestor, 42, 60)
        pdf.text("Prace remontowe", 39, 65)
        pdf.text(props.moneyPerHour, 57, 70)
        pdf.text(currentDate, 45, 75)
        pdf.text(props.employer.name + " " + props.employer.surname, 39, 80)
        pdf.text(props.employer.phone, 29.5, 85)


        pdf.setFontSize(10).setFont(undefined, 'bold')
        pdf.text("Nazwa pracy:", 15, 50)
        pdf.text("Adres pracy:", 15, 55)
        pdf.text("Zleceniodawca:", 15, 60)
        pdf.text("Rodzaj pracy:", 15, 65)
        pdf.text("Stawka roboczogodziny:", 15, 70)
        pdf.text("Data opracownia:", 15, 75)
        pdf.text("Opracowanie:", 15, 80)
        pdf.text("Telefon:", 15, 85)

        autoTable(pdf, {
            margin: { top: 90 },
            head: [['Specializacja', 'Robocizna']],
            body:
                props.listEmployeeAddToJob.map((item) => {
                    return (

                        [item.specializationName,
                        item.cost]
                    )
                })
        })
        autoTable(pdf, {
            body: [
                ['RAZEM', "                                           " + props.fullCost + " PLN"],
            ],
        })


        pdf.save(props.title + '_kosztorys.pdf');
    }

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalOpenEstimate}
            onClose={() => props.setModalOpenEstimate(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    width: 600,
                    maxWidth: 1200,
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
                    Dane do kosztorysu
                </Typography>

                <b>Nazwa pracy:</b> {props.title}
                <br />
                <b>Adres pracy:</b> {props.city}, {props.street} {props.number} {props.zip}
                <br />
                <b>Zleceniodawca:</b> {props.nameInvestor} {props.surnameInvestor}
                <br />
                <b>Rodzaj pracy:</b> Prace remontowe
                <br />
                <b>Stawka roboczogodziny:</b> {props.moneyPerHour}
                <br />
                <b>Data opracownia:</b> {currentDate}
                <br />
                <b>Sporządził:</b> {props.employer.name} {props.employer.surname}
                <br />
                <b>Telefon:</b> {props.employer.phone}
                <br />
                <br />

                <Sheet >
                    < Table
                        variant="outlined"
                        borderAxis="x"
                        stickyHeader >
                        <thead>
                            <tr>
                                <th>Specializacja</th>
                                <th>Robocizna</th>
                            </tr>
                        </thead>
                        {props.listEmployeeAddToJob.map((item) => {
                            return (
                                <>
                                    <tbody>
                                        <tr>
                                            <td>{item.specializationName}</td>
                                            <td>{item.cost}</td>
                                        </tr>
                                    </tbody>
                                </>
                            )
                        })}
                    </Table >
                </Sheet>

                <Sheet>
                    < Table
                        stickyHeader
                        stripe="odd"
                    >
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td>RAZEM</td>
                                <td>{props.fullCost} PLN</td>
                            </tr>
                        </tbody>
                    </Table>
                </Sheet>
                <br />


                < ButtonContainer >
                    <ButtonBootstrap
                        type="submit"
                        id="button"
                        value="Dodaj"
                        onClick={() => add()}
                    />
                    <ButtonBootstrap
                        type="submit"
                        id="button"
                        value="Generuj pdf"
                        onClick={() => { generatePDF(); }}
                    />
                    <ButtonBootstrapBack
                        type="submit"
                        id="button"
                        value="Anuluj"
                        onClick={() => back()}
                    />
                </ButtonContainer >

            </Sheet>
        </Modal >
    )
}

export { MoneyPerHour }
export { Estimate }