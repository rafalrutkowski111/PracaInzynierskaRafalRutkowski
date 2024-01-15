import Sheet from '@mui/joy/Sheet';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import Table from '@mui/joy/Table';
import * as dayjs from 'dayjs'

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

const ShowEstimate = (props) => {

    let currentDate = new Date().toJSON().slice(0, 10);

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
        pdf.text((props.estimate.moneyPerHour).toString(), 57, 70)
        pdf.text(dayjs(props.estimate.createDate).format('DD/MM/YYYY'), 45, 75)
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
                props.estimate.listCost.map((item) => {
                    return (

                        [item.specializationName,
                        item.cost]
                    )
                })
        })
        autoTable(pdf, {
            body: [
                ['RAZEM', "                                           " + props.estimate.fullCost + " PLN"],
            ],
        })


        pdf.save(props.title + '_kosztorys.pdf');
    }


    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalOpenShowEstimate}
            onClose={() => props.setModalOpenShowEstimate(false)}
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

                    {
                        props.isEstimate === true ?
                            <>Dane do kosztorysu</>
                            : <>Kosztorys</>
                    }
                </Typography>

                {
                    props.isEstimate === true ?
                        <>
                            <b>Nazwa pracy:</b> {props.title}
                            <br />
                            <b>Adres pracy:</b> {props.city}, {props.street} {props.number} {props.zip}
                            <br />
                            <b>Zleceniodawca:</b> {props.nameInvestor} {props.surnameInvestor}
                            <br />
                            <b>Rodzaj pracy:</b> Prace remontowe
                            <br />
                            <b>Stawka roboczogodziny:</b> {props.estimate.moneyPerHour}
                            <br />
                            <b>Data opracownia:</b> {dayjs(props.estimate.createDate).format('DD/MM/YYYY')}
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
                                    {props.estimate.listCost.map((item) => {
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
                                            <td>{props.estimate.fullCost} PLN</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Sheet>
                            <br />

                        </>
                        : <>Brak kosztorysu.</>
                }

                <br /><br />
                < ButtonContainer >
                    {
                        props.isEstimate === true ?
                            <ButtonBootstrap
                                type="submit"
                                id="button"
                                value="Generuj pfd"
                                onClick={() => generatePDF()}
                            />
                            : null
                    }
                    <ButtonBootstrap
                        type="submit"
                        id="button"
                        value={"Dodaj nowy"}
                        onClick={() => props.setModalOpenMoneyPerHour(true)}
                    />
                    <ButtonBootstrapBack
                        type="submit"
                        id="button"
                        value={"Powtót"}
                        onClick={() => props.setModalOpenShowEstimate(false)}
                    />
                </ButtonContainer >

            </Sheet>
        </Modal >
    )
}

export { ShowEstimate }