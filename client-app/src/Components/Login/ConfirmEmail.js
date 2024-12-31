import React from 'react'
import Sheet from '@mui/joy/Sheet';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { ButtonWrapper, Button, CenterContainer } from '../Styled/StyledGlobal';



const ConfirmEmail = (props) => {
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={props.confirmEmailModal}
            onClose={() => { props.setConfirmEmailModal(false) }}
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
                    Brak potwierdzenia e-mail
                </Typography>

                Przy utworzeniu konta wysłaliśmy link na podany email z linkiem rejestracyjnym ważnym przez 15 minut.
                <br></br>
                <br></br>
                W przypadku nieaktywnego lunku można poprosić o wysłanie go ponownie przyciskiem poniżej.
                <br></br>
                <br></br>

                < CenterContainer >
                    <ButtonWrapper>
                        <Button
                            type="submit"
                            id="button"
                            value="Potwierdź"
                            onClick={() => { props.setConfirmEmailModal(false) }}
                        />
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <Button
                            type="submit"
                            value="Powrót"
                            onClick={() => { props.setConfirmEmailModal(false) }}
                        />
                    </ButtonWrapper>
                </CenterContainer >
            </Sheet>
        </Modal >
    )
}

export default ConfirmEmail
