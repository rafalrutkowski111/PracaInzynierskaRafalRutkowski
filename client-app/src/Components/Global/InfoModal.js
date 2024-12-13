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

const InfomModal = (props) => {
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.infoModal}
            onClose={() => { props.setInfoModal(false) }}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    width: props.widthInfomModal, // 450
                    maxWidth: props.maxWidthInfomModal, // 600
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
                    {props.nameTitleInfomModal}
                </Typography>

                {props.messageInfomModal}

                < ButtonContainer >
                    <ButtonBootstrap
                        type="submit"
                        id="button"
                        value="Potwierdź"
                        onClick={() => { props.setInfoModal(false) }}
                    />
                </ButtonContainer >
            </Sheet>
        </Modal >
    )
}

export { InfomModal };