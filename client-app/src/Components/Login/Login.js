import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button, ButtonWrapper, CenterContainer, ButtonWithoutBorder, ButtonWithoutBorderWrapper, Label } from '../Styled/StyledGlobal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as React from 'react';
import FormHelperText from '@mui/material/FormHelperText';

const MainCompontent = styled.div`
width: 30%;
    margin-left: 40%;
    margin-top: 10%;
`
const Row = styled.div`
width: 60%;
    margin-bottom: 3%;
`
const RowSpace = styled.div`
height: 30px;
`
const SecoundRowSpace = styled.div`
height: 10px;
`
const ColumnSpace = styled.div`
width: 20px;
`

const Login = () => {
    const [login, setLogin] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [showPassword, setShowPassword] = useState(false);
    const [errorHelperText, setErrorHelperText] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [hideLoginElements, setHideLoginElements] = useState(false)
    const [showLoginElements, setShowLoginElements] = useState(true)
    const [sms, setSms] = useState(false);
    const [codeSms, setCodeSms] = useState("");
    const [phone, setPhone] = useState(undefined);
    //const [loginSms, setLoginSms] = useState(true); // potem użyć żeby wiedieć czy robić logowanei przez sms

    var usernameAndPassword = "2a630649-3f17-4026-9917-f3ccc27eeb95" + ":" + "LZ/3Lzpp4UiFBQPuMfW7TA==" // to nie powinno być jawne

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleLoginElement = () => {
        setHideLoginElements((hide) => !hide)
        setShowLoginElements((hide) => !hide)
    }

    const doLogin = () => {
        axios.get('http://localhost:5000/api/Employer/login',
            {
                params: { login: login, password: password },
                withCredentials: true
            })
            .then(response => {
                axios.get('http://localhost:5000/api/employer', { withCredentials: true })
                    .then(response => setPhone(response.data.phone))

                handleLoginElement()
                smsAuthSend()
                setSms(true)
                sessionStorage.setItem("userId", response.data.userId)
                sessionStorage.setItem("userHashToken", response.data.hash);

                //window.location.pathname = '/inzRafalRutkowski/';
            }).catch((error) => {
                setErrorHelperText("Nieprawidłowe dane")
                setLoginError(true)
            })
    }
    const back = () => {
        setSms(false)
        handleLoginElement()
    }
    const smsAuthSend = () => {
        axios.get('http://localhost:5000/api/employer', { withCredentials: true })
            .then(response => {
                var requestOptions = {
                    method: 'POST',
                    headers: { "Content-Type": "application/json", "Authorization": "Basic " + btoa(usernameAndPassword), "Accept-Language": "en-US" },
                    body: "{ \
                \"identity\": { \
                  \"type\": \"number\", \
                  \"endpoint\": \"+48"+ response.data.phone + "\" \
                  }, \
                \"method\": \"sms\" \
                }"
                };
                fetch("https://verification.api.sinch.com/verification/v1/verifications", requestOptions)
                    .then(response => response.json())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            })
    }
    const doCodeSms = () => {
        var requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json", "Authorization": "Basic " + btoa(usernameAndPassword) },
            body: "{ \"method\": \"sms\", \"sms\":{ \"code\": \"" + codeSms + "\" }}"
        };
        fetch("https://verification.api.sinch.com/verification/v1/verifications/number/+48" + phone, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status == "SUCCESSFUL") window.location.pathname = '/inzRafalRutkowski/'
            })
            .catch(error => console.log('error', error));
    }

    return (
        <MainCompontent>
            <RowSpace hidden={showLoginElements}></RowSpace>
            <Row hidden={showLoginElements}>
                <Label htmlFor="login">Kod z telefonu</Label>
                <CenterContainer>
                    <TextField
                        //error={loginError}
                        sx={{ m: 0, width: '25ch' }}
                        onChange={(e) => { setCodeSms(e.target.value) }}
                        size="small"
                        variant="outlined" />
                </CenterContainer>
            </Row>
            <SecoundRowSpace hidden={showLoginElements}></SecoundRowSpace>
            <Row hidden={showLoginElements}>
                <CenterContainer>
                    wyślij ponownie
                </CenterContainer>
            </Row>



            <Row hidden={hideLoginElements}>
                <Label htmlFor="login">Login</Label>
                <CenterContainer>
                    <TextField
                        error={loginError}
                        sx={{ m: 0, width: '25ch' }} // m sktór od marginesu
                        onChange={(e) => { setLogin(e.target.value) }}
                        size="small"
                        id="outlined-basic"
                        variant="outlined" />
                </CenterContainer>
            </Row>
            <Row hidden={hideLoginElements}>
                <Label htmlFor="password">Hasło</Label>
                <CenterContainer>
                    <FormControl sx={{ width: '25ch' }} variant="outlined">
                        <OutlinedInput
                            error={loginError}
                            onChange={(e) => { setPassword(e.target.value) }}
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

                    </FormControl>

                </CenterContainer>
                <CenterContainer>
                    <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                        {errorHelperText}
                    </FormHelperText>
                </CenterContainer>

            </Row>
            <Row>
                <CenterContainer>
                    <ButtonWrapper>
                        <Button
                            type="submit"
                            id="button"
                            value="Zaloguj"
                            onClick={!sms ? () => doLogin() : () => doCodeSms()}
                        />
                    </ButtonWrapper>
                    <ColumnSpace hidden={showLoginElements}></ColumnSpace>
                    <ButtonWrapper hidden={showLoginElements}>
                        <Button
                            type="submit"
                            value="Powrót"
                            onClick={() => back()}
                        />
                    </ButtonWrapper>

                </CenterContainer>

            </Row>
            <RowSpace></RowSpace>
            <Row hidden={hideLoginElements}>
                <CenterContainer>
                    <ButtonWithoutBorderWrapper>
                        <ButtonWithoutBorder
                            type="submit"
                            id="button"
                            value="Przypomnij"
                        //onClick={}
                        />
                    </ButtonWithoutBorderWrapper>
                    <ColumnSpace></ColumnSpace>
                    <ButtonWithoutBorderWrapper>
                        <ButtonWithoutBorder
                            type="submit"
                            id="button"
                            value="Rejestracja"
                            onClick={() => window.location.pathname = '/inzRafalRutkowski/registration'}
                        />
                    </ButtonWithoutBorderWrapper>
                </CenterContainer>
            </Row>
        </MainCompontent>
    )
}

export default Login;