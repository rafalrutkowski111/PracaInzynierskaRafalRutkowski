import React, { useState } from 'react'
import Sheet from '@mui/joy/Sheet';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { ButtonWrapper, Button, CenterContainer, ButtonFullWidth, ButtonSpacer } from '../Styled/StyledGlobal';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const ConfirmEmail = (props) => {
    const messages = {
        initial: [
            "Przy utworzeniu konta wysłaliśmy link na podany email z linkiem rejestracyjnym ważnym przez 15 minut.",
            "W przypadku nieaktywnego linku można poprosić o wysłanie go ponownie przyciskiem poniżej."
        ],
        updated: [
            "Link został wysłany ponownie na podany adres email.",
            "Sprawdź swoją skrzynkę pocztową. Jeśli wiadomość nie dotarła, sprawdź folder SPAM."
        ]
    }

    const [emailSending, setEmailSending] = useState({
        currentMessage: messages.initial,
        isButtonDisabled: false,
        isLoading: false,
    })

    const handleAction = () => {
        setEmailSending({
            ...emailSending,
            isLoading: true,
            isButtonDisabled: true,
        });

        // tu zrobić wysyłanie maila

        setTimeout(() => {
            setEmailSending({
                ...emailSending,
                currentMessage: messages.updated,
                isLoading: false,
            });
        }, 2000);
    }

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
                <p>
                    {emailSending.currentMessage.map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                            <br />
                        </React.Fragment>
                    ))}
                </p>

                < CenterContainer >
                    {emailSending.isLoading ? (
                        <>
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress size="20px" sx={{ color: "black" }} />
                            </Box>
                            <p>&nbsp; Wysyłanie...</p>
                        </>

                    ) : (
                        <>
                            <ButtonWrapper>
                                <ButtonFullWidth
                                    disabled={emailSending.isButtonDisabled}
                                    type="submit"
                                    id="button"
                                    value="Wyślij ponownie"
                                    onClick={handleAction}
                                />
                            </ButtonWrapper>
                            <ButtonSpacer />
                            <ButtonWrapper>
                                <Button
                                    type="submit"
                                    value="Powrót"
                                    onClick={() => { props.setConfirmEmailModal(false) }}
                                />
                            </ButtonWrapper>
                        </>
                    )}

                </CenterContainer >
            </Sheet>
        </Modal >
    )
}

export default ConfirmEmail
