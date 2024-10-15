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

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [errorPasswordLabel, setErrorPasswordLabel] = useState("");
    const [errorPassword, setErrorPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const rgxPassword = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;

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

    return (
        <MainCompontent>
            <Row>
                <Label htmlFor="login">Login</Label>
                <CenterContainer>
                    <TextField
                        //onChange={}
                        sx={{ width: '25ch' }}
                        size="small"
                        variant="outlined" />
                </CenterContainer>
            </Row>
            <Row>
                <Label htmlFor="email">Email</Label>
                <CenterContainer>
                    <TextField
                        //onChange={}
                        sx={{ width: '25ch' }}
                        size="small"
                        variant="outlined" />
                </CenterContainer>
            </Row>
            <Row>
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
                        <FormHelperText id="component-error-text" sx={{ color: "red" }}>
                            {errorPasswordLabel}
                        </FormHelperText>
                    </FormControl>
                </CenterContainer>
            </Row>
            <Row>
                <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
                <CenterContainer>
                    <FormControl sx={{ width: '25ch' }} variant="outlined">
                        <OutlinedInput
                            //onChange={}
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
            </Row>
            <Row>
                <CenterContainer>
                    <ButtonWrapper>
                        <Button
                            type="submit"
                            id="button"
                            value="Dalej"
                        //onClick={() => {doLogin();}}
                        />
                    </ButtonWrapper>
                    <ColumnSpace></ColumnSpace>
                    <ButtonWrapper>
                        <Button
                            type="submit"
                            id="button"
                            value="Powrót"
                            onClick={() => window.location.pathname = '/'}
                        />
                    </ButtonWrapper>
                </CenterContainer>
            </Row>
        </MainCompontent>
    )
}

export default Registration;