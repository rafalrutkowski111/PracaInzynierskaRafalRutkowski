
import styled from "styled-components";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

const SelectContainer = styled.div`
    margin-top: 1%;
    display: flex;
    justify-content: center;
`

const AddSpecializationAndHours = (props) => {
    // const {index} = props;
    return (
        <SelectContainer>
            <FormControl sx={{ minWidth: 300 }}>
                <InputLabel>Specjazlizacja</InputLabel>
                <Select
                    defaultValue={null}
                    value={props.data.SpecializationId}
                    label="Specjazlizacja"
                    disabled={props.data.Disabled}
                    onChange={(e) => props.changeSpecialization(e.target.value)}
                >
                    {props.dataSpecialization.map((choice) => (
                        <MenuItem
                            selected={props.data.SpecializationId == choice.id}
                            disabled={choice.Disabled}
                            key={choice.id}
                            renderValue={choice.id == 2}
                            value={choice.id}>
                            {choice.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                value={props.changeValueHours == true ? '' : props.data.Hours}
                onChange={(e) => props.changeHours(e)}
                type="number"
                id="outlined-basic"
                label="Ilość godzin"
                variant="outlined"
                inputProps={{ min: 1 }}
                InputLabelProps={{ shrink: true }}
            />
        </SelectContainer >
    )
}

export default AddSpecializationAndHours;