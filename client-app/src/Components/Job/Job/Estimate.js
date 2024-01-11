import styled from "styled-components"
import Sheet from '@mui/joy/Sheet';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';
import { jsPDF } from "jspdf";

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
        console.log("gggggggg")
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
        //tu obliczyć i dodać do listy prace z ilością do zapłaty
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

    const back = () => {
        props.setModalOpenEstimate(false)
        props.setModalOpenMoneyPerHour(false)
    }

    const generatePDF = () => {
        console.log("test")
        var pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a5',
            putOnlyUsedFonts: true
        });
        pdf.text("Hello World", 20, 20);
        pdf.save('Demopdf.pdf');
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
                    maxWidth: 800,
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

                test

                trzeba dodać dane inwestora
                w poprzednim oknie modalnym zrobić funkcje wyliczającą dane

                < ButtonContainer >
                    <ButtonBootstrap
                        type="submit"
                        id="button"
                        value="pdfTEST"
                        onClick={() => { generatePDF(); }}
                    />
                    <ButtonBootstrap
                        type="submit"
                        id="button"
                        value="Dodaj"
                    //onClick={ }
                    />
                    <ButtonBootstrap
                        type="submit"
                        id="button"
                        value="Generuj pdf"
                    //onClick={ }
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