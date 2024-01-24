import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form'
import axios from 'axios';

const ButtonBootstrap = styled(Form.Control)`
    width:150px;
    background-color: green;
    color: white;
`
const ButtonContainer = styled.div`
  widht:60%;
  margin-top: 2%;
  display: flex;
  justify-content: center;
`

const AddEmployeeModal = (props) => {

    const addEmployee = (id) => {
        axios.put('http://localhost:5000/api/Employee', null, { params: { EmployeeId: id, EmployerId: props.userId } })
            .then(() => {
                axios.get('http://localhost:5000/api/Employee/getEmployeesWithoutEmployer')
                    .then(response => {
                        props.setDataListEmployee(response.data);
                        props.setModalOpen(false);
                        props.setConfirmModal(true)
                    })
            })
    }

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalOpen}
            onClose={() => props.setModalOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    width: 300,
                    maxWidth: 500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={3}
                >
                    Szczegóły pracownika
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                    <p><b>Imie</b> - {props.dataEmployee[0].name}</p>
                    <p><b>Nazwisko</b> - {props.dataEmployee[0].surname}</p>
                    <p><b>Specjalizacja - Doświadczenie</b></p>
                    {props.dataEmployee.map((data) => {
                        return (<>
                            <p>{data.specializationName} - {data.experienceName}</p>
                        </>)
                    })}
                </Typography>
                < ButtonContainer >
                    <ButtonBootstrap
                        type="submit"
                        id="button"
                        value="Dodaj"
                        onClick={() => { addEmployee(props.dataEmployee[0].employeeId) }}
                    />
                </ButtonContainer >
            </Sheet>
        </Modal>
    )
}

export { AddEmployeeModal }