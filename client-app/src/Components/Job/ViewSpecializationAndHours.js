import styled from 'styled-components'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Container from '@mui/material/Container';

const H1Container = styled.h5`
    margin-top: 1%;
    display: flex;
    justify-content: center;
`

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


export default ViewSpecializationAndHours;