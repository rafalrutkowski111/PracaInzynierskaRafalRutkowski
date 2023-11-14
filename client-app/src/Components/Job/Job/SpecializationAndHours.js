import styled from "styled-components";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Container from '@mui/material/Container';

const SelectContainer = styled.div`
    margin-top: 1%;
    display: flex;
    justify-content: center;
`

const H1Container = styled.h5`
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
                            selected={props.data.SpecializationId === choice.id}
                            disabled={choice.Disabled}
                            key={choice.id}
                            renderValue={choice.id === 2}
                            value={choice.id}>
                            {choice.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                value={props.changeValueHours === true ? '' : props.data.Hours}
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

const ViewSpecializationAndHours = (props) => {
    
    return (
        <Container>
            <H1Container>Lista dodanych specjalizacji</H1Container>

            <Sheet sx={{ height: 200, overflow: 'auto' }}>
                <Table
                    stickyHeader
                    stripe="odd"
                    variant="outlined">
                    <thead>
                        <tr>
                            <th>Specjalizacja</th>
                            <th>ilość godzin</th>
                            <th>Usuń</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.dataListSpecialization.map((item) => (
                            <tr>
                                <td>{item.SpecializationName}</td>
                                <td>{item.Hours}</td>
                                <td>
                                    <Button
                                        onClick={() => props.removeSpecializationAndHours(item.SpecializationId)}
                                        startIcon={<DeleteIcon />}>Usuń
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Sheet>
        </Container>
    )
}

export  {AddSpecializationAndHours};
export  {ViewSpecializationAndHours};