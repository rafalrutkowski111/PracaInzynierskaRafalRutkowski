import styled from 'styled-components';
import { Button, ButtonWrapper, CenterContainer, Label } from '../Styled/StyledGlobal';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as React from 'react';
import { useState, useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Container } from '@mui/material';
import { regexPassword, regexEmail, regexPhone } from '../Regex/Regex';
import { ButtonWithoutBorder, ButtonWithoutBorderWrapper } from '../Styled/StyledGlobal';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import { InfomModal } from '../Global/InfoModal';

const MainCompontent = styled.div`
width: 30%;
    margin-left: 40%;
    margin-top: 5%;
`
const Row = styled.div`
width: 60%;
    margin-bottom: 3%;
`
const ButtonSpacer = styled.div`
  width: 16px;
`
const RowSecound = styled.div`
    margin-bottom: 15%;
`
const RowThird = styled.div`
width: 100%;
    margin-bottom: 3%;
`

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [errorPasswordLabel, setErrorPasswordLabel] = useState("");
    const [errorPassword, setErrorPassword] = useState(false)
    const [email, setEmail] = useState("");
    const [errorEmailLabel, setErrorEmailLabel] = useState("");
    const [errorEmail, setErrorEmail] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorConfirmPasswordLabel, setErrorConfirmPasswordLabel] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
    const [login, setLogin] = useState("");
    const [errorLoginLabel, setErrorLoginLabel] = useState("");
    const [errorLogin, setErrorLogin] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [hideBaisicInformation, setHideBaisicInformation] = useState(false);
    const [hideOpcionalInformation, setHidepcionalInformation] = useState(true);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [errorPhone, setErrorPhone] = useState(false)
    const [errorPhoneLabel, setErrorPhoneLabel] = useState("")
    const [smsCheckbox, setSmsCheckbox] = useState(true)
    const [firstStep, setFirstStep] = useState(true)
    const [hideErrorFirstStep, setHideErrorFirstStep] = useState(true)
    const [hideErrorSecoundStep, setHideErrorSecoundStep] = useState(true)
    const [infoModal, setInfoModal] = useState(false)

    const navigate = useNavigate();


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleCheckboxSMS = () => {
        setSmsCheckbox((smsCheckbox) => !smsCheckbox)
        changePhone(phone)
    }
    const handleChangeStep = () => setFirstStep((step => !step))

    const rgxPassword = regexPassword;
    const rgxEmail = regexEmail;
    const rgxPhone = regexPhone;

    const steps = ['Podstawowe informacje', 'Dodatkowe informacje'];

    const widthInfomModal = 550
    const maxWidthInfomModal = 800
    const nameTitleInfomModal = "Wymagania dotyczące hasła"
    const messageInfomModal = "Twoje hasło powinno zawierać co najmniej jedną małą literę, jedną wielką literę, jedną cyfrę oraz jeden znak specjalny, taki jak np. !, @, # czy $. Dodatkowo musi mieć przynajmniej 8 znaków długości."
    useEffect(() => {
        if (hideErrorFirstStep === false) {
            changeEmail(email)
            changePassword(password)
            changeConfirmPassword(confirmPassword)
            changeLogin(login)
        }
    }, [hideErrorFirstStep])

    useEffect(() => {
        if (hideErrorSecoundStep === false)
            changePhone(phone)
        else {
            setErrorPhone(false)
            setErrorPhoneLabel("")
        }
    }, [hideErrorSecoundStep])

    useEffect(() => {
        if (phone === '')
            changePhone(phone)
    }, [smsCheckbox])

    const changePassword = (e) => {
        setPassword(e)

        if (hideErrorFirstStep === true) { }
        else if (e === '') {
            setErrorPassword(true)
            setErrorPasswordLabel("Pole nie może być puste")
        }
        else if (!rgxPassword.test(e)) {
            setErrorPassword(true)
            setErrorPasswordLabel("Niepoprawny format hasła: mała ,duża iltera, liczba, znak specjalny, 8 znaków")
        }
        else {
            setErrorPassword(false)
            setErrorPasswordLabel("")
        }
    }
    const changeEmail = (e) => {

        setEmail(e)
        if (hideErrorFirstStep === true) { }
        else if (e === '') {
            setErrorEmail(true)
            setErrorEmailLabel("Pole nie może być puste")
        }
        else if (!rgxEmail.test(e)) {
            setErrorEmail(true)
            setErrorEmailLabel("Email jest niepoprawny")
        }
        else {
            setErrorEmail(false)
            setErrorEmailLabel("")

        }
    }
    const changePhone = (e) => {
        setPhone(e)

        if (hideErrorSecoundStep === true) { }
        else if (e === '' && smsCheckbox === true) {
            setErrorPhone(true)
            setErrorPhoneLabel("Pole nie może być puste")
        }
        else if (e === '' && smsCheckbox === false) {
            setErrorPhone(false)
            setErrorPhoneLabel("")
        }
        else if (!rgxPhone.test(e)) {
            setErrorPhone(true)
            setErrorPhoneLabel("Niepoprawny numer telefonu")
        }
        else {
            setErrorPhone(false)
            setErrorPhoneLabel("")

        }
    }

    const changeConfirmPassword = (e) => {
        setConfirmPassword(e)

        if (hideErrorFirstStep === true) { }
        else if (e === password) {
            setErrorConfirmPasswordLabel("")
            setErrorConfirmPassword(false)
        }
        else {
            setErrorConfirmPasswordLabel("Hasło musi być takie samo")
            setErrorConfirmPassword(true)
        }

    }
    const changeLogin = (e) => {
        setLogin(e)

        if (hideErrorFirstStep === true) { }
        else if (e === '') {
            setErrorLogin(true)
            setErrorLoginLabel("Pole nie może być puste")
        }
        else {
            setErrorLogin(false)
            setErrorLoginLabel("")
        }
    }

    const nextFirstStep = () => {
        if (errorPassword === true || password === "" || errorEmail === true || email === ""
            || login === "" || errorConfirmPassword === true || confirmPassword === "") {
            setHideErrorFirstStep(false)
        }
        else {
            axios.get('http://localhost:5000/api/Employer/checkUniqueLoginAndEmail',
                {
                    params: { login: login, email: email },
                    withCredentials: true
                })
                .then(response => {
                    if (response.data.email === true && response.data.login === true) {
                        handleChangeStep()
                        setHideBaisicInformation(true)
                        handleNext()
                        setHidepcionalInformation(false)
                    }
                    else {
                        if (response.data.email === false) {
                            setErrorEmailLabel("Email musi być unikalny")
                            setErrorEmail(true)
                        }
                        if (response.data.login === false) {
                            setErrorLoginLabel("Login musi być unikalny")
                            setErrorLogin(true)
                        }
                    }
                })
        }


    }
    const nextSecoundStep = () => {
        setHideErrorSecoundStep(false)
        smsCheckbox === true
            ? phone !== "" && !errorPhone && doRegister()
            : doRegister()
    }
    const doRegister = () => {
        console.log("jest")
        return // USUNĄĆ JAK REJESTRACJA BEDZIE DZIAŁAC
        axios.get('http://localhost:5000/api/Employer/register',
            {
                params: { login: login, password: password, email: email },
                withCredentials: true
            })
    }


    const handleBack = () => {
        setHideErrorSecoundStep(true)
        handleChangeStep()
        setHidepcionalInformation(true)
        setHideBaisicInformation(false)
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleNext = () => {

        setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };

    const password_generator = (len) => {
        var length = (len) ? (len) : (10);
        var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
        var numeric = '0123456789';
        var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
        var password = "";
        var character = "";
        while (password.length < length) {
            let entity1 = Math.ceil(string.length * Math.random() * Math.random());
            let entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
            let entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
            let hold = string.charAt(entity1);
            hold = (password.length % 2 == 0) ? (hold.toUpperCase()) : (hold);
            character += hold;
            character += numeric.charAt(entity2);
            character += punctuation.charAt(entity3);
            password = character;
        }
        password = password.split('').sort(function () { return 0.5 - Math.random() }).join('');
        changePassword(password)
        changeConfirmPassword(password)
        setErrorConfirmPasswordLabel("")
        setErrorConfirmPassword(false)
    }

    const RenderInfoModal = () => {
        return (
            <InfomModal infoModal={infoModal} setInfoModal={setInfoModal} widthInfomModal={widthInfomModal}
                maxWidthInfomModal={maxWidthInfomModal} nameTitleInfomModal={nameTitleInfomModal} 
                messageInfomModal={messageInfomModal}
            />  
        )
    }
    return (
        <>
            {RenderInfoModal()}

            <MainCompontent>
                <Row>
                    <Box sx={{ width: '100%' }}>
                        <CenterContainer>
                            <Stepper activeStep={activeStep}>
                                {steps.map((label, index) => {
                                    const stepProps = {};
                                    const labelProps = {};
                                    return (
                                        <Step key={label} {...stepProps}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                        </CenterContainer>
                        <React.Fragment>
                            <RowSecound></RowSecound>

                            <Container hidden={hideBaisicInformation}>
                                <CenterContainer >
                                    <RowThird >
                                        <Label htmlFor="login">Login</Label>
                                        <CenterContainer>
                                            <TextField
                                                error={errorLogin}
                                                onChange={e => changeLogin(e.target.value)}
                                                sx={{ width: '25ch' }}
                                                size="small"
                                                variant="outlined" />
                                        </CenterContainer>
                                        <CenterContainer>
                                            <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                                                {errorLoginLabel}
                                            </FormHelperText>
                                        </CenterContainer>
                                    </RowThird>
                                </CenterContainer>
                                <CenterContainer>
                                    <RowThird>
                                        <Label htmlFor="email">Email</Label>
                                        <CenterContainer>
                                            <TextField
                                                error={errorEmail}
                                                value={email}
                                                onChange={e => changeEmail(e.target.value)}
                                                sx={{ width: '25ch' }}
                                                size="small"
                                                variant="outlined" />
                                        </CenterContainer>
                                        <CenterContainer>
                                            <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                                                {errorEmailLabel}
                                            </FormHelperText>
                                        </CenterContainer>
                                    </RowThird>
                                </CenterContainer>
                                <CenterContainer>
                                    <RowThird>
                                        <ButtonWithoutBorderWrapper>
                                            <ButtonWithoutBorder
                                                type="submit"
                                                id="button"
                                                value="Hasło"
                                                onClick={() => { setInfoModal(true) }}
                                            />
                                        </ButtonWithoutBorderWrapper>
                                        <CenterContainer>
                                            <FormControl sx={{ width: '25ch' }} variant="outlined">
                                                <OutlinedInput
                                                    error={errorPassword}
                                                    value={password}
                                                    onChange={e => changePassword(e.target.value)}
                                                    size="small"
                                                    id="outlined-adornment-password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                                <CenterContainer>
                                                    <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                                                        {errorPasswordLabel}
                                                    </FormHelperText>
                                                </CenterContainer>
                                                <ButtonWithoutBorderWrapper>
                                                    <ButtonWithoutBorder
                                                        type="submit"
                                                        id="button"
                                                        value="Generuj"
                                                        onClick={() => { password_generator(15) }}
                                                    />
                                                </ButtonWithoutBorderWrapper>
                                            </FormControl>
                                        </CenterContainer>
                                    </RowThird>
                                </CenterContainer>



                                <CenterContainer>
                                    <RowThird>
                                        <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
                                        <CenterContainer>
                                            <FormControl sx={{ width: '25ch' }} variant="outlined">
                                                <OutlinedInput
                                                    error={errorConfirmPassword}
                                                    value={confirmPassword}
                                                    onChange={e => changeConfirmPassword(e.target.value)}
                                                    size="small"
                                                    id="outlined-adornment-password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                                <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                                                    {errorConfirmPasswordLabel}
                                                </FormHelperText>
                                            </FormControl>
                                        </CenterContainer>
                                    </RowThird>
                                </CenterContainer>
                            </Container>

                            <Container hidden={hideOpcionalInformation}>
                                <CenterContainer>
                                    <RowThird>
                                        <Label htmlFor="test">Imie</Label>
                                        <CenterContainer>
                                            <TextField
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                sx={{ width: '25ch' }}
                                                size="small"
                                                variant="outlined" />
                                        </CenterContainer>
                                    </RowThird>
                                </CenterContainer>
                                <CenterContainer>
                                    <RowThird>
                                        <Label htmlFor="test">Nazwisko</Label>
                                        <CenterContainer>
                                            <TextField
                                                value={surname}
                                                onChange={e => setSurname(e.target.value)}
                                                sx={{ width: '25ch' }}
                                                size="small"
                                                variant="outlined" />
                                        </CenterContainer>
                                    </RowThird>
                                </CenterContainer>
                                <CenterContainer>
                                    <RowThird>
                                        <Label htmlFor="test">Telefon</Label>
                                        <CenterContainer>
                                            <TextField
                                                value={phone}
                                                error={errorPhone}
                                                onChange={e => {
                                                    changePhone(e.target.value)
                                                }}
                                                sx={{ width: '25ch' }}
                                                size="small"
                                                variant="outlined" />
                                        </CenterContainer>
                                        <CenterContainer>
                                            <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                                                {errorPhoneLabel}
                                            </FormHelperText>
                                        </CenterContainer>
                                    </RowThird>
                                </CenterContainer>
                                <CenterContainer>
                                    <FormControlLabel control={
                                        <Checkbox
                                            defaultChecked
                                            value={smsCheckbox}
                                            onChange={handleCheckboxSMS}
                                        />
                                    } label="Logowanie sms" />
                                </CenterContainer>
                            </Container>
                            <CenterContainer>
                                <RowThird>
                                    <CenterContainer>
                                        <ButtonWrapper>
                                            <Button
                                                type="submit"
                                                id="button"
                                                value="Dalej"
                                                onClick={firstStep === true ? () => nextFirstStep() : () => nextSecoundStep()}
                                            />
                                        </ButtonWrapper>
                                        <ButtonSpacer/>
                                        <ButtonWrapper>
                                            <Button
                                                type="submit"
                                                id="button"
                                                value="Powrót"
                                                onClick={activeStep !== 0 ? handleBack : () => navigate(-1)}
                                            />
                                        </ButtonWrapper>
                                    </CenterContainer>
                                </RowThird>
                            </CenterContainer>
                        </React.Fragment>
                    </Box>
                </Row>
            </MainCompontent>
        </>

    )
}

export default Registration;