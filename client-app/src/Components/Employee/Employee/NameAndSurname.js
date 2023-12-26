import TextField from '@mui/material/TextField';
import styled from "styled-components";

const TextFieldContainer = styled.div`
    margin-top:1%;
    display: flex;
    justify-content: center;
`

const AddName = (props) => {

    const changeName = (e) => {
        props.setName(e)
        if (e === '') {
            props.setErrorName(true)
            props.setErrorNameLabel("Imie nie może być puste")
        }
        else {
            props.setErrorName(false)
            props.setErrorNameLabel("")
        }
    }
    return (
        <TextFieldContainer>
            <TextField
                error={props.errorName}
                helperText={props.errorNameLabel}
                value={props.name}
                onChange={(e) => changeName(e.target.value)}
                id="outlined-basic"
                label="Podaj imie"
                variant="outlined" />
        </TextFieldContainer>
    )
}

const AddSurname = (props) => {

    const changeSurname = (e) => {
        props.setSurname(e)
        if (e === '') {
            props.setErrorSurname(true)
            props.setErrorSurnameLabel("Nazwisko nie może być puste")
        }
        else {
            props.setErrorSurname(false)
            props.setErrorSurnameLabel("")
        }
    }

    return (
        <TextFieldContainer>
            <TextField
                error={props.errorSurname}
                helperText={props.errorSurnameLabel}
                value={props.surname}
                onChange={(e) => changeSurname(e.target.value)}
                id="outlined-basic"
                label="Podaj nazwisko "
                variant="outlined" />
        </TextFieldContainer>
    )
}

export { AddName }
export { AddSurname }