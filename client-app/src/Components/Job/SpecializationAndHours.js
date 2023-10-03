
import styled from "styled-components";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SelectContainer = styled.div`
    margin-top: 1%;
    display: flex;
    justify-content: center;
`

const SpecializationAndHours = (props)=>{
   // const [index] = props;
    return(
        <SelectContainer>
        <FormControl sx={{ minWidth: 300 }}>
            <InputLabel>Specjazlizacja</InputLabel>
            {/* <Select
                //value={props.data.SpecializationId}
                label="Specjazlizacja"
                disabled={props.data.Disabled}
                onChange={(e) => props.changeSpecialization(e.target.value, props.index)}
            >
                {props.dataSpecialization.map((choice) => (
                    <MenuItem
                        selected = {props.data.SpecializationId == choice.id}
                        disabled={choice.Disabled}
                        key={choice.id}
                        value={choice.id}>
                        {choice.name}
                    </MenuItem>
                ))}
            </Select> */}
            <select onChange = {(e)=>{ props.changeSpecialization(e.target.value, props.index)}}>
            {props.dataSpecialization.map((choice) => (
                    <option
                        disabled={choice.Disabled}
                        key={choice.id}
                        value={choice.id}
                        selected = {props.data.SpecializationId == choice.id}>
                        {choice.name}
                    </option>
                ))}
            </select>
        </FormControl>
        <TextField
            value={props.data.Hours}
            onChange={(e) => props.changeHours(e, props.index)}
            type="number"
            id="outlined-basic"
            label="Ilość godzin"
            variant="outlined"
            inputProps={{ min: 1 }}
            InputLabelProps={{ shrink: true }}
        /> 
        <Button
            onClick={(e) => {
                props.removeButton(props.data.SpecializationId);
                console.log(props.data);
            }
            }
        >
            x
        </Button>
    </SelectContainer>
    )
}

export default SpecializationAndHours;