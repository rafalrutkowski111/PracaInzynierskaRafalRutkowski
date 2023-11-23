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

    const changeSpecialization = (e) => {
        props.setSpecializationValue(e);

        if (e !== '' && props.hoursValue !== '') props.setOpenAddSpecialization(false)

    }
    const changeHours = (e) => {
        if (e.target.value === '') {
            e.target.value = 1;
        }

        if (props.specializationValue !== '' && e !== '') props.setOpenAddSpecialization(false)

        props.setChangeValueHours(false);
        props.setHoursValue(e.target.value);
    }

    return (
        <SelectContainer>
            <FormControl sx={{ minWidth: 300 }}>
                <InputLabel>Specjazlizacja</InputLabel>
                <Select
                    defaultValue={null}
                    value={props.data.SpecializationId}
                    label="Specjazlizacja"
                    disabled={props.data.Disabled}
                    onChange={(e) => changeSpecialization(e.target.value)}
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
                onChange={(e) => changeHours(e)}
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

    const removeSpecializationAndHours = (indexSpecialization) => {
        if (props.dataListSpecialization.length - 1 === 0)
            props.setOpenAddEmployee(true)

        const list = [...props.dataListSpecialization];
        const specializationRemove = list.find(x => x.SpecializationId === indexSpecialization)

        props.setDataSpecialization(dataSpecialization => [...dataSpecialization, { name: specializationRemove.SpecializationName, id: specializationRemove.SpecializationId }])
        const i = list.findIndex(x => x.SpecializationId === indexSpecialization)
        list.splice(i, 1)
        props.setDataListSpecialization(list)
    }

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
                                        onClick={() => removeSpecializationAndHours(item.SpecializationId)}
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

const AddSpecializationButton = (props) => {

    const addSpecialization = () => {
        const SpecializationName = props.dataSpecialization.find(x => x.id === props.specializationValue);
        SpecializationName.Disabled = true;

        props.setDataListSpecialization([...props.dataListSpecialization,
        { SpecializationId: props.specializationValue, Hours: props.hoursValue, SpecializationName: SpecializationName.name }])

        var tempDataSpecialization = [...props.dataSpecialization];
        const i = tempDataSpecialization.findIndex(x => x.id === props.specializationValue)
        tempDataSpecialization.splice(i, 1)
        props.setDataSpecialization(tempDataSpecialization)

        props.setChangeValueHours(true);
        props.setHoursValue('');
        props.setSpecializationValue('');

        props.setOpenAddSpecialization(true)

        if (props.dataStart !== "" && props.dataEnd !== "" && props.title !== "")
            props.setOpenAddEmployee(false)
        else props.setOpenAddEmployee(true)
    }

    return (
        < props.ButtonContainer >
            <Button sx={{ mr: 1 }}
                disabled={props.openAddSpecialization}
                variant="contained"
                onClick={() => {
                    addSpecialization();
                }}
            >Dodaj kolejny</Button>
        </props.ButtonContainer>
    )
}

export { AddSpecializationAndHours };
export { ViewSpecializationAndHours };
export { AddSpecializationButton };