import styled from "styled-components"
import TextField from '@mui/material/TextField';

const InvestorContainer = styled.div`
    margin-top:2%;
    display: flex;
    justify-content: center;
`

const Investor = (props) => {
    const changeName = (e) => {
        props.setNameInvestor(e)
        if (e === '') {
            props.setErrorNameInvestor(true)
            props.setErrorNameInvestorLabel("Pole nie może być puste")
        }
        else {
            props.setErrorNameInvestor(false)
            props.setErrorNameInvestorLabel("")
        }
    }
    const changeSurname = (e) => {
        props.setSurnameInvestor(e)
        if (e === '') {
            props.setErrorSurnameInvestor(true)
            props.setErrorSurnameInvestorLabel("Pole nie może być puste")
        }
        else {
            props.setErrorSurnameInvestor(false)
            props.setErrorSurnameInvestorLabel("")
        }
    }
    return (
        <InvestorContainer>
            <TextField
                error={props.errorNameInvestor}
                helperText={props.errorNameInvestorLabel}
                value={props.nameInvestor}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeName(e.target.value)}
                id="outlined-basic"
                label="Imie inwestora"
                variant="outlined" />
            <TextField
                error={props.errorSurnameInvestor}
                helperText={props.errorSurnameInvestorLabel}
                value={props.surnameInvestor}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeSurname(e.target.value)}
                id="outlined-basic"
                label="Nazwisko inwestora"
                variant="outlined" />
        </InvestorContainer>
    )
}

export default Investor