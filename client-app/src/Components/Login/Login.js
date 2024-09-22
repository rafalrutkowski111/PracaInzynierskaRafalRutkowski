import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import axios from 'axios';
import { Button, ButtonWrapper, ButtonContainer, ButtonWithoutBorder, ButtonWithoutBorderWrapper, Label } from '../Styled/StyledGlobal';

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
const ColumnSpace = styled.div`
width: 20px;
`

const Login = () => {
    const [login, setLogin] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const doLogin = () => {
        axios.get('http://localhost:5000/api/Employer/login',
            {
                params: { login: login, password: password },
                withCredentials: true
            })
            .then(response => {
                sessionStorage.setItem("userId", response.data.userId)
                sessionStorage.setItem("userHashToken", response.data.hash);
                window.location.pathname = '/inzRafalRutkowski/';
            }).catch((error) => { alert(error.response.data.message) })
    }


    return (
        <MainCompontent>
            <Row>
                <Label htmlFor="login">Login</Label>
                <Form.Control
                    type="text"
                    id="login"
                    onChange={(e) => { setLogin(e.target.value) }}
                />
            </Row>
            <Row>
                <Label htmlFor="password">Hasło</Label>
                <Form.Control
                    type="password"
                    id="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />
            </Row>
            <Row>
                <ButtonContainer>
                    <ButtonWrapper>
                        <Button
                            type="submit"
                            id="button"
                            value="Zaloguj"
                            onClick={() => { doLogin(); }}
                        />
                    </ButtonWrapper>

                </ButtonContainer>
            </Row>
            <RowSpace></RowSpace>
            <Row>
                <ButtonContainer>
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

                </ButtonContainer>
            </Row>
        </MainCompontent>
    )
}

export default Login;