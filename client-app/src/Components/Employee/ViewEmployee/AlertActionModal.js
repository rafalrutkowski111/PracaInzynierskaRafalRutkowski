import Sheet from '@mui/joy/Sheet';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

const ButtonContainer = styled.div`
    widht:60%;
    margin-top: 2%;
    display: flex;
    justify-content: center;
`
const ButtonBootstrap = styled(Form.Control)`
    width:150px;
    background-color: green;
    color: white;
`
const ButtonBootstrapBack = styled(Form.Control)`
    width:150px;
    background-color: red;
    color: white;
`
const AlertAction = (props) => {

    const secoundText = () => {
        const message = "Pracownik jest odpowiedzialny za prace: "
        return (
            <Typography id="modal-desc" textColor="text.tertiary" mb={3}>
                Pracownik używa tych specjalizacji w pracach (zaktualizuje je):
                {props.employeInJobList.employeeModifylist.map(x => " " + x.jobName + ", ")} <br /><br />
                {(props.employeInJobList.removeSpecialist === true ? message : '')}
                {(props.employeInJobList.removeSpecialist === true ?
                    props.employeInJobList.employeeModifylist.map(x =>
                        x.removeSpecialist === true ? x.jobName + ", " : '') : '')}
                {(props.employeInJobList.removeSpecialist === true ? <br /> : '')}
                {(props.employeInJobList.removeSpecialist === true ? <br /> : '')}
            </Typography>
        )
    }

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.modalOpenAlert}
            onClose={() => { props.setModalOpenAlert(false) }}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    width: 450,
                    maxWidth: 600,
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
                    {props.nameTitle}
                </Typography>
                {props.message}
                {props.employeInJobList.modifyWorks === true ? secoundText() : null}

                < ButtonContainer >
                    <ButtonBootstrap
                        type="submit"
                        id="button"
                        value="Potwierdź"
                        onClick={() => { props.editWorks() }}
                    />
                    <ButtonBootstrapBack
                        type="submit"
                        id="button"
                        value="Anuluj"
                        onClick={() => { props.setModalOpenAlert(false) }}
                    />
                </ButtonContainer >
            </Sheet>
        </Modal >
    )
}

export { AlertAction }