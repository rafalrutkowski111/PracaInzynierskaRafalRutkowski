import TextField from '@mui/material/TextField';
import styled from "styled-components";
import * as dayjs from 'dayjs'

const TittleContainer = styled.div`
    margin-top:2%;
    display: flex;
    justify-content: center;
`

const JobTitle = (props) => {

    const changeTitle = (e) => {
        props.setTitle(e)
        if (e === '') {
            props.setErrorTitle(true)
            props.setErrorTitleLabel("Pole nie może być puste")
        }
        else {
            props.setErrorTitle(false)
            props.setErrorTitleLabel("")
        }
    }

    return (
        <TittleContainer>
            <TextField
                error={props.errorTitle}
                helperText={props.errorTitleLabel}
                value={props.title}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeTitle(e.target.value)}
                id="outlined-basic"
                label="Nazwa pracy"
                variant="outlined" />
        </TittleContainer>
    )
}

export default JobTitle;