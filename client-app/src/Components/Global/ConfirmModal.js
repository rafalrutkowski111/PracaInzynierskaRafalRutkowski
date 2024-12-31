import Sheet from '@mui/joy/Sheet';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';
import { Button, CenterContainer, ButtonWrapper } from '../Styled/StyledGlobal';


const ConfirmModal = (props) => {
    const navigate = useNavigate();
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.confirmModal}
            onClose={props.changePath === true ?
                () => { props.setConfirmModal(false); navigate(props.endPath)}
                : () => { props.setConfirmModal(false) }}
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
                    {props.nameTitleConfirmModal}
                </Typography>

                {props.messageConfirmModal}

                < CenterContainer >
                <ButtonWrapper>
                    <Button
                        type="submit"
                        id="button"
                        value="Potwierdź"
                        onClick={props.changePath === true ?
                            () => { props.setConfirmModal(false); navigate(props.endPath) }
                            : () => { props.setConfirmModal(false) }
                        }
                    />
                    </ButtonWrapper>
                </CenterContainer >
            </Sheet>
        </Modal >
    )
}

export { ConfirmModal };