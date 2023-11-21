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
        const currentDate = new Date();
        if (e.target.value === '') {
            e.target.value = "Praca-" + dayjs(currentDate).format('DD/MM/YYYY-HH.mm');
        }
        props.setTitle(e.target.value)

        if (props.dataListSpecialization.length - 1 >= 0 && props.dataEnd !== "" && props.dataStart)
            props.setOpenAddEmployee(false)
        else props.setOpenAddEmployee(true)
    }

    return(
        <TittleContainer>
            <TextField
                value={props.isUpdate !== true ? null : props.title}
                InputLabelProps={{ shrink: true }}
                onChange={e => changeTitle(e)}
                id="outlined-basic"
                label="Nazwa pracy"
                variant="outlined" />
        </TittleContainer>
    )
}

export default JobTitle;