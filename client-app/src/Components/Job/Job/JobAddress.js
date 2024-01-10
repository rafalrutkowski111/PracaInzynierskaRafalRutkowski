import styled from "styled-components"
import TextField from '@mui/material/TextField';


const AddressContainer = styled.div`
    margin-top: 2%;
    display: flex;
    justify-content: center;
`

const JobAddress = () => {

    const rgxZIP= /^[0-9]{2}[-][0-9]{3}(-[0-9]{2}[-][0-9]{2})?$/;

    const changeZip = (e) =>{
         console.log(rgxZIP.test(e))
    }

    return (
            <AddressContainer>
                <TextField
                    //value={props.isUpdate !== true ? null : props.title}
                    InputLabelProps={{ shrink: true }}
                    //onChange={e => changeTitle(e)}
                    id="outlined-basic"
                    label="Miasto"
                    variant="outlined" />
                <TextField
                    //value={props.isUpdate !== true ? null : props.title}
                    InputLabelProps={{ shrink: true }}
                    //onChange={e => changeTitle(e)}
                    id="outlined-basic"
                    label="Ulica"
                    variant="outlined" />
                <TextField
                    //value={props.isUpdate !== true ? null : props.title}
                    InputLabelProps={{ shrink: true }}
                    //onChange={e => changeZip(e)}
                    id="outlined-basic"
                    label="Numer"
                    variant="outlined" />
                <TextField
                    //value={props.isUpdate !== true ? null : props.title}
                    InputLabelProps={{ shrink: true }}
                    onChange={e => changeZip(e.target.value)}
                    id="outlined-basic"
                    label="Kod pocztowy"
                    variant="outlined" />
            </AddressContainer>
    )
}

export default JobAddress