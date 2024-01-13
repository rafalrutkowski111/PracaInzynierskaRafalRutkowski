import styled from "styled-components"
import TextField from '@mui/material/TextField';


const AddressContainer = styled.div`
    margin-top: 2%;
    display: flex;
    justify-content: center;
`

const JobAddress = (props) => {

    const rgxZIP = /^[0-9]{2}[-][0-9]{3}(-[0-9]{2}[-][0-9]{2})?$/;

    const changeZip = (e) => {
        props.setZip(e)
        if (e === '') {
            props.setErrorAddressZip(true)
            props.setErrorAddressZipLabel("Pole nie może być puste")
        }
        else if (!rgxZIP.test(e)) {
            props.setErrorAddressZip(true)
            props.setErrorAddressZipLabel("format kodu pocztowego 00-000")
        }
        else {
            props.setErrorAddressZip(false)
            props.setErrorAddressZipLabel("")
        }
    }
    const changeCity = (e) => {
        props.setCity(e)
        if (e === '') {
            props.setErrorAddressCity(true)
            props.setErrorAddressCityLabel("Pole nie może być puste")
        }
        else {
            props.setErrorAddressCity(false)
            props.setErrorAddressCityLabel("")
        }
    }
    const changeStreet = (e) => {
        props.setStreet(e)
        if (e === '') {
            props.setErrorAddressStreet(true)
            props.setErrorAddressStreetLabel("Pole nie może być puste")
        }
        else {
            props.setErrorAddressStreet(false)
            props.setErrorAddressStreetLabel("")
        }
    }
    const changeNumber = (e) => {
        props.setNumber(e)
        if (e === '') {
            props.setErrorAddressNumber(true)
            props.setErrorAddressNumberLabel("Pole nie może być puste")
        }
        else {
            props.setErrorAddressNumber(false)
            props.setErrorAddressNumberLabel("")
        }
    }

    return (
        <AddressContainer>
            <TextField
                error={props.errorAddressCity}
                helperText={props.errorAddressCityLabel}
                value={props.city}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeCity(e.target.value)}
                id="outlined-basic"
                label="Miasto"
                variant="outlined" />
            <TextField
                error={props.errorAddressStreet}
                helperText={props.errorAddressStreetLabel}
                value={props.street}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeStreet(e.target.value)}
                id="outlined-basic"
                label="Ulica"
                variant="outlined" />
            <TextField
                error={props.errorAddressNumber}
                helperText={props.errorAddressNumberLabel}
                value={props.number}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeNumber(e.target.value)}
                id="outlined-basic"
                label="Numer"
                variant="outlined" />
            <TextField
                error={props.errorAddressZip}
                helperText={props.errorAddressZipLabel}
                value={props.zip}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeZip(e.target.value)}
                id="outlined-basic"
                label="Kod pocztowy"
                variant="outlined" />
        </AddressContainer>
    )
}

export default JobAddress