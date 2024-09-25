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

    const handleClickShowPassword = () => setShowPassword((show) => !show);

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