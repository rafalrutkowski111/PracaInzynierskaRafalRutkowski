import styled from "styled-components";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';

const SelectContainer = styled.div`
    margin-top: 1%;
    display: flex;
    justify-content: center;
`
const ButtonContainer = styled.div`
    widht:60%;
    margin-top: 2%;
    display: flex;
    justify-content: center;
`
const H1Container = styled.h5`
    margin-top: 1%;
    display: flex;
    justify-content: center;
`

const AddSpecializationAndExperiance = (props) => {

    const changeSpecialization = (e) => {

        if (e !== '' && props.experianceValue !== '') props.setOpenAddSpecialization(false)

        props.setSpecializationValue(e)
    }
    const changeExperience = (e) => {
        if (e !== '' && props.specializationValue !== '') props.setOpenAddSpecialization(false)
        props.setExperianceValue(e)
    }

    return (
        <SelectContainer>
            <FormControl sx={{ minWidth: 300 }} >
                <InputLabel>Specjazlizacja</InputLabel>
                <Select
                    label="Specjazlizacja"
                    onChange={(e) => changeSpecialization(e.target.value)}
                    value={props.specializationValue}
                >
                    {props.dataSpecialization.map((choice) => (
                        <MenuItem
                            key={choice.id}
                            value={choice.id}>
                            {choice.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 300 }}>
                <InputLabel>Doświadczenie</InputLabel>
                <Select
                    label="Doświadczenie"
                    onChange={(e) => changeExperience(e.target.value)}
                >
                    {props.dataExperience.map((choice) => (
                        <MenuItem
                            key={choice.id}
                            value={choice.id}>
                            {choice.experienceName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </SelectContainer>
    )
}

const ButtonSpecializationAndExperiance = (props) => {

    const addSpecializationAndExperience = () => {
        const specializationName = props.dataSpecialization.find(x => x.id === props.specializationValue);
        const experienceName = props.dataExperience.find(x => x.id === props.experianceValue)

        props.setDataListSpecializationAndExperience([...props.dataListSpecializationAndExperience,
        {
            specializationId: props.specializationValue, specializationName: specializationName.name,
            experienceId: props.experianceValue, experianceName: experienceName.experienceName
        }])

        console.log(props.specializationValue)
        var tempDataSpecialization = [...props.dataSpecialization];
        const i = tempDataSpecialization.findIndex(x => x.id === props.specializationValue)
        tempDataSpecialization.splice(i, 1)
        props.setDataSpecialization(tempDataSpecialization)

        props.setSpecializationValue('')
        props.setOpenAddSpecialization(true)
    }
    return (
        < ButtonContainer >
            <Button sx={{ mr: 1 }}
                disabled={props.openAddSpecialization}
                variant="contained"
                onClick={() => { addSpecializationAndExperience() }}
            >Dodaj kolejny</Button>

        </ButtonContainer>
    )
}

const ViewSpecializationAndExperiance = (props) => {

    const removeSpecializationAndExperiance = (id) => {
        const list = [...props.dataListSpecializationAndExperience];
        const specializationRemove = list.find(x => x.specializationId === id)

        props.setDataSpecialization(dataSpecialization => [...dataSpecialization,
        { name: specializationRemove.specializationName, id: specializationRemove.specializationId }])

        const i = list.findIndex(x => x.specializationId === id)
        list.splice(i, 1)
        props.setDataListSpecializationAndExperience(list)

        props.setSpecializationValue(id)
        props.setOpenAddSpecialization(false)
    }

    const changeSpecialization = (value, id) => {
        const experianceName = props.dataExperience.find(x => x.id === value)
        const updateDataListSpecializationAndExperience = props.dataListSpecializationAndExperience.map((item) => {
            if (item.specializationId === id) {
                item.experienceId = value;
                item.experianceName = experianceName.experienceName
            }
            return item
        })
        props.setDataListSpecializationAndExperience(updateDataListSpecializationAndExperience)
    }

    return (
        <Container>
            <H1Container>Lista dodanych specjalizacji</H1Container>

            <Sheet sx={{ height: 200, overflow: 'auto' }}>
                <Table
                    stripe="odd"
                    variant="outlined">
                    <thead>
                        <tr>
                            <th>Specjalizacja</th>
                            <th>Doświadczenie</th>
                            <th>Usuń</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.dataListSpecializationAndExperience.map((item) => (
                            <tr>
                                <td>{item.specializationName}</td>
                                <td>
                                    <FormControl sx={{ minWidth: 250 }} size="small">
                                        <Select
                                            value={item.experienceId}
                                            onChange={(e) => changeSpecialization(e.target.value, item.specializationId)}
                                        >
                                            {props.dataExperience.map((choice) => (
                                                <MenuItem
                                                    key={choice.id}
                                                    value={choice.id}>
                                                    {choice.experienceName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </td>
                                <td>
                                    <Button
                                        onClick={() => removeSpecializationAndExperiance(item.specializationId)}
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

export { AddSpecializationAndExperiance }
export { ButtonSpecializationAndExperiance }
export { ViewSpecializationAndExperiance }