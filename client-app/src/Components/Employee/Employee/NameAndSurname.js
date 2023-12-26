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
    }
    return (
        <TextFieldContainer>
            <TextField
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
    }

    return (
        <TextFieldContainer>
            <TextField
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