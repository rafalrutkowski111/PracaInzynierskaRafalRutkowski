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
import { regexPassword , regexEmail } from '../Regex/Regex';

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
    const [errorNameLabel, setErrorNameLabel] = useState("");
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState(false);
    const [errorSurnameLabel, setErrorSurnameLabel] = useState("");
    const [surname, setSurname] = useState("");
    const [errorSurname, setErrorSurname] = useState(false);
    

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const rgxPassword = regexPassword;
    const rgxEmail = regexEmail;

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
        //generator haslo
        password_generator(15)
        // koniec generatora
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

    const password_generator = ( len ) => {
        var length = (len)?(len):(10);
        var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
        var numeric = '0123456789';
        var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
        var password = "";
        var character = "";
        while( password.length<length ) {
            let entity1 = Math.ceil(string.length * Math.random()*Math.random());
            let entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
            let entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
            let hold = string.charAt( entity1 );
            hold = (password.length%2==0)?(hold.toUpperCase()):(hold);
            character += hold;
            character += numeric.charAt( entity2 );
            character += punctuation.charAt( entity3 );
            password = character;
        }
        password=password.split('').sort(function(){return 0.5-Math.random()}).join('');
        console.log( password)
        return password.substr(0,len);
    }

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
                                    <Label htmlFor="test">Imie</Label>
                                    <CenterContainer>
                                        <TextField
                                            value={name}
                                            error={errorName}
                                            onChange={e => {
                                                setName(e.target.value)
                                            }}
                                            sx={{ width: '25ch' }}
                                            size="small"
                                            variant="outlined" />
                                    </CenterContainer>
                                    <CenterContainer>
                                        <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                                            {errorNameLabel}
                                        </FormHelperText>
                                    </CenterContainer>
                                </RowThird>
                            </CenterContainer>
                            <CenterContainer>
                                <RowThird>
                                    <Label htmlFor="test">Nazwisko</Label>
                                    <CenterContainer>
                                        <TextField
                                            value={surname}
                                            error={errorSurname}
                                            onChange={e => {
                                                setName(e.target.value)
                                            }}
                                            sx={{ width: '25ch' }}
                                            size="small"
                                            variant="outlined" />
                                    </CenterContainer>
                                    <CenterContainer>
                                        <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                                            {errorSurnameLabel}
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