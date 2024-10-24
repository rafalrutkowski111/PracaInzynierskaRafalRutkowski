import styled from 'styled-components';
import { Button, ButtonWrapper, CenterContainer, Label } from '../Styled/StyledGlobal';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as React from 'react';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Container } from '@mui/material';

const MainCompontent = styled.div`
width: 30%;
    margin-left: 40%;
    margin-top: 5%;
`
const Row = styled.div`
width: 60%;
    margin-bottom: 3%;
`
const ColumnSpace = styled.div`
width: 20px;
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

    const [errorUniqueLoginLabel, setErrorUniqueLoginLabel] = useState("");
    const [errorUniqueLogin, setErrorUniqueLogin] = useState(false);
    const [errorUniqueEmialLabel, setErrorUniqueEmail] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [hideBaisicInformation, setHideBaisicInformation] = useState(false);
    const [hideOpcionalInformation, setHidepcionalInformation] = useState(true);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const rgxPassword = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    const rgxEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    const steps = ['Podstawowe informacje', 'Dodatkowe informacje'];

    const changePassword = (e) => {
        setPassword(e)
        if (e === '') {
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
        setErrorUniqueEmail("")

        if (e === '') {
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

    const changeConfirmPassword = (e) => {
        setConfirmPassword(e)

        if (e === password) {
            setErrorConfirmPasswordLabel("")
            setErrorConfirmPassword(false)
        }
        else {
            setErrorConfirmPasswordLabel("Hasło musi być takie samo")
            setErrorConfirmPassword(true)
        }

    }

    const checkUniqueLoginAndEmail = () => {
        if (errorPassword === true || password === "" || errorEmail === true || email === ""
            || login === "" || errorConfirmPassword === true || confirmPassword === "") {
            changeEmail(email)
            changePassword(password)
            changeConfirmPassword(confirmPassword)
            if (login === "") setErrorUniqueLoginLabel("login nie może być pusty")
        }
        else {
            axios.get('http://localhost:5000/api/Employer/checkUniqueLoginAndEmail',
                {
                    params: { login: login, email: email },
                    withCredentials: true
                })
                .then(response => {
                    console.log(response.data)
                    if (response.data.email === true && response.data.login === true) {
                        setHideBaisicInformation(true)
                        handleNext()
                        setHidepcionalInformation(false)
                    }
                    else {
                        if (response.data.email === false) {
                            setErrorUniqueEmail("Email musi być unikalny")
                            setErrorEmail(true)
                        }
                        if (response.data.login === false) {
                            setErrorUniqueLoginLabel("Login musi być unikalny")
                            setErrorUniqueLogin(true)
                        }
                    }

                }
                )
        }


    }
    const doRegister = () => {
        axios.get('http://localhost:5000/api/Employer/register',
            {
                params: { login: login, password: password, email: email },
                withCredentials: true
            })
    }


    const handleBack = () => {
        setHidepcionalInformation(true)
        setHideBaisicInformation(false)
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleNext = () => {

        setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };

    return (
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
                                            error={errorUniqueLogin}
                                            onChange={e => {
                                                setLogin(e.target.value)
                                                setErrorUniqueLoginLabel("")
                                                setErrorUniqueLogin(false)
                                            }}
                                            sx={{ width: '25ch' }}
                                            size="small"
                                            variant="outlined" />
                                    </CenterContainer>
                                    <CenterContainer>
                                        <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                                            {errorUniqueLoginLabel}
                                        </FormHelperText>
                                    </CenterContainer>
                                </RowThird>
                            </CenterContainer>
                            <CenterContainer>
                                <RowThird>
                                    <Label htmlFor="email">Email</Label>
                                    <CenterContainer>
                                        <TextField
                                            helperText={errorEmailLabel}
                                            error={errorEmail}
                                            value={email}
                                            onChange={e => changeEmail(e.target.value)}
                                            sx={{ width: '25ch' }}
                                            size="small"
                                            variant="outlined" />
                                    </CenterContainer>
                                    <CenterContainer>
                                        <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                                            {errorUniqueEmialLabel}
                                        </FormHelperText>
                                    </CenterContainer>
                                </RowThird>
                            </CenterContainer>
                            <CenterContainer>
                                <RowThird>
                                    <Label htmlFor="password">Hasło</Label>
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
                                    <Label htmlFor="test">TEST</Label>
                                    <CenterContainer>
                                        <TextField
                                            error={errorUniqueLogin}
                                            onChange={e => {
                                                setLogin(e.target.value)
                                                setErrorUniqueLoginLabel("")
                                                setErrorUniqueLogin(false)
                                            }}
                                            sx={{ width: '25ch' }}
                                            size="small"
                                            variant="outlined" />
                                    </CenterContainer>
                                    <CenterContainer>
                                        <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                                            {errorUniqueLoginLabel}
                                        </FormHelperText>
                                    </CenterContainer>
                                </RowThird>
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
                                            onClick={() => { checkUniqueLoginAndEmail(); }}
                                        />
                                    </ButtonWrapper>
                                    <ColumnSpace></ColumnSpace>
                                    <ButtonWrapper>
                                        <Button
                                            type="submit"
                                            id="button"
                                            value="Powrót"
                                            onClick={activeStep !== 0 ? handleBack : () => window.location.pathname = '/'}
                                        />
                                    </ButtonWrapper>
                                </CenterContainer>
                            </RowThird>
                        </CenterContainer>
                    </React.Fragment>
                </Box>
            </Row>
        </MainCompontent>
    )
}

export default Registration;